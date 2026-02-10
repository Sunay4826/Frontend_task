import express from "express";

import { requireAuth } from "../middleware/auth.js";
import { prisma } from "../lib/prisma.js";
import { HttpError } from "../utils/httpError.js";
import { updateMeSchema } from "../validators/user.js";

export const usersRouter = express.Router();

usersRouter.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) throw new HttpError(404, "User not found");
    const { passwordHash: _ignored, ...safeUser } = user;
    res.json({ user: safeUser });
  } catch (err) {
    next(err);
  }
});

usersRouter.put("/me", requireAuth, async (req, res, next) => {
  try {
    const update = updateMeSchema.parse(req.body);
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: update,
    });
    if (!user) throw new HttpError(404, "User not found");
    const { passwordHash: _ignored, ...safeUser } = user;
    res.json({ user: safeUser });
  } catch (err) {
    next(err);
  }
});
