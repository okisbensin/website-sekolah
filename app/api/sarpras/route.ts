// File: app/api/sarpras/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Mengambil semua data sarpras
export async function GET() {
  try {
    const sarpras = await prisma.saranaPrasarana.findMany({
      orderBy: { nama: 'asc' },
    });
    return NextResponse.json(sarpras);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data' }, { status: 500 });
  }
}

// POST: Membuat sarpras baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, tipe, deskripsi, gambar } = body;

    if (!nama || !tipe || !deskripsi) {
      return NextResponse.json({ message: 'Nama, Tipe, dan Deskripsi wajib diisi' }, { status: 400 });
    }

    const newSarpras = await prisma.saranaPrasarana.create({
      data: body,
    });
    return NextResponse.json(newSarpras, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal membuat data' }, { status: 500 });
  }
}