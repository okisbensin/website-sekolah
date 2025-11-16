// File: app/components/Footer.tsx
import Link from 'next/link';

export const Footer = () => (
  // Kita gunakan data asli dari file BAB 1
  <footer className="bg-brand-dark text-gray-300 p-8 mt-auto">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">SMA Pasundan Majalaya</h3>
        <p>Jl. Leuwidulang No. 22, Sukamaju, Majalaya </p>
        <p>Kabupaten Bandung, 40382 </p>
        <p>Email: sma_pasma@yahoo.com </p>
        <p>Telp: (022) 5950013 </p>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Tautan Cepat</h3>
        <ul>
          <li><Link href="/profil" className="hover:text-white">Profil Sekolah</Link></li>
          <li><Link href="/profil#visi-misi" className="hover:text-white">Visi & Misi</Link></li>
          <li><Link href="/prestasi" className="hover:text-white">Prestasi</Link></li>
          <li><Link href="/info-pendaftaran" className="hover:text-white">Info Pendaftaran</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Admin</h3>
        <Link href="/login" className="hover:text-white">Login Admin</Link>
      </div>
    </div>
    <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} SMA Pasundan Majalaya. All rights reserved.</p>
    </div>
  </footer>
);