-- Tabel pengaturan PPDB
CREATE TABLE pengaturan_ppdb (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tahun_ajaran VARCHAR(20) NOT NULL,
  tanggal_mulai DATE NOT NULL,
  tanggal_selesai DATE NOT NULL,
  kuota INTEGER NOT NULL DEFAULT 200,
  biaya_pendaftaran INTEGER NOT NULL DEFAULT 0,
  status BOOLEAN DEFAULT true,
  keterangan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel pendaftaran siswa baru
CREATE TABLE pendaftaran (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nomor_pendaftaran VARCHAR(20) UNIQUE NOT NULL,
  tahun_ajaran VARCHAR(20) NOT NULL,
  -- Data Diri
  nama_lengkap VARCHAR(100) NOT NULL,
  nik VARCHAR(20) NOT NULL,
  nisn VARCHAR(20),
  tempat_lahir VARCHAR(100) NOT NULL,
  tanggal_lahir DATE NOT NULL,
  jenis_kelamin VARCHAR(10) NOT NULL,
  agama VARCHAR(20) NOT NULL,
  alamat TEXT NOT NULL,
  kelurahan VARCHAR(100),
  kecamatan VARCHAR(100),
  kota VARCHAR(100) NOT NULL,
  provinsi VARCHAR(100) NOT NULL,
  kode_pos VARCHAR(10),
  no_telepon VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  -- Asal Sekolah (opsional untuk TK)
  asal_sekolah VARCHAR(100),
  npsn_sekolah VARCHAR(20),
  tahun_lulus INTEGER,
  -- Data Orang Tua
  nama_ayah VARCHAR(100) NOT NULL,
  pekerjaan_ayah VARCHAR(100),
  nama_ibu VARCHAR(100) NOT NULL,
  pekerjaan_ibu VARCHAR(100),
  no_telepon_ortu VARCHAR(20) NOT NULL,
  penghasilan_ortu VARCHAR(50),
  -- Pilihan Jurusan (tidak digunakan untuk TK)
  pilihan_jurusan_1 VARCHAR(100),
  pilihan_jurusan_2 VARCHAR(100),
  -- Status
  status VARCHAR(20) DEFAULT 'menunggu', -- menunggu, diverifikasi, diterima, ditolak
  catatan_admin TEXT,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel dokumen pendaftaran
CREATE TABLE dokumen_pendaftaran (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pendaftaran_id UUID REFERENCES pendaftaran(id) ON DELETE CASCADE,
  jenis_dokumen VARCHAR(50) NOT NULL, -- foto, ijazah, skhu, kartu_keluarga, ktp_ortu, rapor
  url_dokumen TEXT NOT NULL,
  nama_file VARCHAR(200) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel berita & pengumuman
CREATE TABLE berita (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  judul VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  ringkasan TEXT NOT NULL,
  konten TEXT NOT NULL,
  gambar_url TEXT,
  kategori VARCHAR(50) DEFAULT 'berita', -- berita, pengumuman, prestasi
  published BOOLEAN DEFAULT false,
  penulis VARCHAR(100) DEFAULT 'Admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pendaftaran_updated_at
  BEFORE UPDATE ON pendaftaran
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_berita_updated_at
  BEFORE UPDATE ON berita
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

-- Function untuk generate nomor pendaftaran
CREATE OR REPLACE FUNCTION generate_nomor_pendaftaran(tahun VARCHAR)
RETURNS VARCHAR AS $$
DECLARE
  urutan INTEGER;
  nomor VARCHAR(20);
BEGIN
  SELECT COUNT(*) + 1 INTO urutan
  FROM pendaftaran
  WHERE tahun_ajaran = tahun;

  nomor := 'PPDB-' || tahun || '-' || LPAD(urutan::TEXT, 4, '0');
  RETURN nomor;
END;
$$ language 'plpgsql';

-- RLS Policies
ALTER TABLE pendaftaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE dokumen_pendaftaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengaturan_ppdb ENABLE ROW LEVEL SECURITY;

-- Berita: bisa dibaca siapa saja jika published
CREATE POLICY "Berita published bisa dibaca semua" ON berita
  FOR SELECT USING (published = true);

-- Pengaturan PPDB: bisa dibaca semua
CREATE POLICY "Pengaturan PPDB bisa dibaca semua" ON pengaturan_ppdb
  FOR SELECT USING (true);

-- Pendaftaran: bisa insert siapa saja, select berdasarkan nomor
CREATE POLICY "Pendaftaran bisa diinsert siapa saja" ON pendaftaran
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Pendaftaran bisa dilihat sendiri" ON pendaftaran
  FOR SELECT USING (true);

-- Dokumen: bisa insert & select
CREATE POLICY "Dokumen bisa diinsert" ON dokumen_pendaftaran
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Dokumen bisa dilihat" ON dokumen_pendaftaran
  FOR SELECT USING (true);

-- Sample data PPDB
INSERT INTO pengaturan_ppdb (tahun_ajaran, tanggal_mulai, tanggal_selesai, kuota, status, keterangan)
VALUES ('2025/2026', '2025-06-01', '2025-07-31', 200, true, 'Penerimaan Peserta Didik Baru Tahun Ajaran 2025/2026');

-- Sample berita
INSERT INTO berita (judul, slug, ringkasan, konten, kategori, published)
VALUES
(
  'Pengumuman PPDB Tahun Ajaran 2025/2026',
  'ppdb-2025-2026',
  'Pendaftaran Peserta Didik Baru (PPDB) SMA Negeri 1 Contoh resmi dibuka mulai 1 Juni 2025.',
  '<p>SMA Negeri 1 Contoh dengan bangga mengumumkan pembukaan Penerimaan Peserta Didik Baru (PPDB) untuk Tahun Ajaran 2025/2026.</p><p>Pendaftaran dapat dilakukan secara online melalui website resmi sekolah mulai tanggal <strong>1 Juni 2025</strong> hingga <strong>31 Juli 2025</strong>.</p><h2>Persyaratan Pendaftaran</h2><ul><li>Lulusan SMP/MTs dengan nilai minimal rata-rata 75</li><li>Usia maksimal 21 tahun per 1 Juli 2025</li><li>Melampirkan dokumen yang dipersyaratkan</li></ul>',
  'pengumuman',
  true
),
(
  'Sekolah Kami Raih Predikat A dalam Akreditasi Nasional',
  'akreditasi-a-2024',
  'SMA Negeri 1 Contoh berhasil meraih predikat A dalam penilaian akreditasi sekolah nasional tahun 2024.',
  '<p>Dengan bangga kami umumkan bahwa SMA Negeri 1 Contoh berhasil meraih <strong>Predikat A (Unggul)</strong> dalam penilaian akreditasi oleh Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M).</p><p>Pencapaian ini merupakan hasil kerja keras seluruh warga sekolah, guru, staf, dan dukungan penuh dari orang tua/wali murid.</p>',
  'prestasi',
  true
),
(
  'Jadwal Ujian Akhir Semester Genap 2024/2025',
  'jadwal-uas-genap-2025',
  'Informasi lengkap jadwal Ujian Akhir Semester Genap untuk semua kelas, mulai dari kelas X hingga XII.',
  '<p>Berikut adalah jadwal Ujian Akhir Semester (UAS) Genap Tahun Ajaran 2024/2025.</p><p>Ujian akan dilaksanakan mulai <strong>9 Juni 2025</strong> hingga <strong>20 Juni 2025</strong>.</p><p>Siswa diwajibkan hadir 15 menit sebelum ujian dimulai dan membawa kartu ujian yang telah ditanda tangani wali kelas.</p>',
  'pengumuman',
  true
);
