// File: middleware.ts (di root folder)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Jika tidak ada token dan mencoba akses dashboard
  if (!token && pathname.startsWith('/dashboard')) {
    // Redirect ke halaman login
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 2. Jika ada token
  if (token) {
    try {
      // Verifikasi token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'rahasia-super-aman-ganti-ini');
      await jose.jwtVerify(token, secret);
      
      // Jika token valid dan pengguna mencoba akses /login
      if (pathname.startsWith('/login')) {
        // Redirect ke dashboard karena sudah login
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      }
      
      // Jika token valid, lanjutkan ke halaman dashboard
      return NextResponse.next();

    } catch (error) {
      // Token tidak valid (kadaluarsa, dll)
      if (pathname.startsWith('/dashboard')) {
        // Hapus cookie yang rusak dan redirect ke login
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        const response = NextResponse.redirect(url);
        response.cookies.delete('auth-token');
        return response;
      }
    }
  }

  // Lanjutkan request jika bukan halaman dashboard atau login
  return NextResponse.next();
}

// Tentukan path mana saja yang akan dijaga oleh Middleware
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};