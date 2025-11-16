// File: app/api/berita/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Impor Prisma Client global Anda

/**
 * FUNGSI: GET (Read)
 * Mengambil semua data berita/kegiatan
 * URL: http://localhost:3000/api/berita
 */
export async function GET() {
  try {
    const berita = await prisma.beritaKegiatan.findMany({
      orderBy: {
        tanggal: 'desc', // Tampilkan yang terbaru di atas
      },
    });
    return NextResponse.json(berita);
  } catch (error) {
    console.error('Error fetching berita:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data berita' },
      { status: 500 }
    );
  }
}

/**
 * FUNGSI: POST (Create)
 * Membuat berita/kegiatan baru
 * URL: http://localhost:3000/api/berita
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { judul, isi, gambar, kategori } = body;

    // Validasi sederhana (Anda bisa kembangkan nanti)
    if (!judul || !isi || !kategori) {
      return NextResponse.json(
        { message: 'Judul, isi, dan kategori wajib diisi' },
        { status: 400 }
      );
    }

    // Buat "slug" secara otomatis dari judul
    // "Berita Baru Saya" -> "berita-baru-saya"
    const slug = judul
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')  // Hapus karakter non-alfanumerik
      .replace(/[\s_-]+/g, '-')     // Ganti spasi/underscore dengan strip
      .replace(/^-+|-+$/g, '');     // Hapus strip di awal/akhir

    const newBerita = await prisma.beritaKegiatan.create({
      data: {
        judul,
        slug, // Slug yang dibuat otomatis
        isi,
        gambar, // URL gambar
        kategori,
        // 'tanggal' akan diisi otomatis oleh database (default now())
      },
    });

    return NextResponse.json(newBerita, { status: 201 }); // 201 = Created
  } catch (error) {
    console.error('Error creating berita:', error);
    return NextResponse.json(
      { message: 'Gagal membuat berita baru' },
      { status: 500 }
    );
  }
}