import nodemailer from "nodemailer";

const clientUrl = process.env.CLIENT_URL ?? "http://localhost:5173";
const fromAddress = process.env.EMAIL_FROM ?? "Tasker <noreply@tasker.app>";

const transporter = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    })
  : null;

export function buildVerificationLink(token: string): string {
  return `${clientUrl}/verify-email?token=${token}`;
}

export async function sendVerificationEmail(to: string, token: string): Promise<void> {
  const link = buildVerificationLink(token);
  const subject = "Verify your Tasker email address";
  const text = `Welcome to Tasker! Confirm your email address by visiting:\n\n${link}\n\nThis link expires in 24 hours.`;

  if (!transporter) {
    console.log(`[mailer] SMTP not configured — verification link for ${to}:\n${link}`);
    return;
  }

  await transporter.sendMail({ from: fromAddress, to, subject, text });
}
