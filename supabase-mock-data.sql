-- ============================================
-- RESET + MOCK DATA
-- Hapus data lama lalu insert ulang
-- ============================================

TRUNCATE TABLE dokumen_pendaftaran CASCADE;
TRUNCATE TABLE pendaftaran CASCADE;
TRUNCATE TABLE berita CASCADE;
TRUNCATE TABLE pengaturan_ppdb CASCADE;

-- Setting PPDB
INSERT INTO pengaturan_ppdb (tahun_ajaran, tanggal_mulai, tanggal_selesai, kuota, status, keterangan)
VALUES ('2025/2026', '2025-06-01', '2025-07-31', 200, true, 'Penerimaan Peserta Didik Baru Tahun Ajaran 2025/2026');

-- Data Pendaftar PPDB (15 siswa dengan status berbeda)
INSERT INTO pendaftaran (
  nomor_pendaftaran, tahun_ajaran, nama_lengkap, nik, nisn,
  tempat_lahir, tanggal_lahir, jenis_kelamin, agama,
  alamat, kelurahan, kecamatan, kota, provinsi, kode_pos,
  no_telepon, email,
  asal_sekolah, npsn_sekolah, tahun_lulus,
  nama_ayah, pekerjaan_ayah, nama_ibu, pekerjaan_ibu,
  no_telepon_ortu, penghasilan_ortu,
  pilihan_jurusan_1, pilihan_jurusan_2,
  status, catatan_admin
) VALUES
(
  'PPDB-20252026-0001', '2025/2026', 'Ahmad Rizky Pratama', '3201010102100001', '0123456701',
  'Jakarta', '2009-02-01', 'Laki-laki', 'Islam',
  'Jl. Melati No. 12', 'Cilandak', 'Cilandak', 'Jakarta Selatan', 'DKI Jakarta', '12430',
  '08121234001', 'rizky.pratama@gmail.com',
  'SMP Negeri 1 Jakarta', '20100001', 2025,
  'Budi Pratama', 'PNS', 'Siti Pratama', 'Guru',
  '08121234001', '5-10 juta',
  'MIPA', 'IPS',
  'diterima', 'Nilai rapor sangat baik, diterima di jurusan pilihan pertama.'
),
(
  'PPDB-20252026-0002', '2025/2026', 'Siti Nurhaliza', '3201010203100002', '0123456702',
  'Bandung', '2009-03-02', 'Perempuan', 'Islam',
  'Jl. Mawar No. 5', 'Kebayoran', 'Kebayoran Baru', 'Jakarta Selatan', 'DKI Jakarta', '12180',
  '08121234002', 'siti.nurhaliza@gmail.com',
  'SMP Negeri 3 Bandung', '20100002', 2025,
  'Deden Haliza', 'Wiraswasta', 'Rina Haliza', 'Ibu Rumah Tangga',
  '08121234002', '3-5 juta',
  'IPS', 'Bahasa',
  'diterima', 'Aktif berorganisasi, diterima.'
),
(
  'PPDB-20252026-0003', '2025/2026', 'Budi Santoso', '3201010304100003', '0123456703',
  'Surabaya', '2009-04-03', 'Laki-laki', 'Islam',
  'Jl. Anggrek No. 8', 'Tebet', 'Tebet', 'Jakarta Selatan', 'DKI Jakarta', '12810',
  '08121234003', 'budi.santoso@gmail.com',
  'SMP Muhammadiyah 1 Surabaya', '20100003', 2025,
  'Sutono', 'Pegawai Swasta', 'Wati', 'Pedagang',
  '08121234003', '3-5 juta',
  'MIPA', NULL,
  'diverifikasi', NULL
),
(
  'PPDB-20252026-0004', '2025/2026', 'Dewi Rahayu', '3201010405100004', '0123456704',
  'Yogyakarta', '2009-05-04', 'Perempuan', 'Kristen',
  'Jl. Cempaka No. 22', 'Mampang', 'Mampang Prapatan', 'Jakarta Selatan', 'DKI Jakarta', '12790',
  '08121234004', 'dewi.rahayu@gmail.com',
  'SMP Budi Mulia Yogyakarta', '20100004', 2025,
  'Hendra Rahayu', 'Dokter', 'Lestari Rahayu', 'Dokter',
  '08121234004', '> 10 juta',
  'MIPA', 'IPS',
  'diterima', 'Prestasi akademik luar biasa.'
),
(
  'PPDB-20252026-0005', '2025/2026', 'Muhammad Fajar', '3201010506100005', '0123456705',
  'Medan', '2009-06-05', 'Laki-laki', 'Islam',
  'Jl. Dahlia No. 3', 'Pancoran', 'Pancoran', 'Jakarta Selatan', 'DKI Jakarta', '12770',
  '08121234005', 'fajar.m@gmail.com',
  'SMP Negeri 2 Medan', '20100005', 2025,
  'Amir', 'Supir', 'Fatimah', 'Ibu Rumah Tangga',
  '08121234005', '1-3 juta',
  'IPS', 'Bahasa',
  'menunggu', NULL
),
(
  'PPDB-20252026-0006', '2025/2026', 'Rina Kusuma', '3201010607100006', '0123456706',
  'Semarang', '2009-07-06', 'Perempuan', 'Katolik',
  'Jl. Flamboyan No. 17', 'Kuningan', 'Setiabudi', 'Jakarta Selatan', 'DKI Jakarta', '12920',
  '08121234006', 'rina.kusuma@gmail.com',
  'SMP Santa Ursula Semarang', '20100006', 2025,
  'Agus Kusuma', 'Pengacara', 'Monica Kusuma', 'Arsitek',
  '08121234006', '> 10 juta',
  'Bahasa', 'IPS',
  'diterima', 'Nilai bahasa inggris terbaik.'
),
(
  'PPDB-20252026-0007', '2025/2026', 'Dika Firmansyah', '3201010708100007', '0123456707',
  'Bekasi', '2009-08-07', 'Laki-laki', 'Islam',
  'Jl. Kenanga No. 9', 'Pasar Minggu', 'Pasar Minggu', 'Jakarta Selatan', 'DKI Jakarta', '12510',
  '08121234007', 'dika.firmansyah@gmail.com',
  'SMP Negeri 5 Bekasi', '20100007', 2025,
  'Firman', 'Mekanik', 'Endang', 'Penjahit',
  '08121234007', '1-3 juta',
  'IPS', NULL,
  'menunggu', NULL
),
(
  'PPDB-20252026-0008', '2025/2026', 'Anisa Permata', '3201010809100008', '0123456708',
  'Depok', '2009-09-08', 'Perempuan', 'Islam',
  'Jl. Melati No. 31', 'Jagakarsa', 'Jagakarsa', 'Jakarta Selatan', 'DKI Jakarta', '12620',
  '08121234008', 'anisa.permata@gmail.com',
  'SMP Islam Al-Azhar Depok', '20100008', 2025,
  'Permana', 'Dosen', 'Yuni Permata', 'Guru',
  '08121234008', '5-10 juta',
  'MIPA', 'IPS',
  'diverifikasi', NULL
),
(
  'PPDB-20252026-0009', '2025/2026', 'Rizal Hakim', '3201010910100009', '0123456709',
  'Tangerang', '2009-10-09', 'Laki-laki', 'Islam',
  'Jl. Bougenville No. 4', 'Cilandak', 'Cilandak', 'Jakarta Selatan', 'DKI Jakarta', '12450',
  '08121234009', 'rizal.hakim@gmail.com',
  'SMP Negeri 4 Tangerang', '20100009', 2025,
  'Hakim', 'Polisi', 'Nurjanah', 'Ibu Rumah Tangga',
  '08121234009', '5-10 juta',
  'MIPA', NULL,
  'ditolak', 'Nilai rata-rata di bawah batas minimal yang disyaratkan.'
),
(
  'PPDB-20252026-0010', '2025/2026', 'Putri Anggraini', '3201011011100010', '0123456710',
  'Bogor', '2009-11-10', 'Perempuan', 'Islam',
  'Jl. Teratai No. 14', 'Kebayoran Lama', 'Kebayoran Lama', 'Jakarta Selatan', 'DKI Jakarta', '12240',
  '08121234010', 'putri.anggraini@gmail.com',
  'SMP Negeri 2 Bogor', '20100010', 2025,
  'Angga', 'Wirausaha', 'Sari Anggraini', 'Apoteker',
  '08121234010', '5-10 juta',
  'IPS', 'Bahasa',
  'diterima', NULL
),
(
  'PPDB-20252026-0011', '2025/2026', 'Hendra Wijaya', '3201011112100011', '0123456711',
  'Solo', '2009-12-11', 'Laki-laki', 'Kristen',
  'Jl. Dahlia No. 21', 'Pesanggrahan', 'Pesanggrahan', 'Jakarta Selatan', 'DKI Jakarta', '12320',
  '08121234011', 'hendra.wijaya@gmail.com',
  'SMP Kristen Pelita Solo', '20100011', 2024,
  'Widjaja', 'Manajer', 'Elly Wijaya', 'Akuntan',
  '08121234011', '5-10 juta',
  'Bahasa', 'IPS',
  'menunggu', NULL
),
(
  'PPDB-20252026-0012', '2025/2026', 'Nabila Azzahra', '3201010101110012', '0123456712',
  'Palembang', '2010-01-01', 'Perempuan', 'Islam',
  'Jl. Cendana No. 7', 'Bintaro', 'Pesanggrahan', 'Jakarta Selatan', 'DKI Jakarta', '12330',
  '08121234012', 'nabila.azzahra@gmail.com',
  'SMP Negeri 1 Palembang', '20100012', 2025,
  'Azzam', 'TNI', 'Syarifah', 'Bidan',
  '08121234012', '5-10 juta',
  'MIPA', 'IPS',
  'diverifikasi', NULL
),
(
  'PPDB-20252026-0013', '2025/2026', 'Farel Prayoga', '3201010202110013', '0123456713',
  'Makassar', '2010-02-02', 'Laki-laki', 'Islam',
  'Jl. Lotus No. 18', 'Kebayoran', 'Kebayoran Baru', 'Jakarta Selatan', 'DKI Jakarta', '12150',
  '08121234013', 'farel.prayoga@gmail.com',
  'SMP Negeri 3 Makassar', '20100013', 2025,
  'Prayogo', 'Nelayan', 'Hasna', 'Pedagang',
  '08121234013', '< 1 juta',
  'IPS', NULL,
  'menunggu', NULL
),
(
  'PPDB-20252026-0014', '2025/2026', 'Cantika Sari', '3201010303110014', '0123456714',
  'Denpasar', '2010-03-03', 'Perempuan', 'Hindu',
  'Jl. Aster No. 25', 'Cilandak', 'Cilandak', 'Jakarta Selatan', 'DKI Jakarta', '12440',
  '08121234014', 'cantika.sari@gmail.com',
  'SMP PGRI 1 Denpasar', '20100014', 2025,
  'I Made Sari', 'Seniman', 'Ni Nyoman', 'Pedagang',
  '08121234014', '1-3 juta',
  'Bahasa', 'IPS',
  'diterima', 'Aktif di seni budaya, cocok di jurusan Bahasa.'
),
(
  'PPDB-20252026-0015', '2025/2026', 'Gilang Ramadhan', '3201010404110015', '0123456715',
  'Balikpapan', '2010-04-04', 'Laki-laki', 'Islam',
  'Jl. Orchid No. 6', 'Pasar Minggu', 'Pasar Minggu', 'Jakarta Selatan', 'DKI Jakarta', '12520',
  '08121234015', 'gilang.ramadhan@gmail.com',
  'SMP Negeri 2 Balikpapan', '20100015', 2025,
  'Ramadhan', 'Karyawan BUMN', 'Yuliana', 'Guru',
  '08121234015', '5-10 juta',
  'MIPA', 'IPS',
  'ditolak', 'Kuota jurusan MIPA sudah penuh.'
);

-- Berita
INSERT INTO berita (judul, slug, ringkasan, konten, kategori, published, penulis) VALUES
(
  'Pengumuman PPDB Tahun Ajaran 2025/2026',
  'ppdb-2025-2026',
  'Pendaftaran Peserta Didik Baru (PPDB) SMA Negeri 1 Contoh resmi dibuka mulai 1 Juni 2025.',
  '<p>SMA Negeri 1 Contoh dengan bangga mengumumkan pembukaan Penerimaan Peserta Didik Baru (PPDB) untuk Tahun Ajaran 2025/2026.</p><p>Pendaftaran dapat dilakukan secara online melalui website resmi sekolah mulai tanggal <strong>1 Juni 2025</strong> hingga <strong>31 Juli 2025</strong>.</p><h2>Persyaratan Pendaftaran</h2><ul><li>Lulusan SMP/MTs dengan nilai minimal rata-rata 75</li><li>Usia maksimal 21 tahun per 1 Juli 2025</li><li>Melampirkan dokumen yang dipersyaratkan</li></ul>',
  'pengumuman', true, 'Admin'
),
(
  'Sekolah Kami Raih Predikat A dalam Akreditasi Nasional',
  'akreditasi-a-2024',
  'SMA Negeri 1 Contoh berhasil meraih predikat A dalam penilaian akreditasi sekolah nasional tahun 2024.',
  '<p>Dengan bangga kami umumkan bahwa SMA Negeri 1 Contoh berhasil meraih <strong>Predikat A (Unggul)</strong> dalam penilaian akreditasi oleh Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M).</p><p>Pencapaian ini merupakan hasil kerja keras seluruh warga sekolah, guru, staf, dan dukungan penuh dari orang tua/wali murid.</p>',
  'prestasi', true, 'Admin'
),
(
  'Jadwal Ujian Akhir Semester Genap 2024/2025',
  'jadwal-uas-genap-2025',
  'Informasi lengkap jadwal Ujian Akhir Semester Genap untuk semua kelas, mulai dari kelas X hingga XII.',
  '<p>Berikut adalah jadwal Ujian Akhir Semester (UAS) Genap Tahun Ajaran 2024/2025.</p><p>Ujian akan dilaksanakan mulai <strong>9 Juni 2025</strong> hingga <strong>20 Juni 2025</strong>.</p><p>Siswa diwajibkan hadir 15 menit sebelum ujian dimulai dan membawa kartu ujian yang telah ditanda tangani wali kelas.</p>',
  'pengumuman', true, 'Tata Usaha'
),
(
  'Tim Basket SMAN 1 Juara 1 Tingkat Provinsi',
  'juara-basket-provinsi-2025',
  'Tim basket putra SMA Negeri 1 Contoh berhasil meraih gelar juara pertama dalam turnamen basket tingkat provinsi.',
  '<p>Selamat kepada tim basket putra SMA Negeri 1 Contoh yang berhasil meraih <strong>Juara 1</strong> dalam Turnamen Basket Antar SMA Tingkat Provinsi 2025.</p><p>Tim yang dilatih oleh Bapak Hendra Kusuma ini berhasil mengalahkan 32 tim dari berbagai sekolah unggulan di seluruh provinsi dengan skor akhir 78-65 di babak final.</p><h2>Prestasi Pemain</h2><ul><li>Ahmad Rizky (Kapten) - MVP Tournament</li><li>Budi Santoso - Best Defender</li><li>Dika Firmansyah - Top Scorer</li></ul>',
  'prestasi', true, 'Tim Humas'
),
(
  'Workshop AI dan Machine Learning untuk Siswa MIPA',
  'workshop-ai-mipa-2025',
  'SMA Negeri 1 Contoh mengadakan workshop intensif AI dan Machine Learning khusus untuk siswa jurusan MIPA.',
  '<p>SMA Negeri 1 Contoh bekerja sama dengan Komunitas AI Indonesia menyelenggarakan <strong>Workshop AI dan Machine Learning</strong> selama 3 hari, 15-17 Mei 2025.</p><p>Workshop ini diikuti oleh 60 siswa pilihan dari jurusan MIPA kelas X dan XI.</p><h2>Materi Workshop</h2><ul><li>Pengenalan Artificial Intelligence</li><li>Python untuk Data Science</li><li>Machine Learning dasar</li><li>Proyek nyata dengan dataset</li></ul>',
  'berita', true, 'Panitia Workshop'
),
(
  'Siswa SMAN 1 Lolos Olimpiade Sains Nasional 2025',
  'osn-2025',
  'Tiga siswa SMA Negeri 1 Contoh berhasil lolos seleksi Olimpiade Sains Nasional (OSN) tingkat nasional.',
  '<p>Selamat kepada tiga siswa SMA Negeri 1 Contoh yang berhasil lolos ke tingkat nasional Olimpiade Sains Nasional (OSN) 2025.</p><h2>Siswa yang Lolos</h2><ul><li><strong>Anisa Permata (XI MIPA 1)</strong> - Bidang Matematika</li><li><strong>Nabila Azzahra (XI MIPA 2)</strong> - Bidang Biologi</li><li><strong>Ahmad Rizky (XI MIPA 3)</strong> - Bidang Fisika</li></ul>',
  'prestasi', true, 'Bidang Akademik'
),
(
  'Pemberitahuan Libur Hari Raya Idul Adha 2025',
  'libur-idul-adha-2025',
  'Sekolah akan libur pada tanggal 6-7 Juni 2025 dalam rangka peringatan Hari Raya Idul Adha 1446 H.',
  '<p>Diberitahukan kepada seluruh siswa, guru, dan tenaga kependidikan SMA Negeri 1 Contoh bahwa sekolah akan <strong>libur pada tanggal 6-7 Juni 2025</strong> dalam rangka peringatan Hari Raya Idul Adha 1446 H.</p><p>Kegiatan belajar mengajar akan kembali normal pada hari Senin, 9 Juni 2025.</p>',
  'pengumuman', true, 'Tata Usaha'
),
(
  'Draft: Panduan Daftar Ulang Siswa Baru',
  'panduan-daftar-ulang-2025',
  'Panduan lengkap prosedur daftar ulang bagi calon siswa yang dinyatakan diterima di PPDB 2025/2026.',
  '<p>Calon siswa yang dinyatakan diterima wajib melakukan daftar ulang pada tanggal yang ditentukan.</p>',
  'pengumuman', false, 'Panitia PPDB'
);
