// File: app/dashboard/ekstrakurikuler/page.tsx
'use client';

import { useState, useEffect } from 'react';

// Tipe data dari Prisma
type Ekstrakurikuler = {
  id: number;
  nama: string;
  pembina: string;
  jadwal: string;
  deskripsi: string;
};

export default function KelolaEkstrakurikulerPage() {
  const [listEkskul, setListEkskul] = useState<Ekstrakurikuler[]>([]);
  const [formData, setFormData] = useState({ nama: '', pembina: '', jadwal: '', deskripsi: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk mengambil data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ekstrakurikuler');
      const data = await response.json();
      if (response.ok) {
        setListEkskul(data);
      }
    } catch (error) {
      alert('Gagal mengambil daftar ekskul');
    } finally {
      setIsLoading(false);
    }
  };

  // Ambil data saat halaman dimuat
  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk membuat data baru
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/ekstrakurikuler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Ekstrakurikuler berhasil ditambah!');
        setFormData({ nama: '', pembina: '', jadwal: '', deskripsi: '' }); // Reset form
        fetchData(); // Muat ulang data
      } else {
        const errorData = await response.json();
        alert(`Gagal: ${errorData.message}`);
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Kelola Ekstrakurikuler</h1>
      
      {/* Formulir Tambah Data */}
      <h2>Tambah Ekskul Baru</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <input name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama Ekskul" required />
        <input name="pembina" value={formData.pembina} onChange={handleChange} placeholder="Nama Pembina" required />
        <input name="jadwal" value={formData.jadwal} onChange={handleChange} placeholder="Jadwal (Contoh: Sabtu, 10:00 - 12:00)" />
        <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} placeholder="Deskripsi Singkat" required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Tambah Ekskul'}
        </button>
      </form>

      {/* Daftar Data */}
      <h2>Daftar Ekstrakurikuler</h2>
      {isLoading && listEkskul.length === 0 ? (
        <p>Memuat data...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {listEkskul.map((ekskul) => (
            <li key={ekskul.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <h3>{ekskul.nama}</h3>
              <p>Pembina: {ekskul.pembina}</p>
              <p>Jadwal: {ekskul.jadwal}</p>
              {/* Tambahkan tombol Edit/Delete di sini nanti */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}