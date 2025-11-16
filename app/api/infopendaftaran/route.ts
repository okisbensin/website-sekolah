// File: app/api/infopendaftaran/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Mengambil data info pendaftaran
export async function GET() {
  try {
    const info = await prisma.infoPendaftaran.findFirst();
    if (!info) {
      return NextResponse.json({
        jadwalMulai: new Date(),
        jadwalSelesai: new Date(),
        persyaratan: 'Tulis persyaratan di sini.',
        prosedur: 'Tulis prosedur di sini.',
        kontakPendaftaran: '0812-3456-7890',
      });
    }
    return NextResponse.json(info);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data' }, { status: 500 });
  }
}

// PUT: Memperbarui data info pendaftaran
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    // Pastikan tanggal dikonversi dengan benar
    const data = {
      ...body,
      jadwalMulai: new Date(body.jadwalMulai),
      jadwalSelesai: new Date(body.jadwalSelesai),
    };

    const existingInfo = await prisma.infoPendaftaran.findFirst();
    let updatedInfo;

    if (existingInfo) {
      updatedInfo = await prisma.infoPendaftaran.update({
        where: { id: existingInfo.id },
        data: data,
      });
    } else {
      updatedInfo = await prisma.infoPendaftaran.create({
        data: data,
      });
    }
    return NextResponse.json(updatedInfo);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal memperbarui data' }, { status: 500 });
  }
}