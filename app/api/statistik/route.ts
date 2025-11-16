// File: app/api/statistik/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Mengambil data statistik
export async function GET() {
  try {
    const stats = await prisma.statistikSekolah.findFirst();
    if (!stats) {
      return NextResponse.json({ jumlahSiswa: 0, jumlahGuru: 0 });
    }
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data' }, { status: 500 });
  }
}

// PUT: Memperbarui data statistik
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    // Pastikan data adalah integer
    const data = {
      jumlahSiswa: parseInt(body.jumlahSiswa, 10),
      jumlahGuru: parseInt(body.jumlahGuru, 10),
    };

    if (isNaN(data.jumlahSiswa) || isNaN(data.jumlahGuru)) {
      return NextResponse.json({ message: 'Input harus berupa angka' }, { status: 400 });
    }

    const existingStats = await prisma.statistikSekolah.findFirst();
    let updatedStats;

    if (existingStats) {
      updatedStats = await prisma.statistikSekolah.update({
        where: { id: existingStats.id },
        data: data,
      });
    } else {
      updatedStats = await prisma.statistikSekolah.create({
        data: data,
      });
    }
    return NextResponse.json(updatedStats);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal memperbarui data' }, { status: 500 });
  }
}