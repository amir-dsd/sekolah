# Rencana Website Profil Sekolah + PPDB

## Tech Stack
- Next.js 14 (App Router)
- Supabase (Database, Auth, Storage)
- Tailwind CSS + shadcn/ui
- TypeScript

## Halaman
1. `/` - Beranda (hero, statistik, berita, visi misi)
2. `/tentang` - Profil sekolah, sejarah, struktur organisasi
3. `/program` - Program studi / jurusan
4. `/berita` - Daftar berita & pengumuman
5. `/berita/[slug]` - Detail berita
6. `/ppdb` - Informasi & formulir pendaftaran siswa baru
7. `/ppdb/daftar` - Form pendaftaran
8. `/ppdb/status` - Cek status pendaftaran
9. `/admin` - Dashboard admin (kelola pendaftar, berita)
10. `/kontak` - Halaman kontak

## Database Schema (Supabase)
- `pendaftaran` - Data pendaftar PPDB
- `berita` - Artikel berita/pengumuman
- `pengaturan_ppdb` - Konfigurasi jadwal PPDB
- `dokumen_pendaftaran` - Upload dokumen

## Fitur PPDB
- Form pendaftaran online
- Upload dokumen (foto, ijazah, dll)
- Nomor pendaftaran otomatis
- Cek status dengan nomor pendaftaran
- Notifikasi status via email
- Admin: lihat, verifikasi, terima/tolak pendaftar
