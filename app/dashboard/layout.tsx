// File: app/dashboard/layout.tsx

import React from 'react';
import Link from 'next/link';

// Komponen Sidebar dengan SEMUA link
const Sidebar = () => {
  const linkStyle: React.CSSProperties = {
    display: 'block',
    padding: '10px 15px',
    textDecoration: 'none',
    color: 'black',
    borderRadius: '5px',
  };

  // Kita bisa tambahkan style untuk link yang aktif nanti
  // const activeLinkStyle: React.CSSProperties = { ... };

  return (
    <nav style={{ width: '250px', borderRight: '1px solid #ccc', padding: '1rem', background: '#f9f9f9' }}>
      <h3 style={{ paddingLeft: '15px' }}>Navigasi Admin</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
          <Link href="/dashboard" style={linkStyle}>
            Dasbor Utama
          </Link>
        </li>
        
        <hr style={{ border: 'none', borderBottom: '1px solid #eee' }} />

        {/* --- Link Halaman Statis (Singleton) --- */}
        <li>
          <Link href="/dashboard/profil" style={linkStyle}>
            Kelola Profil Sekolah
          </Link>
        </li>
        <li>
          <Link href="/dashboard/visimisi" style={linkStyle}>
            Kelola Visi & Misi
          </Link>
        </li>
        <li>
          <Link href="/dashboard/kontak" style={linkStyle}>
            Kelola Kontak
          </Link>
        </li>
        <li>
          <Link href="/dashboard/infopendaftaran" style={linkStyle}>
            Kelola Info Pendaftaran
          </Link>
        </li>
        <li>
          <Link href="/dashboard/statistik" style={linkStyle}>
            Kelola Jml Siswa & Guru
          </Link>
        </li>

        <hr style={{ border: 'none', borderBottom: '1px solid #eee' }} />
        
        {/* --- Link Halaman Dinamis (Banyak Data) --- */}
        <li>
          <Link href="/dashboard/berita" style={linkStyle}>
            Kelola Berita/Kegiatan
          </Link>
        </li>
        <li>
          <Link href="/dashboard/ekstrakurikuler" style={linkStyle}>
            Kelola Ekstrakurikuler
          </Link>
        </li>
        <li>
          <Link href="/dashboard/sarpras" style={linkStyle}>
            Kelola Fasilitas (Sarpras)
          </Link>
        </li>
        <li>
          <Link href="/dashboard/prestasi" style={linkStyle}>
            Kelola Prestasi
          </Link>
        </li>
      </ul>
    </nav>
  );
};

// Layout Induk Dashboard
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Tambahkan logika cek login (Autentikasi) di sini
  // const isLoggedIn = false;
  // if (!isLoggedIn) {
  //   redirect('/login');
  // }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2rem', background: '#fff' }}>
        {children}
      </main>
    </div>
  );
}