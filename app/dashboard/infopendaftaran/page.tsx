// File: app/dashboard/infopendaftaran/page.tsx
'use client';

import { useState, useEffect } from 'react';

// Fungsi helper untuk format tanggal ke YYYY-MM-DD
const formatDateForInput = (date: Date | string) => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};

export default function KelolaInfoPendaftaranPage() {
  const [formData, setFormData] = useState({
    jadwalMulai: '',
    jadwalSelesai: '',
    persyaratan: '',
    prosedur: '',
    kontakPendaftaran: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/infopendaftaran');
        const data = await response.json();
        if (response.ok) {
          // Format tanggal untuk input type="date"
          setFormData({
            ...data,
            jadwalMulai: formatDateForInput(data.jadwalMulai),
            jadwalSelesai: formatDateForInput(data.jadwalSelesai),
          });
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
      const response = await fetch('/api/infopendaftaran', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Info Pendaftaran berhasil diperbarui!');
      } else {
        alert('Gagal memperbarui data');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !formData.persyaratan) {
    return <div>Memuat data...</div>;
  }

  return (
    <div>
      <h1>Kelola Info Pendaftaran</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>Jadwal Mulai</label>
        <input name="jadwalMulai" type="date" value={formData.jadwalMulai} onChange={handleChange} required />
        <label>Jadwal Selesai</label>
        <input name="jadwalSelesai" type="date" value={formData.jadwalSelesai} onChange={handleChange} required />
        <label>Persyaratan</label>
        <textarea name="persyaratan" value={formData.persyaratan} onChange={handleChange} rows={10} required />
        <label>Prosedur</label>
        <textarea name="prosedur" value={formData.prosedur} onChange={handleChange} rows={10} required />
        <label>Kontak Pendaftaran</label>
        <input name="kontakPendaftaran" value={formData.kontakPendaftaran} onChange={handleChange} required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan Info Pendaftaran'}
        </button>
      </form>
    </div>
  );
}