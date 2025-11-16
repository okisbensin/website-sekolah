// File: app/api/visimisi/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * FUNGSI: GET (Read)
 * Mengambil satu-satunya data Visi & Misi.
 * URL: http://localhost:3000/api/visimisi
 */
export async function GET() {
  try {
    const visiMisi = await prisma.visiMisi.findFirst();

    // Jika belum ada data, kirim data default
    if (!visiMisi) {
      return NextResponse.json({
        id: null,
        visi: 'Tuliskan Visi Sekolah di sini...',
        misi: 'Tuliskan Misi Sekolah di sini...',
      });
    }

    return NextResponse.json(visiMisi);

  } catch (error) {
    console.error('Error fetching visi/misi:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data visi & misi' },
      { status: 500 }
    );
  }
}

/**
 * FUNGSI: PUT (Update or Create)
 * Memperbarui data Visi & Misi.
 * URL: http://localhost:3000/api/visimisi
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { visi, misi } = body;

    // Validasi
    if (!visi || !misi) {
      return NextResponse.json(
        { message: 'Visi dan Misi wajib diisi' },
        { status: 400 }
      );
    }

    // Cari data yang ada
    const existingVisiMisi = await prisma.visiMisi.findFirst();

    let updatedVisiMisi;

    if (existingVisiMisi) {
      // JIKA SUDAH ADA: Update
      updatedVisiMisi = await prisma.visiMisi.update({
        where: { id: existingVisiMisi.id },
        data: { visi, misi },
      });
    } else {
      // JIKA BELUM ADA: Buat baru
      updatedVisiMisi = await prisma.visiMisi.create({
        data: { visi, misi },
      });
    }

    return NextResponse.json(updatedVisiMisi);

  } catch (error) {
    console.error('Error updating visi/misi:', error);
    return NextResponse.json(
      { message: 'Gagal memperbarui data visi & misi' },
      { status: 500 }
    );
  }
}