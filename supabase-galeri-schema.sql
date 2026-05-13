-- Run this in Supabase SQL Editor

-- Tabel galeri foto sekolah
CREATE TABLE IF NOT EXISTS galeri (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  judul TEXT NOT NULL,
  deskripsi TEXT,
  url_foto TEXT NOT NULL,
  kategori TEXT NOT NULL CHECK (kategori IN ('kegiatan', 'fasilitas', 'ruang_kelas')),
  urutan INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE galeri ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Galeri bisa dibaca semua" ON galeri
  FOR SELECT USING (true);

-- Storage bucket untuk dokumen PPDB
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'dokumen-ppdb',
  'dokumen-ppdb',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- RLS storage: siapa saja bisa upload dan baca
CREATE POLICY "Dokumen PPDB bisa diupload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'dokumen-ppdb');

CREATE POLICY "Dokumen PPDB bisa dibaca" ON storage.objects
  FOR SELECT USING (bucket_id = 'dokumen-ppdb');

-- Sample data galeri (ganti URL dengan foto asli sekolah)
INSERT INTO galeri (judul, deskripsi, url_foto, kategori, urutan) VALUES
('Upacara Bendera', 'Upacara bendera rutin setiap hari Senin bersama seluruh warga sekolah', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', 'kegiatan', 1),
('Kegiatan Pramuka', 'Latihan pramuka rutin setiap Jumat sore', 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80', 'kegiatan', 2),
('Olimpiade Sains', 'Persiapan siswa mengikuti olimpiade sains tingkat nasional', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', 'kegiatan', 3),
('Pentas Seni Tahunan', 'Penampilan seni budaya dalam rangka HUT sekolah', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80', 'kegiatan', 4),
('Perpustakaan', 'Ruang perpustakaan yang nyaman dengan koleksi buku lengkap', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80', 'fasilitas', 1),
('Laboratorium IPA', 'Laboratorium IPA modern untuk praktek siswa', 'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=800&q=80', 'fasilitas', 2),
('Lapangan Olahraga', 'Lapangan serbaguna untuk kegiatan olahraga siswa', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', 'fasilitas', 3),
('Ruang Komputer', 'Laboratorium komputer dengan 40 unit PC terbaru', 'https://images.unsplash.com/photo-1612831455359-970e23a1e4e9?w=800&q=80', 'fasilitas', 4),
('Ruang Kelas X', 'Suasana belajar di kelas X yang kondusif dan nyaman', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', 'ruang_kelas', 1),
('Ruang Kelas XI', 'Kelas XI dengan fasilitas proyektor dan AC', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', 'ruang_kelas', 2),
('Ruang Kelas XII', 'Suasana belajar intensif siswa kelas XII menjelang ujian', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', 'ruang_kelas', 3);
