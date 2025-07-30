// import { PrismaClient } from "@prisma/client";

// // Extend globalThis to include the Prisma client type
// declare global {
//   // Allow global `prisma` only in development
//   var prisma: PrismaClient | undefined;
// }

// // Create a new PrismaClient or reuse the existing one during development
// export const db = globalThis.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = db;
// }
