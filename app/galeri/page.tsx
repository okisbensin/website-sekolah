// File: app/galeri/page.tsx
import Image from 'next/image';
export default function GaleriPage() {
  return (
    <div>
      <section className="hero-section -mt-[88px]">
        <Image src="/placeholder-hero.jpg" alt="Galeri" layout="fill" className="hero-image" priority />
        <div className="hero-content">
          <h1 className="text-5xl font-bold">Galeri Sekolah</h1>
        </div>
      </section>
      <div className="container mx-auto py-24 px-4">
        <h2 className="text-3xl font-bold text-brand-dark mb-8">
          Galeri Foto & Kegiatan
        </h2>
        <p className="text-lg text-gray-700">
          Halaman galeri sedang disiapkan.
        </p>
      </div>
    </div>
  );
}