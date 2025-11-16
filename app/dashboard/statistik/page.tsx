// File: app/dashboard/statistik/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function KelolaStatistikPage() {
  const [jumlahSiswa, setJumlahSiswa] = useState(0);
  const [jumlahGuru, setJumlahGuru] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/statistik');
        const data = await response.json();
        if (response.ok) {
          setJumlahSiswa(data.jumlahSiswa);
          setJumlahGuru(data.jumlahGuru);
        } else {
          alert('Gagal mengambil data');
        }
      } catch (error) {
        alert('Terjadi kesalahan');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/statistik', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jumlahSiswa, jumlahGuru }),
      });

      if (response.ok) {
        alert('Statistik berhasil diperbarui!');
      } else {
        alert('Gagal memperbarui data');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && jumlahSiswa === 0) {
    return <div>Memuat data...</div>;
  }

  return (
    <div>
      <h1>Kelola Jumlah Siswa & Guru</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>Jumlah Siswa</label>
        <input
          type="number"
          value={jumlahSiswa}
          onChange={(e) => setJumlahSiswa(Number(e.target.value))}
          required
        />
        <label>Jumlah Guru</label>
        <input
          type="number"
          value={jumlahGuru}
          onChange={(e) => setJumlahGuru(Number(e.target.value))}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan Statistik'}
        </button>
      </form>
    </div>
  );
}