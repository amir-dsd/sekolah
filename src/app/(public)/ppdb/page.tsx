import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Users, FileText, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { formatDate, formatCurrency } from '@/lib/utils'
import type { PengaturanPPDB } from '@/types'

export const metadata: Metadata = {
  title: 'PPDB - Penerimaan Peserta Didik Baru',
  description: 'Informasi pendaftaran siswa baru SMA Negeri 1 Contoh',
}

async function getPPDB(): Promise<PengaturanPPDB | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('pengaturan_ppdb')
      .select('*')
      .eq('status', true)
      .single()
    return data
  } catch {
    return null
  }
}

async function getJumlahPendaftar(tahunAjaran: string): Promise<number> {
  try {
    const supabase = await createClient()
    const { count } = await supabase
      .from('pendaftaran')
      .select('*', { count: 'exact', head: true })
      .eq('tahun_ajaran', tahunAjaran)
    return count || 0
  } catch {
    return 0
  }
}

const persyaratan = [
  'Lulusan SMP/MTs atau sederajat',
  'Usia maksimal 21 tahun per 1 Juli tahun ajaran baru',
  'Nilai rata-rata rapor minimal 75',
  'Tidak pernah tinggal kelas selama SMP',
  'Sehat jasmani dan rohani',
  'Berkelakuan baik (dibuktikan dengan SKCK dari sekolah asal)',
]

const dokumenDibutuhkan = [
  { nama: 'Foto terbaru 3×4', keterangan: 'Background merah, pakaian formal', wajib: true },
  { nama: 'Ijazah / SKL SMP', keterangan: 'Fotokopi yang telah dilegalisir', wajib: true },
  { nama: 'SKHU / Nilai UN', keterangan: 'Asli atau fotokopi dilegalisir', wajib: true },
  { nama: 'Kartu Keluarga', keterangan: 'Fotokopi', wajib: true },
  { nama: 'KTP Orang Tua', keterangan: 'Fotokopi', wajib: true },
  { nama: 'Rapor SMP', keterangan: 'Semester 1-5, fotokopi dilegalisir', wajib: true },
  { nama: 'Akta Kelahiran', keterangan: 'Fotokopi', wajib: false },
  { nama: 'Sertifikat Prestasi', keterangan: 'Jika ada', wajib: false },
]

const alurPendaftaran = [
  { step: 1, judul: 'Isi Formulir Online', deskripsi: 'Lengkapi formulir pendaftaran online dengan data yang benar dan valid.' },
  { step: 2, judul: 'Upload Dokumen', deskripsi: 'Upload semua dokumen yang dipersyaratkan dalam format PDF atau JPG.' },
  { step: 3, judul: 'Verifikasi Berkas', deskripsi: 'Tim PPDB akan memverifikasi kelengkapan berkas pendaftaran Anda.' },
  { step: 4, judul: 'Seleksi', deskripsi: 'Seleksi dilakukan berdasarkan nilai rapor, prestasi, dan domisili.' },
  { step: 5, judul: 'Pengumuman Hasil', deskripsi: 'Hasil seleksi diumumkan melalui website dan bisa dicek dengan nomor pendaftaran.' },
  { step: 6, judul: 'Daftar Ulang', deskripsi: 'Calon siswa yang diterima wajib melakukan daftar ulang sesuai jadwal.' },
]

export default async function PPDBPage() {
  const ppdb = await getPPDB()
  const jumlahPendaftar = ppdb ? await getJumlahPendaftar(ppdb.tahun_ajaran) : 0
  const sisaKuota = ppdb ? Math.max(0, ppdb.kuota - jumlahPendaftar) : 0

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">PPDB Online</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Penerimaan Peserta Didik Baru SMA Negeri 1 Contoh — Daftar sekarang dan raih masa depan terbaik Anda.
          </p>
        </div>
      </section>

      {ppdb ? (
        <>
          {/* Info PPDB */}
          <section className="py-10 border-b ">
            <div className="container mx-auto px-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-blue-200  bg-blue-50 ">
                  <CardContent className="pt-5 pb-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-8 w-8 text-blue-600  shrink-0" />
                      <div>
                        <div className="text-xs text-blue-500  font-medium">Tahun Ajaran</div>
                        <div className="font-bold text-gray-900 ">{ppdb.tahun_ajaran}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-green-200  bg-green-50 ">
                  <CardContent className="pt-5 pb-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-8 w-8 text-green-600  shrink-0" />
                      <div>
                        <div className="text-xs text-green-500  font-medium">Periode Pendaftaran</div>
                        <div className="font-bold text-gray-900  text-sm">{formatDate(ppdb.tanggal_mulai)} — {formatDate(ppdb.tanggal_selesai)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-yellow-200  bg-yellow-50 ">
                  <CardContent className="pt-5 pb-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-yellow-600  shrink-0" />
                      <div>
                        <div className="text-xs text-yellow-500  font-medium">Sisa Kuota</div>
                        <div className="font-bold text-gray-900 ">{sisaKuota} dari {ppdb.kuota} siswa</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-purple-200  bg-purple-50 ">
                  <CardContent className="pt-5 pb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-purple-600  shrink-0" />
                      <div>
                        <div className="text-xs text-purple-500  font-medium">Biaya Pendaftaran</div>
                        <div className="font-bold text-gray-900 ">{ppdb.biaya_pendaftaran === 0 ? 'Gratis' : formatCurrency(ppdb.biaya_pendaftaran)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button asChild size="lg" className="bg-blue-700 hover:bg-blue-800">
                  <Link href="/ppdb/daftar">
                    Daftar Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/ppdb/status">Cek Status Pendaftaran</Link>
                </Button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="py-10 bg-gray-50 ">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-yellow-50  border border-yellow-200  rounded-xl p-8 max-w-lg mx-auto">
              <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-gray-900  mb-2">PPDB Belum Dibuka</h2>
              <p className="text-gray-600 ">Pendaftaran siswa baru belum dibuka saat ini. Pantau terus website kami untuk informasi terbaru.</p>
            </div>
          </div>
        </section>
      )}

      {/* Alur Pendaftaran */}
      <section className="py-16 bg-gray-50 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900  mb-3">Alur Pendaftaran</h2>
            <p className="text-gray-600 ">Ikuti langkah-langkah berikut untuk mendaftar</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {alurPendaftaran.map((item) => (
              <div key={item.step} className="flex gap-4 bg-white  p-5 rounded-xl border  hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900  mb-1">{item.judul}</h3>
                  <p className="text-sm text-gray-500  leading-relaxed">{item.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Persyaratan & Dokumen */}
      <section className="py-16 bg-white ">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold text-gray-900  mb-6">Persyaratan</h2>
              <ul className="space-y-3">
                {persyaratan.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 ">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900  mb-6">Dokumen yang Diperlukan</h2>
              <div className="space-y-3">
                {dokumenDibutuhkan.map((dok, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50  rounded-lg">
                    <FileText className={`h-5 w-5 shrink-0 mt-0.5 ${dok.wajib ? 'text-blue-600 ' : 'text-gray-400 '}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800  text-sm">{dok.nama}</span>
                        {dok.wajib ? (
                          <span className="text-xs bg-red-100  text-red-600  px-1.5 py-0.5 rounded">Wajib</span>
                        ) : (
                          <span className="text-xs bg-gray-100  text-gray-500  px-1.5 py-0.5 rounded">Opsional</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 ">{dok.keterangan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {ppdb && (
        <section className="bg-blue-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-3">Siap Mendaftar?</h2>
            <p className="text-blue-200 mb-6">Jangan lewatkan kesempatan bergabung bersama SMA Negeri 1 Contoh</p>
            <Button asChild size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold">
              <Link href="/ppdb/daftar">
                Mulai Pendaftaran <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}
