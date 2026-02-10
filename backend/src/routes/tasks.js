import express from "express";

import { requireAuth } from "../middleware/auth.js";
import { prisma } from "../lib/prisma.js";
import { HttpError } from "../utils/httpError.js";
import { taskCreateSchema, taskListQuerySchema, taskUpdateSchema } from "../validators/task.js";

export const tasksRouter = express.Router();

tasksRouter.use(requireAuth);

tasksRouter.get("/", async (req, res, next) => {
  try {
    const { search, status } = taskListQuerySchema.parse(req.query);

    const query = { userId: req.user.id };
    if (status) query.status = status;
    if (search) {
      query.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const tasks = await prisma.task.findMany({
      where: query,
      orderBy: { updatedAt: "desc" },
      take: 200,
    });
    res.json({ tasks });
  } catch (err) {
    next(err);
  }
});

tasksRouter.post("/", async (req, res, next) => {
  try {
    const input = taskCreateSchema.parse(req.body);
    const task = await prisma.task.create({ data: { ...input, userId: req.user.id } });
    res.status(201).json({ task });
  } catch (err) {
    next(err);
  }
});

tasksRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findFirst({ where: { id, userId: req.user.id } });
    if (!task) throw new HttpError(404, "Task not found");
    res.json({ task });
  } catch (err) {
    next(err);
  }
});

tasksRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = taskUpdateSchema.parse(req.body);

    const task = await prisma.task.updateMany({
      where: { id, userId: req.user.id },
      data: update,
    });
    if (!task.count) throw new HttpError(404, "Task not found");
    const updatedTask = await prisma.task.findUnique({ where: { id } });
    res.json({ task: updatedTask });
  } catch (err) {
    next(err);
  }
});

tasksRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await prisma.task.deleteMany({ where: { id, userId: req.user.id } });
    if (!result.count) throw new HttpError(404, "Task not found");
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
