// File: app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import * as jose from 'jose'; // Untuk membuat JWT
import { setCookie } from 'cookies-next'; // Untuk menyimpan cookie

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email dan password wajib diisi' }, { status: 400 });
    }

    // 1. Cari Admin berdasarkan email
    const admin = await prisma.admin.findUnique({
      where: { email: email },
    });

    if (!admin) {
      return NextResponse.json({ message: 'Email atau password salah' }, { status: 401 }); // 401 Unauthorized
    }

    // 2. Bandingkan password yang diinput dengan hash di database
    //    CATATAN: Ini mengasumsikan password di DB sudah di-hash.
    //    Jika Anda belum punya Admin, Anda harus membuatnya manual di Supabase
    //    dan gunakan bcrypt hash generator online untuk membuat hash password.
    // const isPasswordValid = await bcrypt.compare(password, admin.password);

    // UNTUK SEMENTARA (karena kita belum hash password):
    // Ganti ini dengan pengecekan bcrypt.compare di atas saat Anda siap
    // const isPasswordValid = (password === admin.password); 
    
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Email atau password salah' }, { status: 401 });
    }

    // 3. Jika valid, buat JSON Web Token (JWT)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'rahasia-super-aman-ganti-ini');
    const token = await new jose.SignJWT({ adminId: admin.id, email: admin.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h') // Token berlaku 24 jam
      .sign(secret);

    // 4. Atur token sebagai HTTP-Only Cookie
    const response = NextResponse.json({ message: 'Login berhasil', name: admin.name });
    setCookie('auth-token', token, {
      req: request as any,
      res: response,
      httpOnly: true, // Cookie tidak bisa diakses JS di frontend (lebih aman)
      secure: process.env.NODE_ENV === 'production', // Hanya HTTPS di production
      maxAge: 60 * 60 * 24, // 24 jam
      path: '/',
    });

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
  }
}