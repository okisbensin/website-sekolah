// File: app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

// --- Komponen Statistik (seperti di mock-up) ---
const StatCounter = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center text-white">
    <p className="text-4xl font-bold">{number}</p>
    <p className="text-lg">{label}</p>
  </div>
);

export default function Home() {
  return (
    <div>
      {/* --- Hero Section --- */}
      <section className="hero-section -mt-[88px]"> {/* Trik: Tarik ke atas di belakang header */}
        <Image
          src="/placeholder-hero.jpg" // Ganti dengan gambar gedung sekolah
          alt="Gedung SMA Pasundan Majalaya"
          layout="fill"
          quality={80}
          className="hero-image"
          priority
        />
        <div className="hero-content">
          <h1 className="text-5xl font-bold mb-4">
            Selamat Datang di Website Resmi
            <br />
            SMA Pasundan Majalaya
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            "Terwujudnya Profil Murid Yang Berkarakter Nyantri, Nyakola, Dan Nyunda Menuju Gapura Panca Waluya"
          </p>
          <div className="flex gap-4">
            <Link href="/info-pendaftaran" className="bg-brand-green text-white px-6 py-3 rounded-md text-lg font-semibold transition-colors">
              Info Pendaftaran
            </Link>
          </div>
        </div>
      </section>

      {/* --- Bagian Sambutan (Mock-up) --- */}
      <section className="container mx-auto py-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-brand-dark mb-4">
              Dari Kepala Sekolah
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Assalamu'alaikum Warahmatullahi Wabarakatuh,
              <br /><br />
              Selamat datang di website resmi SMA Pasundan Majalaya. Kami hadir untuk mengembangkan potensi murid agar menjadi manusia yang beriman dan bertakwa, berakhlak mulia, sehat, berilmu, cakap, kreatif, mandiri, dan menjadi warga negara yang demokratis serta bertanggung jawab.
            </p>
            <Link href="/profil" className="text-brand-green font-semibold hover:underline">
              Baca Selengkapnya &rarr;
            </Link>
          </div>
          <div className="text-center">
            {/* Foto Kepsek (Placeholder) */}
            <Image
              src="/placeholder-kepsek.jpg" // Ganti dengan foto Yanyan Sofyan Fadilah
              alt="Yanyan Sofyan Fadilah, S.Ag"
              width={300}
              height={300}
              objectFit="cover"
              className="rounded-full shadow-lg mx-auto"
            />
            <h3 className="text-xl font-bold mt-4">Yanyan Sofyan Fadilah, S.Ag</h3> 
            <p className="text-gray-600">Kepala Sekolah </p>
          </div>
        </div>
      </section>

      {/* --- Bagian Statistik (Data dari BAB 1) --- */}
      <section className="bg-brand-green py-12">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter number="1030" label="Siswa Aktif Terdaftar" /> 
          <StatCounter number="63" label="Pendidik & Staf Profesional" /> 
          <StatCounter number="13" label="Ekstrakurikuler Pilihan" /> 
          <StatCounter number="93,33%" label="Kemampuan Literasi 'Baik'" /> 
        </div>
      </section>

      {/* --- Bagian Berita (Placeholder) --- */}
      <section className="bg-gray-50 py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-brand-dark text-center mb-12">
            Kegiatan & Berita Terbaru
          </h2>
          {/* Nanti bagian ini akan diisi data dari CMS */}
          <p className="text-center text-gray-700">
            Halaman berita sedang dalam pengembangan. Admin akan segera mengisi konten di sini.
          </p>
          <div className="text-center mt-12">
            <Link href="/berita" className="bg-brand-green text-white px-6 py-3 rounded-md text-lg font-semibold transition-colors">
              Lihat Semua Berita
            </Link>
          </div>
        </div>
      </section>
      
      {/* --- Bagian Hubungi Kami (dari Mock-up) --- */}
      <section className="bg-brand-dark py-24 px-4 text-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-6">Hubungi Kami</h2>
          <p className="mb-8">
            Ada pertanyaan? Jangan ragu untuk menghubungi kami melalui formulir di halaman kontak.
          </p>
          <Link href="/kontak" className="bg-white text-brand-dark px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-200 transition-colors">
            Pergi ke Halaman Kontak
          </Link>
        </div>
      </section>
    </div>
  );
}