// File: app/api/kontak/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Mengambil data kontak
export async function GET() {
  try {
    const kontak = await prisma.kontakSekolah.findFirst();
    if (!kontak) {
      // Kirim data default jika belum ada
      return NextResponse.json({
        alamat: 'Jl. Sekolah No. 1, Kota Anda',
        telepon: '022-123456',
        email: 'info@sekolah.sch.id',
        instagram: '',
        facebook: '',
        website: '',
        petaLokasi: '',
      });
    }
    return NextResponse.json(kontak);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data kontak' }, { status: 500 });
  }
}

// PUT: Memperbarui data kontak
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { alamat, telepon, email, instagram, facebook, website, petaLokasi } = body;

    // Validasi
    if (!alamat || !telepon || !email) {
      return NextResponse.json({ message: 'Alamat, Telepon, dan Email wajib diisi' }, { status: 400 });
    }

    const existingKontak = await prisma.kontakSekolah.findFirst();
    let updatedKontak;

    if (existingKontak) {
      updatedKontak = await prisma.kontakSekolah.update({
        where: { id: existingKontak.id },
        data: body,
      });
    } else {
      updatedKontak = await prisma.kontakSekolah.create({
        data: body,
      });
    }
    return NextResponse.json(updatedKontak);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal memperbarui data kontak' }, { status: 500 });
  }
}