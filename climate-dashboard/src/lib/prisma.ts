import { PrismaClient } from "@prisma/client";

// Reuse Prisma client across hot reloads in development to avoid exhausting
// database connections. In production, a single instance is sufficient.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
