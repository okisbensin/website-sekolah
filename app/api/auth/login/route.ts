// File: app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs'; // Pastikan Anda sudah npm install bcryptjs
import * as jose from 'jose';
import { setCookie } from 'cookies-next';

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
      // Jangan beri tahu error spesifik, demi keamanan
      return NextResponse.json({ message: 'Email atau password salah' }, { status: 401 });
    }

    // 2. Bandingkan password yang diinput dengan hash di database
    // Ini adalah kode yang benar dan sudah aktif
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Email atau password salah' }, { status: 401 });
    }

    // 3. Jika valid, buat JSON Web Token (JWT)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({ adminId: admin.id, email: admin.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h') // Token berlaku 24 jam
      .sign(secret);

    // 4. Atur token sebagai HTTP-Only Cookie
    const response = NextResponse.json({ message: 'Login berhasil', name: admin.name });
    
    setCookie('auth-token', token, {
      req: request as any,
      res: response,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 jam
      path: '/',
    });

    return response;

  } catch (error) {
    console.error(error);
    // Kirim pesan error generik ke klien
    return NextResponse.json({ message: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}