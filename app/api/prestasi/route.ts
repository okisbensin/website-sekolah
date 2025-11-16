// File: app/api/prestasi/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Mengambil semua data prestasi
export async function GET() {
  try {
    const prestasi = await prisma.prestasi.findMany({
      orderBy: { tahun: 'desc' },
    });
    return NextResponse.json(prestasi);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data' }, { status: 500 });
  }
}

// POST: Membuat prestasi baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Pastikan tahun adalah integer
    const data = {
      ...body,
      tahun: parseInt(body.tahun, 10),
    };

    if (!data.namaPrestasi || !data.kategori || !data.tahun || !data.penyelenggara) {
      return NextResponse.json({ message: 'Semua bidang kecuali deskripsi wajib diisi' }, { status: 400 });
    }
    if (isNaN(data.tahun)) {
      return NextResponse.json({ message: 'Tahun harus berupa angka' }, { status: 400 });
    }

    const newPrestasi = await prisma.prestasi.create({
      data: data,
    });
    return NextResponse.json(newPrestasi, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal membuat data' }, { status: 500 });
  }
}