// File: app/api/ekstrakurikuler/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Mengambil semua data ekstrakurikuler
export async function GET() {
  try {
    const ekskul = await prisma.ekstrakurikuler.findMany({
      orderBy: { nama: 'asc' },
    });
    return NextResponse.json(ekskul);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data' }, { status: 500 });
  }
}

// POST: Membuat ekstrakurikuler baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, pembina, jadwal, deskripsi } = body;

    if (!nama || !pembina || !deskripsi) {
      return NextResponse.json({ message: 'Nama, Pembina, dan Deskripsi wajib diisi' }, { status: 400 });
    }

    const newEkskul = await prisma.ekstrakurikuler.create({
      data: body,
    });
    return NextResponse.json(newEkskul, { status: 201 });
  } catch (error: any) {
    // Tangani error jika 'nama' tidak unik
    if (error.code === 'P2002' && error.meta?.target?.includes('nama')) {
      return NextResponse.json({ message: 'Nama ekstrakurikuler sudah ada' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Gagal membuat data' }, { status: 500 });
  }
}