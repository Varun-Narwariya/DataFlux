/**
 * db/pgdb.js
 * PostgreSQL connection via Prisma
 * Prisma is a type-safe ORM — it generates a client from your schema
 *
 * Setup:
 *   npx prisma init          → creates prisma/schema.prisma
 *   npx prisma migrate dev   → creates tables from schema
 *   npx prisma generate      → generates the client
 */

import { PrismaClient } from '@prisma/client';

// Single instance — reuse across the app (connection pooling)
// Never create new PrismaClient() inside a function — you'll exhaust connections
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'warn', 'error']
    : ['warn', 'error'],
});

export async function connectPostgres() {
  await prisma.$connect();
  console.log('[postgres] connected');
}

// Named export for use across the app
// import { db } from '../db/pgdb.js'
export const db = prisma;
