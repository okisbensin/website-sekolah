// File: app/dashboard/visimisi/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function KelolaVisiMisiPage() {
  const [visi, setVisi] = useState('');
  const [misi, setMisi] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 1. Ambil data saat halaman dimuat
  useEffect(() => {
    const fetchVisiMisi = async () => {
      try {
        const response = await fetch('/api/visimisi');
        const data = await response.json();
        
        if (response.ok) {
          setVisi(data.visi);
          setMisi(data.misi);
        } else {
          alert('Gagal mengambil data Visi & Misi');
        }
      } catch (error) {
        alert('Terjadi kesalahan saat mengambil data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisiMisi();
  }, []); // [] = Hanya berjalan sekali saat halaman dimuat

  // 2. Fungsi untuk menyimpan perubahan
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/visimisi', {
        method: 'PUT', // Gunakan PUT untuk update
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ visi, misi }),
      });

      if (response.ok) {
        alert('Visi & Misi berhasil diperbarui!');
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

  // Tampilkan pesan loading
  if (isLoading && !visi) {
    return <div>Memuat data...</div>;
  }

  // 3. Tampilan formulir
  return (
    <div>
      <h1>Kelola Visi & Misi Sekolah</h1>
      <p>Data Visi & Misi hanya ada satu. Menyimpan akan memperbarui data yang ada.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="visi">Visi</label>
          <textarea
            id="visi"
            value={visi}
            onChange={(e) => setVisi(e.target.value)}
            required
            rows={10}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label htmlFor="misi">Misi</label>
          <textarea
            id="misi"
            value={misi}
            onChange={(e) => setMisi(e.target.value)}
            required
            rows={15}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" disabled={isLoading} style={{ padding: '10px', cursor: 'pointer' }}>
          {isLoading ? 'Menyimpan...' : 'Simpan Perubahan Visi & Misi'}
        </button>
      </form>
    </div>
  );
}