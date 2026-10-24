// app/_lib/db.ts
import { PrismaClient } from '@/app/generated/prisma';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }; // Singleton com globalThis - O globalForPrisma evita que o PrismaClient seja instanciado múltiplas vezes durante o hot reload do Next.js em desenvolvimento. Sem isso, cada alteração de arquivo criaria uma nova conexão com o banco, esgotando o pool de conexões do PostgreSQL

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({  
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;