import jwt from "jsonwebtoken";
import { HttpError } from "../utils/httpError.js";

export function requireAuth(req, _res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return next(new HttpError(401, "Missing or invalid Authorization header"));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub };
    return next();
  } catch {
    return next(new HttpError(401, "Invalid or expired token"));
  }
}

