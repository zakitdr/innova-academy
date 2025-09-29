import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Reuse the same client in dev to avoid exhausting connections
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // optional: log Prisma warnings/errors in production too
    log: ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
