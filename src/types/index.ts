export type StatusPendaftaran = 'menunggu' | 'diverifikasi' | 'diterima' | 'ditolak'
export type KategoriBerita = 'berita' | 'pengumuman' | 'prestasi'

export interface Pendaftaran {
  id: string
  nomor_pendaftaran: string
  tahun_ajaran: string
  nama_lengkap: string
  nik: string
  nisn?: string
  tempat_lahir: string
  tanggal_lahir: string
  jenis_kelamin: string
  agama: string
  alamat: string
  kelurahan?: string
  kecamatan?: string
  kota: string
  provinsi: string
  kode_pos?: string
  no_telepon: string
  email: string
  asal_sekolah: string
  npsn_sekolah?: string
  tahun_lulus: number
  nama_ayah: string
  pekerjaan_ayah?: string
  nama_ibu: string
  pekerjaan_ibu?: string
  no_telepon_ortu: string
  penghasilan_ortu?: string
  pilihan_jurusan_1: string
  pilihan_jurusan_2?: string
  status: StatusPendaftaran
  catatan_admin?: string
  created_at: string
  updated_at: string
}

export interface DokumenPendaftaran {
  id: string
  pendaftaran_id: string
  jenis_dokumen: string
  url_dokumen: string
  nama_file: string
  created_at: string
}

export interface Berita {
  id: string
  judul: string
  slug: string
  ringkasan: string
  konten: string
  gambar_url?: string
  kategori: KategoriBerita
  published: boolean
  penulis: string
  created_at: string
  updated_at: string
}

export interface PengaturanPPDB {
  id: string
  tahun_ajaran: string
  tanggal_mulai: string
  tanggal_selesai: string
  kuota: number
  biaya_pendaftaran: number
  status: boolean
  keterangan?: string
  created_at: string
}
