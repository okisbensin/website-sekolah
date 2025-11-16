// File: app/prestasi/page.tsx
import Image from 'next/image';

// Data Prestasi Statis (dari BAB 1 )
// Nanti ini bisa Anda ambil dari API (/api/prestasi)
const dataPrestasi = [
  { "juara": "Juara I", "nama": "OSN (KIMIA)", "tingkat": "Kabupaten", "tahun": 2023 }, 
  { "juara": "Juara II", "nama": "Basket (Evaram 2023)", "tingkat": "Kabupaten", "tahun": 2023 }, 
  { "juara": "Juara II", "nama": "O2SN", "tingkat": "Jawa Barat", "tahun": 2019 }, 
  { "juara": "Juara III", "nama": "Asia Open Pencak Silat", "tingkat": "Asia", "tahun": 2019 }, 
  { "juara": "Juara I", "nama": "Lomba SINDO", "tingkat": "Asia-Eropa", "tahun": 2018 }, 
  { "juara": "Juara I", "nama": "Lomba PRAMUKA MASCOT 2.0", "tingkat": "Jabar-Banten-DKI Jakarta", "tahun": 2017 }, 
];

export default function PrestasiPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-section -mt-[88px]">
        <Image src="/placeholder-hero.jpg" alt="Prestasi" layout="fill" className="hero-image" priority />
        <div className="hero-content">
          <h1 className="text-5xl font-bold">Prestasi Sekolah</h1>
        </div>
      </section>

      {/* Konten Halaman */}
      <div className="container mx-auto py-24 px-4">
        <h2 className="text-3xl font-bold text-brand-dark mb-8">
          Prestasi Akademik & Non-Akademik
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          Siswa-siswi SMA Pasundan Majalaya aktif mengukir prestasi di berbagai bidang,
          baik di tingkat regional, nasional, maupun internasional.
        </p>

        {/* Tabel Prestasi */}
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-left text-gray-700">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">Tahun</th>
                <th scope="col" className="px-6 py-3">Nama Lomba / Event</th>
                <th scope="col" className="px-6 py-3">Pencapaian</th>
                <th scope="col" className="px-6 py-3">Tingkat</th>
              </tr>
            </thead>
            <tbody>
              {dataPrestasi.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{item.tahun}</td>
                  <td className="px-6 py-4">{item.nama}</td>
                  <td className="px-6 py-4 font-semibold text-brand-green">{item.juara}</td>
                  <td className="px-6 py-4">{item.tingkat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          *Ini adalah sebagian data prestasi. Data lengkap dikelola oleh Admin.
        </p>
      </div>
    </div>
  );
}