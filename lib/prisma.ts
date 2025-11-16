// File: /lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Deklarasikan variabel global untuk menyimpan cache koneksi
declare global {
  var prisma: PrismaClient | undefined;
}

// Buat satu instance PrismaClient
// Kita cek di 'globalThis' untuk menjaga koneksi yang sama saat hot-reload di development
export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    // Opsional: hapus komentar baris di bawah jika Anda ingin melihat
    // setiap query database di terminal Anda
    // log: ['query', 'info', 'warn', 'error'],
  });

// Simpan instance di globalThis untuk development
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}