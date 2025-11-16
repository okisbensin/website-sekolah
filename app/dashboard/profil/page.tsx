// File: app/dashboard/profil/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function KelolaProfilPage() {
  const [namaSekolah, setNamaSekolah] = useState('');
  const [sejarah, setSejarah] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Mulai dengan loading

  // 1. Ambil data profil saat halaman dimuat
  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const response = await fetch('/api/profil');
        const data = await response.json();
        
        if (response.ok) {
          // Isi formulir dengan data dari database
          setNamaSekolah(data.namaSekolah);
          setSejarah(data.sejarah);
        } else {
          alert('Gagal mengambil data profil');
        }
      } catch (error) {
        alert('Terjadi kesalahan saat mengambil data');
      } finally {
        setIsLoading(false); // Selesai loading
      }
    };

    fetchProfil();
  }, []); // Array kosong [] berarti fungsi ini hanya berjalan sekali saat halaman dimuat

  // 2. Fungsi untuk menyimpan perubahan
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/profil', {
        method: 'PUT', // Gunakan PUT untuk update
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          namaSekolah,
          sejarah,
        }),
      });

      if (response.ok) {
        alert('Profil sekolah berhasil diperbarui!');
      } else {
        const errorData = await response.json();
        alert(`Gagal memperbarui: ${errorData.message}`);
      }
    } catch (error) {
      alert('Terjadi kesalahan. Coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  // Tampilkan pesan loading jika data belum siap
  if (isLoading && !namaSekolah) {
    return <div>Memuat data profil...</div>;
  }

  // 3. Tampilan formulir
  return (
    <div>
      <h1>Kelola Profil Sekolah</h1>
      <p>Data di halaman ini hanya ada satu. Menyimpan akan memperbarui data yang ada.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="namaSekolah">Nama Sekolah</label>
          <input
            id="namaSekolah"
            type="text"
            value={namaSekolah}
            onChange={(e) => setNamaSekolah(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label htmlFor="sejarah">Sejarah Sekolah</label>
          <textarea
            id="sejarah"
            value={sejarah}
            onChange={(e) => setSejarah(e.target.value)}
            required
            rows={15}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" disabled={isLoading} style={{ padding: '10px', cursor: 'pointer' }}>
          {isLoading ? 'Menyimpan...' : 'Simpan Perubahan Profil'}
        </button>
      </form>
    </div>
  );
}