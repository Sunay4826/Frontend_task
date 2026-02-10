import { prisma } from "../lib/prisma.js";

export async function connectDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }
  await prisma.$connect();
}
