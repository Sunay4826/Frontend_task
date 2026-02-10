import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis;

const baseClient = globalForPrisma.prisma || new PrismaClient();
const useAccelerate = process.env.USE_PRISMA_ACCELERATE === "true";
const prisma = useAccelerate ? baseClient.$extends(withAccelerate()) : baseClient;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = baseClient;
}

export { prisma };
