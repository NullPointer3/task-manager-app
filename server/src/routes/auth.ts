import crypto from "crypto";
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { z } from "zod";
import { prisma } from "../prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { sendVerificationEmail } from "../lib/mailer";

const router = Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

function signToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}

function toPublicUser(user: { id: string; email: string; emailVerified: boolean }) {
  return { id: user.id, email: user.email, emailVerified: user.emailVerified };
}

async function issueVerificationToken(userId: string, email: string) {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationTokenExpiresAt = new Date(Date.now() + VERIFICATION_TOKEN_TTL_MS);
  await prisma.user.update({
    where: { id: userId },
    data: { verificationToken, verificationTokenExpiresAt },
  });
  await sendVerificationEmail(email, verificationToken);
}

router.post("/register", async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, passwordHash } });
  await issueVerificationToken(user.id, user.email);

  const token = signToken(user.id);
  res.status(201).json({ token, user: toPublicUser(user) });
});

router.post("/login", async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = signToken(user.id);
  res.json({ token, user: toPublicUser(user) });
});

router.post("/google", async (req, res) => {
  const parsed = z.object({ credential: z.string().min(1) }).safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Missing Google credential" });
  }

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: parsed.data.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch {
    return res.status(401).json({ error: "Invalid Google credential" });
  }

  if (!payload?.email || !payload.email_verified) {
    return res.status(401).json({ error: "Google account email is not verified" });
  }

  const { email, sub: googleId } = payload;

  let user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    if (!user.googleId) {
      user = await prisma.user.update({ where: { id: user.id }, data: { googleId, emailVerified: true } });
    }
  } else {
    user = await prisma.user.create({ data: { email, googleId, emailVerified: true } });
  }

  const token = signToken(user.id);
  res.json({ token, user: toPublicUser(user) });
});

router.post("/verify-email", async (req, res) => {
  const parsed = z.object({ token: z.string().min(1) }).safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Missing verification token" });
  }

  const user = await prisma.user.findUnique({ where: { verificationToken: parsed.data.token } });
  if (!user || !user.verificationTokenExpiresAt || user.verificationTokenExpiresAt < new Date()) {
    return res.status(400).json({ error: "Verification link is invalid or has expired" });
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: true, verificationToken: null, verificationTokenExpiresAt: null },
  });

  res.json({ user: toPublicUser(updated) });
});

router.post("/resend-verification", requireAuth, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (user.emailVerified) {
    return res.status(400).json({ error: "Email is already verified" });
  }

  await issueVerificationToken(user.id, user.email);
  res.json({ ok: true });
});

export default router;
