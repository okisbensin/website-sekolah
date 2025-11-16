// File: app/api/profil/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * FUNGSI: GET (Read)
 * Mengambil satu-satunya data profil sekolah.
 * URL: http://localhost:3000/api/profil
 */
export async function GET() {
  try {
    // Cari data profil pertama yang ada di database
    const profil = await prisma.profilSekolah.findFirst();
    
    // Jika tidak ada data profil sama sekali, kita kirim data default
    if (!profil) {
      return NextResponse.json({
        id: null, // Menandakan ini belum ada di DB
        namaSekolah: 'Nama Sekolah Anda',
        sejarah: 'Tuliskan sejarah sekolah di sini...',
      });
    }
    
    // Jika ada, kirim data tersebut
    return NextResponse.json(profil);

  } catch (error) {
    console.error('Error fetching profil:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data profil' },
      { status: 500 }
    );
  }
}

/**
 * FUNGSI: PUT (Update or Create)
 * Memperbarui data profil sekolah.
 * URL: http://localhost:3000/api/profil
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { namaSekolah, sejarah } = body;

    // Validasi
    if (!namaSekolah || !sejarah) {
      return NextResponse.json(
        { message: 'Nama sekolah dan sejarah wajib diisi' },
        { status: 400 }
      );
    }

    // Cari data profil yang ada
    const existingProfile = await prisma.profilSekolah.findFirst();

    let updatedProfile;

    if (existingProfile) {
      // JIKA SUDAH ADA: Update data tersebut
      updatedProfile = await prisma.profilSekolah.update({
        where: { id: existingProfile.id },
        data: {
          namaSekolah,
          sejarah,
        },
      });
    } else {
      // JIKA BELUM ADA: Buat data baru
      updatedProfile = await prisma.profilSekolah.create({
        data: {
          namaSekolah,
          sejarah,
        },
      });
    }

    return NextResponse.json(updatedProfile);

  } catch (error) {
    console.error('Error updating profil:', error);
    return NextResponse.json(
      { message: 'Gagal memperbarui data profil' },
      { status: 500 }
    );
  }
}