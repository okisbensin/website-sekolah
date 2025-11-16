// File: app/dashboard/kontak/page.tsx
'use client';

import { useState, useEffect } from 'react';

// Tipe data untuk form, agar sesuai dengan state
interface KontakForm {
  alamat: string;
  telepon: string;
  email: string;
  instagram: string;
  facebook: string;
  website: string;
  petaLokasi: string;
}

export default function KelolaKontakPage() {
  const [formData, setFormData] = useState<KontakForm>({
    alamat: '',
    telepon: '',
    email: '',
    instagram: '',
    facebook: '',
    website: '',
    petaLokasi: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi generik untuk update state form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 1. Ambil data saat halaman dimuat
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/kontak');
        const data = await response.json();
        if (response.ok) {
          setFormData(data);
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

  // 2. Simpan perubahan
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/kontak', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Data Kontak berhasil diperbarui!');
      } else {
        alert('Gagal memperbarui data');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !formData.alamat) {
    return <div>Memuat data kontak...</div>;
  }

  return (
    <div>
      <h1>Kelola Kontak Sekolah</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="telepon" value={formData.telepon} onChange={handleChange} placeholder="Telepon" required />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <textarea name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Alamat" required />
        <input name="website" value={formData.website} onChange={handleChange} placeholder="Website (https://...)" />
        <input name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Instagram (URL)" />
        <input name="facebook" value={formData.facebook} onChange={handleChange} placeholder="Facebook (URL)" />
        <input name="petaLokasi" value={formData.petaLokasi} onChange={handleChange} placeholder="URL Embed Peta Google" />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan Perubahan Kontak'}
        </button>
      </form>
    </div>
  );
}