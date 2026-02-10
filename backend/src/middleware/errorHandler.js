import { ZodError } from "zod";
import { HttpError } from "../utils/httpError.js";

export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "ValidationError",
      message: "Invalid request",
      details: err.flatten(),
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: "HttpError",
      message: err.message,
      details: err.details,
    });
  }

  if (err?.code === "P2002") {
    return res.status(409).json({
      error: "ConflictError",
      message: "Unique constraint violation",
      details: err.meta,
    });
  }

  if (err?.code === "P2025") {
    return res.status(404).json({
      error: "NotFoundError",
      message: "Resource not found",
    });
  }

  if (err?.code === "P1001") {
    return res.status(503).json({
      error: "DatabaseUnavailable",
      message: "Cannot reach database server. Check DATABASE_URL/DIRECT_URL and network allowlist.",
    });
  }

  if (err?.code === "P2021") {
    return res.status(500).json({
      error: "TableMissing",
      message: "Database tables are missing. Run `npm run prisma:push` in backend.",
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);
  return res.status(500).json({ error: "InternalServerError", message: "Something went wrong" });
}
