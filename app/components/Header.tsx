// File: app/components/Header.tsx
'use client'; // WAJIB untuk 'usePathname'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Cek apakah ini halaman Beranda
  const isHomepage = pathname === '/';

  // Efek untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tentukan kelas CSS untuk header
  // - Transparan di Beranda & belum di-scroll
  // - Solid (gelap) jika di-scroll atau jika bukan di Beranda
  const headerClass =
    isHomepage && !isScrolled
      ? 'bg-transparent text-white' // Transparan
      : 'bg-brand-dark text-white shadow-md'; // Solid

  return (
    <header className={`sticky top-0 z-50 p-4 transition-colors duration-300 ${headerClass}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          SMA Pasundan Majalaya
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="hover:text-gray-300">Beranda</Link>
          <Link href="/profil" className="hover:text-gray-300">Profil Sekolah</Link>
          <Link href="/prestasi" className="hover:text-gray-300">Prestasi</Link>
          <Link href="/fasilitas" className="hover:text-gray-300">Fasilitas</Link>
          <Link href="/galeri" className="hover:text-gray-300">Galeri</Link>
          <Link href="/kontak" className="hover:text-gray-300">Kontak</Link>
          <Link
            href="/login"
            className="bg-brand-green text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};