import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma";
import { AuthRequest, requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

const taskStatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: taskStatusEnum.optional(),
  dueDate: z.string().datetime().optional(),
});

const updateTaskSchema = createTaskSchema.partial();

router.get("/", async (req: AuthRequest, res) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "desc" },
  });
  res.json(tasks);
});

router.post("/", async (req: AuthRequest, res) => {
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { title, description, status, dueDate } = parsed.data;

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      userId: req.userId as string,
    },
  });
  res.status(201).json(task);
});

router.patch("/:id", async (req: AuthRequest, res) => {
  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const existing = await prisma.task.findUnique({ where: { id: req.params.id } });
  if (!existing || existing.userId !== req.userId) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, description, status, dueDate } = parsed.data;
  const task = await prisma.task.update({
    where: { id: req.params.id },
    data: {
      title,
      description,
      status,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    },
  });
  res.json(task);
});

router.delete("/:id", async (req: AuthRequest, res) => {
  const existing = await prisma.task.findUnique({ where: { id: req.params.id } });
  if (!existing || existing.userId !== req.userId) {
    return res.status(404).json({ error: "Task not found" });
  }

  await prisma.task.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
