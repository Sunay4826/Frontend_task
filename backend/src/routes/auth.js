import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../lib/prisma.js";
import { HttpError } from "../utils/httpError.js";
import { loginSchema, registerSchema } from "../validators/auth.js";

export const authRouter = express.Router();

function signToken(userId) {
  return jwt.sign({}, process.env.JWT_SECRET, {
    subject: String(userId),
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function serializeUser(user) {
  const { passwordHash: _ignored, ...safeUser } = user;
  return safeUser;
}

authRouter.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new HttpError(409, "Email already in use");

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    const token = signToken(user.id);
    res.status(201).json({ token, user: serializeUser(user) });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new HttpError(401, "Invalid email or password");

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new HttpError(401, "Invalid email or password");

    const token = signToken(user.id);
    res.json({ token, user: serializeUser(user) });
  } catch (err) {
    next(err);
  }
});
