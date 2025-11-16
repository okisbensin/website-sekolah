// File: app/fasilitas/page.tsx
import Image from 'next/image';
export default function EkstrakurikulerPage() {
  return (
    <div>
      <section className="hero-section -mt-[88px]">
        <Image src="/placeholder-hero.jpg" alt="Eskul" layout="fill" className="hero-image" priority />
        <div className="hero-content">
          <h1 className="text-5xl font-bold">Ekstrakurikuler</h1>
        </div>
      </section>
      <div className="container mx-auto py-24 px-4">
        <h2 className="text-3xl font-bold text-brand-dark mb-8">
          Eskul yang tersedia
        </h2>
        <p className="text-lg text-gray-700">
          Halaman ini sedang dalam pengembangan. Admin akan segera memasukkan data eskul sekolah
          yang dapat dikelola melalui CMS.
        </p>
        {/* Di sinilah nanti data dari 'Kelola Fasilitas' akan tampil */}
      </div>
    </div>
  );
}