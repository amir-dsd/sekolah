import Link from 'next/link'
import { ArrowRight, Users, Trophy, BookOpen, Star, Calendar, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import type { Berita, PengaturanPPDB } from '@/types'

async function getBeritaTerbaru(): Promise<Berita[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('berita')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3)
    return data || []
  } catch {
    return []
  }
}

async function getPPDBStatus(): Promise<PengaturanPPDB | null> {
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

const stats = [
  { icon: Users, label: 'Siswa Aktif', value: '1.200+' },
  { icon: BookOpen, label: 'Tenaga Pengajar', value: '85+' },
  { icon: Trophy, label: 'Prestasi Diraih', value: '500+' },
  { icon: Star, label: 'Tahun Berdiri', value: '1975' },
]

const programs = [
  {
    nama: 'MIPA',
    deskripsi: 'Matematika dan Ilmu Pengetahuan Alam — mencetak ilmuwan dan teknolog masa depan.',
    warna: 'bg-green-100 text-green-700',
  },
  {
    nama: 'IPS',
    deskripsi: 'Ilmu Pengetahuan Sosial — membentuk pemimpin dan analis sosial yang berwawasan luas.',
    warna: 'bg-green-100 text-green-700',
  },
  {
    nama: 'Bahasa',
    deskripsi: 'Program bahasa dan sastra untuk menghasilkan komunikator dan diplomat profesional.',
    warna: 'bg-purple-100 text-purple-700',
  },
]

const badgeVariantMap: Record<string, 'info' | 'success' | 'warning'> = {
  pengumuman: 'info',
  prestasi: 'success',
  berita: 'warning',
}

export default async function HomePage() {
  const [beritaList, ppdb] = await Promise.all([getBeritaTerbaru(), getPPDBStatus()])

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-700/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-4 py-16 sm:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              {ppdb && (
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-sm mb-6 border border-white/20">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  PPDB {ppdb.tahun_ajaran} Sedang Dibuka
                </div>
              )}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
                Selamat Datang di<br />
                <span className="text-yellow-400">Haya Bina</span><br />
                Insani
              </h1>
              <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-xl leading-relaxed">
                Sekolah unggulan berakreditasi A yang berkomitmen mencetak generasi beriman, berprestasi, dan berdaya saing global.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-yellow-400 text-green-900 hover:bg-yellow-300 font-bold shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 transition-all hover:-translate-y-0.5">
                  <Link href="/ppdb/daftar">
                    Daftar PPDB Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-white/15 border border-white/50 text-white hover:bg-white/25 backdrop-blur">
                  <Link href="/tentang">Pelajari Lebih Lanjut</Link>
                </Button>
              </div>
            </div>
            {/* Hero image */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-green-950/50 border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=80"
                  alt="Suasana sekolah Haya Bina Insani"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-green-900 rounded-2xl px-5 py-3 shadow-xl">
                <p className="text-xs font-semibold">Akreditasi</p>
                <p className="text-2xl font-black leading-tight">A</p>
                <p className="text-xs font-semibold">Unggul</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white  border-b ">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-green-700" />
                </div>
                <div className="text-3xl font-bold text-green-900">{value}</div>
                <div className="text-sm text-gray-500  mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PPDB Banner */}
      {ppdb && (
        <section className="bg-yellow-50  border-y border-yellow-200 ">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shrink-0">
                  <Calendar className="h-6 w-6 text-yellow-900" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-gray-900 ">
                    PPDB {ppdb.tahun_ajaran} — Pendaftaran Dibuka!
                  </h2>
                  <p className="text-gray-600  text-sm">
                    {formatDate(ppdb.tanggal_mulai)} s/d {formatDate(ppdb.tanggal_selesai)} · Kuota: {ppdb.kuota} siswa
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline">
                  <Link href="/ppdb/status">Cek Status</Link>
                </Button>
                <Button asChild className="bg-green-700 hover:bg-green-800">
                  <Link href="/ppdb/daftar">Daftar Sekarang</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Visi Misi */}
      <section className="bg-gray-50  py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Visi & Misi</h2>
            <p className="text-gray-600 ">Landasan kami dalam mendidik generasi penerus bangsa</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-l-4 border-l-green-700">
              <CardHeader>
                <CardTitle className="text-green-700 text-xl">Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700  leading-relaxed">
                  Menjadi sekolah unggul yang menghasilkan lulusan beriman, berilmu, berkarakter, dan berdaya saing di tingkat nasional maupun internasional.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle className="text-green-700  text-xl">Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700  text-sm">
                  {[
                    'Menyelenggarakan pembelajaran berkualitas dan inovatif',
                    'Mengembangkan potensi akademik dan non-akademik siswa',
                    'Menumbuhkan karakter dan nilai-nilai kebangsaan',
                    'Membangun kemitraan dengan orang tua dan masyarakat',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-5 h-5 bg-green-100  text-green-700  rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Studi */}
      <section className="py-16 bg-white ">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900  mb-2">Program Studi</h2>
              <p className="text-gray-600 ">Pilih jurusan sesuai minat dan bakat Anda</p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex">
              <Link href="/program">Lihat Semua <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Card key={program.nama} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold w-fit ${program.warna}`}>
                    {program.nama}
                  </div>
                  <CardTitle className="text-lg mt-2">{program.nama}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600  text-sm leading-relaxed">{program.deskripsi}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="bg-gray-50  py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900  mb-2">Berita & Pengumuman</h2>
              <p className="text-gray-600 ">Informasi terkini dari sekolah kami</p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex">
              <Link href="/berita">Lihat Semua <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          {beritaList.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {beritaList.map((berita) => (
                <Card key={berita.id} className="hover:shadow-md transition-shadow overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={berita.gambar_url || `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80`}
                      alt={berita.judul}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <Badge variant={badgeVariantMap[berita.kategori] || 'info'} className="w-fit mb-2 capitalize">
                      {berita.kategori}
                    </Badge>
                    <CardTitle className="text-base line-clamp-2 leading-snug">
                      {berita.judul}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600  text-sm line-clamp-2 mb-3">{berita.ringkasan}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 ">{formatDate(berita.created_at)}</span>
                      <Link href={`/berita/${berita.slug}`} className="text-sm text-green-700 hover:underline font-medium">
                        Baca →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 ">
              <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-300 " />
              <p>Belum ada berita tersedia.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
