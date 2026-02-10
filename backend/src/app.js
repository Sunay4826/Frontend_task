import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { authRouter } from "./routes/auth.js";
import { usersRouter } from "./routes/users.js";
import { tasksRouter } from "./routes/tasks.js";
import { notFoundHandler } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  // Vercel sits behind a proxy and forwards client IP headers.
  app.set("trust proxy", 1);

  const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        // Allow server-to-server requests and non-browser clients.
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("CORS origin not allowed"));
      },
      credentials: true,
    }),
  );

  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.get("/", (_req, res) => {
    res.json({ ok: true, service: "backend", message: "PrimeTrade API is running" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/tasks", tasksRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

const app = createApp();
export default app;
