// File: app/dashboard/berita/page.tsx

// 'use client' adalah wajib di atas, karena kita akan menggunakan React Hooks (useState)
// untuk mengelola state formulir dan interaksi pengguna.
'use client'; 

import { useState } from 'react';

export default function KelolaBeritaPage() {
  // State untuk menyimpan data dari input formulir
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [kategori, setKategori] = useState('Berita'); // Default value
  const [gambar, setGambar] = useState(''); // Kita simpan URL gambar
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi yang dijalankan saat tombol "Simpan" ditekan
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah halaman refresh saat form disubmit
    setIsLoading(true);

    try {
      // Mengirim data ke API Route kita menggunakan 'fetch'
      const response = await fetch('/api/berita', {
        method: 'POST', // Kita menggunakan method POST (Create)
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          judul,
          isi,
          kategori,
          gambar,
        }),
      });

      if (response.ok) {
        // Jika sukses...
        alert('Berita berhasil dibuat!');
        // Kosongkan formulir
        setJudul('');
        setIsi('');
        setKategori('Berita');
        setGambar('');
      } else {
        // Jika gagal dari server (misal: validasi error)
        const errorData = await response.json();
        alert(`Gagal membuat berita: ${errorData.message}`);
      }
    } catch (error) {
      // Jika terjadi error jaringan
      console.error('Error jaringan:', error);
      alert('Terjadi kesalahan. Coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  // Ini adalah tampilan (HTML) dari halaman
  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Kelola Berita dan Kegiatan</h1>
      <p>Gunakan formulir ini untuk menambah berita atau kegiatan baru.</p>

      {/* Kita hubungkan fungsi handleSubmit ke 'onSubmit' dari form.
        Setiap input dihubungkan ke 'state' menggunakan 'value' dan 'onChange'.
      */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="judul">Judul</label>
          <input
            id="judul"
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label htmlFor="isi">Isi Berita</label>
          <textarea
            id="isi"
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            required
            rows={10}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label htmlFor="gambar">URL Gambar</label>
          <input
            id="gambar"
            type="text"
            value={gambar}
            onChange={(e) => setGambar(e.target.value)}
            placeholder="https://.../gambar.jpg"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label htmlFor="kategori">Kategori</label>
          <select
            id="kategori"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="Berita">Berita</option>
            <option value="Kegiatan">Kegiatan</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading} style={{ padding: '10px', cursor: 'pointer' }}>
          {isLoading ? 'Menyimpan...' : 'Simpan Berita'}
        </button>
      </form>
    </div>
  );
}