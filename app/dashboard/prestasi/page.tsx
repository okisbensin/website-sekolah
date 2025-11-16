// File: app/dashboard/prestasi/page.tsx
'use client';

import { useState, useEffect } from 'react';

type Prestasi = {
  id: number;
  namaPrestasi: string;
  kategori: string;
  tahun: number;
  penyelenggara: string;
  deskripsi: string;
};

export default function KelolaPrestasiPage() {
  const [listPrestasi, setListPrestasi] = useState<Prestasi[]>([]);
  const [formData, setFormData] = useState({
    namaPrestasi: '',
    kategori: 'Akademik',
    tahun: new Date().getFullYear(),
    penyelenggara: '',
    deskripsi: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/prestasi');
      const data = await response.json();
      if (response.ok) {
        setListPrestasi(data);
      }
    } catch (error) {
      alert('Gagal mengambil daftar prestasi');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/prestasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Prestasi berhasil ditambah!');
        setFormData({
          namaPrestasi: '',
          kategori: 'Akademik',
          tahun: new Date().getFullYear(),
          penyelenggara: '',
          deskripsi: '',
        });
        fetchData();
      } else {
        alert('Gagal menambah prestasi');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Kelola Prestasi</h1>
      
      <h2>Tambah Prestasi Baru</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <input name="namaPrestasi" value={formData.namaPrestasi} onChange={handleChange} placeholder="Nama Prestasi/Lomba" required />
        <select name="kategori" value={formData.kategori} onChange={handleChange}>
          <option value="Akademik">Akademik</option>
          <option value="Non-Akademik">Non-Akademik</option>
        </select>
        <input name="tahun" type="number" value={formData.tahun} onChange={handleChange} placeholder="Tahun" required />
        <input name="penyelenggara" value={formData.penyelenggara} onChange={handleChange} placeholder="Penyelenggara" required />
        <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} placeholder="Deskripsi (opsional)" />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Tambah Prestasi'}
        </button>
      </form>

      <h2>Daftar Prestasi</h2>
      {isLoading && listPrestasi.length === 0 ? (
        <p>Memuat data...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {listPrestasi.map((item) => (
            <li key={item.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <h3>{item.namaPrestasi} ({item.tahun})</h3>
              <p>Kategori: {item.kategori}</p>
              <p>Penyelenggara: {item.penyelenggara}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}