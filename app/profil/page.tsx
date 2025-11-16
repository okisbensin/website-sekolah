// File: app/profil/page.tsx
import Image from 'next/image';

// Komponen Pimpinan (dari mock-up & BAB 1)
const PimpinanCard = ({ imgSrc, name, title }: { imgSrc: string; name: string; title: string }) => (
  <div className="text-center">
    <Image
      src={imgSrc}
      alt={name}
      width={200}
      height={200}
      objectFit="cover"
      className="rounded-full shadow-lg mx-auto bg-gray-200" // bg-gray-200 sbg placeholder
    />
    <h3 className="text-xl font-bold mt-4">{name}</h3>
    <p className="text-gray-600">{title}</p>
  </div>
);

export default function ProfilPage() {
  return (
    <div>
      {/* --- Hero Section Halaman Profil --- */}
      <section className="hero-section -mt-[88px]">
        <Image
          src="/placeholder-hero.jpg" // Ganti gambar
          alt="Profil SMA Pasundan Majalaya"
          layout="fill"
          quality={80}
          className="hero-image"
          priority
        />
        <div className="hero-content">
          <h1 className="text-5xl font-bold">Profil SMA Pasundan Majalaya</h1>
        </div>
      </section>

      {/* --- Sejarah Singkat (dari BAB 1) --- */}
      <section className="container mx-auto py-24 px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-brand-dark mb-4">Sejarah Singkat</h2>
        <p className="text-lg text-gray-700 mb-4">
          SMA Pasundan Majalaya didirikan pada tanggal 20 Mei 1981 oleh suatu panitia pendiri yang dikukuhkan oleh Surat Keputusan Yayasan Pendidikan Pasundan Nomor 012/SK-YPP/V/1981.
        </p>
        <p className="text-lg text-gray-700">
          Semenjak didirikan sampai dengan sekarang, SMA Pasundan Majalaya telah mengalami pergantian Kepala Sekolah sebanyak 8 (delapan) kali pergantian, dan saat ini dipimpin oleh Kepala Sekolah ke-9, Yanyan Sofyan Fadilah, S.Ag.
        </p>
      </section>

      {/* --- Visi & Misi (dari BAB 2 & Mock-up) --- */}
      <section id="visi-misi" className="bg-gray-50 py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-brand-dark text-center mb-12">
            Visi & Misi Sekolah
          </h2>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-brand-green">Visi</h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mt-2">
              “Terwujudnya Profil Murid Yang Berkarakter Nyantri, Nyakola, Dan Nyunda Menuju Gapura Panca Waluya”.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <h4 className="text-2xl font-bold text-brand-dark mb-2">Nyantri (Berakhlak Mulia)</h4>
              <p className="text-gray-700">
                Murid memahami nilai-nilai agama, menghayatinya, serta menerapkannya dalam kehidupan sehari-hari yang diwujudkan berupa budi pekerti dan akhlak mulia.
              </p>
            </div>
            <div className="text-center p-6">
              <h4 className="text-2xl font-bold text-brand-dark mb-2">Nyakola (Berilmu & Mandiri)</h4>
              <p className="text-gray-700">
                Potensi akademik dan non akademik murid berkembang sehingga mampu mencapai kompetensi lulusan agar dapat hidup mandiri dan mengikuti pendidikan lebih lanjut.
              </p>
            </div>
            <div className="text-center p-6">
              <h4 className="text-2xl font-bold text-brand-dark mb-2">Nyunda (Menjunjung Budaya)</h4>
              <p className="text-gray-700">
                Murid sadar akan jatidirinya, berpijak lekat dengan tradisi kedaerahan Tatar Pasundan dalam bentuk nilai etika dan budaya kesundaan: “Silih asih, silih asah, dan silih asuh”.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <h3 className="text-2xl font-semibold text-brand-green">Misi</h3>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mt-4">
              Meningkatkan keimanan, ketakwaan, serta akhlak mulia; Mengimplementasikan IMTAQ yang sinergis dengan IPTEK; Melaksanakan proses pendidikan yang sesuai kebutuhan hidup siswa; Mewujudkan lulusan yang berprestasi; dan Mengaktualisasikan budaya Sunda.
            </p>
          </div>
        </div>
      </section>

      {/* --- Pimpinan Sekolah (dari Mock-up & BAB 1) --- */}
      <section className="container mx-auto py-24 px-4">
        <h2 className="text-3xl font-bold text-brand-dark text-center mb-12">
          Pimpinan Sekolah
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <PimpinanCard
            imgSrc="/placeholder-pimpinan.png" // Ganti foto
            name="Yanyan Sofyan Fadilah, S.Ag"
            title="Kepala Sekolah"
          /> 
          <PimpinanCard
            imgSrc="/placeholder-pimpinan.png" // Ganti foto
            name="Iwa Kurniawan, S.Pd.I.,M.Pd."
            title="Wakasek Kurikulum"
          />
          <PimpinanCard
            imgSrc="/placeholder-pimpinan.png" // Ganti foto
            name="Desi Purwatesa, ST."
            title="Wakasek Kesiswaan"
          /> 
          <PimpinanCard
            imgSrc="/placeholder-pimpinan.png" // Ganti foto
            name="Dudu Abdulah, S.Pd"
            title="Wakasek Sarana & Prasarana"
          />
        </div>
      </section>
    </div>
  );
}