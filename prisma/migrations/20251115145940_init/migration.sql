-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilSekolah" (
    "id" SERIAL NOT NULL,
    "namaSekolah" TEXT NOT NULL,
    "sejarah" TEXT NOT NULL,

    CONSTRAINT "ProfilSekolah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisiMisi" (
    "id" SERIAL NOT NULL,
    "visi" TEXT NOT NULL,
    "misi" TEXT NOT NULL,

    CONSTRAINT "VisiMisi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KontakSekolah" (
    "id" SERIAL NOT NULL,
    "telepon" TEXT,
    "email" TEXT,
    "alamat" TEXT NOT NULL,
    "instagram" TEXT,
    "facebook" TEXT,
    "website" TEXT,
    "petaLokasi" TEXT,

    CONSTRAINT "KontakSekolah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoPendaftaran" (
    "id" SERIAL NOT NULL,
    "jadwalMulai" DATE NOT NULL,
    "jadwalSelesai" DATE NOT NULL,
    "persyaratan" TEXT NOT NULL,
    "prosedur" TEXT NOT NULL,
    "kontakPendaftaran" TEXT NOT NULL,

    CONSTRAINT "InfoPendaftaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatistikSekolah" (
    "id" SERIAL NOT NULL,
    "jumlahSiswa" INTEGER NOT NULL,
    "jumlahGuru" INTEGER NOT NULL,

    CONSTRAINT "StatistikSekolah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeritaKegiatan" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gambar" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,

    CONSTRAINT "BeritaKegiatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ekstrakurikuler" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "pembina" TEXT NOT NULL,
    "jadwal" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "Ekstrakurikuler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaranaPrasarana" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "tipe" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,

    CONSTRAINT "SaranaPrasarana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prestasi" (
    "id" SERIAL NOT NULL,
    "namaPrestasi" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "penyelenggara" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "Prestasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BeritaKegiatan_judul_key" ON "BeritaKegiatan"("judul");

-- CreateIndex
CREATE UNIQUE INDEX "BeritaKegiatan_slug_key" ON "BeritaKegiatan"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Ekstrakurikuler_nama_key" ON "Ekstrakurikuler"("nama");
