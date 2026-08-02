import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 100, // Much larger pool
    idleTimeoutMillis: 120000, // 2 minutes idle timeout
    connectionTimeoutMillis: 30000, // 30s timeout to acquire connection
});

const adapter = new PrismaPg(pool);

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: ["error"],
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
} 