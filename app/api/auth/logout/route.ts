// File: app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { setCookie } from 'cookies-next';

export async function POST(request: Request) {
  // Menghapus cookie dengan mengaturnya ke masa lalu
  const response = NextResponse.json({ message: 'Logout berhasil' });
  setCookie('auth-token', '', {
    req: request as any,
    res: response,
    maxAge: 0, // Set kadaluarsa ke 0
    path: '/',
  });
  return response;
}