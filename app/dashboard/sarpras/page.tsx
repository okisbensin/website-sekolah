// File: app/dashboard/sarpras/page.tsx
'use client';

import { useState, useEffect } from 'react';

type Sarpras = {
  id: number;
  nama: string;
  tipe: string;
  deskripsi: string;
  gambar: string;
};

export default function KelolaSarprasPage() {
  const [listSarpras, setListSarpras] = useState<Sarpras[]>([]);
  const [formData, setFormData] = useState({ nama: '', tipe: 'Sarana', deskripsi: '', gambar: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/sarpras');
      const data = await response.json();
      if (response.ok) {
        setListSarpras(data);
      }
    } catch (error) {
      alert('Gagal mengambil daftar sarpras');
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
      const response = await fetch('/api/sarpras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Sarpras berhasil ditambah!');
        setFormData({ nama: '', tipe: 'Sarana', deskripsi: '', gambar: '' });
        fetchData();
      } else {
        alert('Gagal menambah sarpras');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Kelola Sarana & Prasarana</h1>
      
      <h2>Tambah Data Baru</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <input name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama Fasilitas" required />
        <select name="tipe" value={formData.tipe} onChange={handleChange}>
          <option value="Sarana">Sarana</option>
          <option value="Prasarana">Prasarana</option>
        </select>
        <input name="gambar" value={formData.gambar} onChange={handleChange} placeholder="URL Gambar" />
        <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} placeholder="Deskripsi" required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Tambah Sarpras'}
        </button>
      </form>

      <h2>Daftar Sarpras</h2>
      {isLoading && listSarpras.length === 0 ? (
        <p>Memuat data...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {listSarpras.map((item) => (
            <li key={item.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <h3>{item.nama} ({item.tipe})</h3>
              {item.gambar && <img src={item.gambar} alt={item.nama} style={{ width: '200px', height: 'auto' }} />}
              <p>{item.deskripsi}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}