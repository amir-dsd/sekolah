import type { Metadata } from 'next'
import { BookOpen, FlaskConical, Globe, Users, Clock, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Program Studi',
  description: 'Program jurusan dan kegiatan ekstrakurikuler di SMA Negeri 1 Contoh',
}

const programs = [
  {
    kode: 'MIPA',
    nama: 'Matematika dan Ilmu Pengetahuan Alam',
    icon: FlaskConical,
    warna: 'blue',
    deskripsi: 'Program MIPA dirancang untuk siswa yang memiliki minat kuat pada ilmu eksak dan sains. Lulusan dipersiapkan untuk melanjutkan ke perguruan tinggi di bidang sains, teknologi, teknik, dan matematika (STEM).',
    mataPelajaran: ['Matematika Peminatan', 'Fisika', 'Kimia', 'Biologi', 'Informatika'],
    prospek: ['Teknik', 'Kedokteran', 'Farmasi', 'Informatika', 'Sains Murni'],
    kuota: 120,
  },
  {
    kode: 'IPS',
    nama: 'Ilmu Pengetahuan Sosial',
    icon: Globe,
    warna: 'green',
    deskripsi: 'Program IPS mempersiapkan siswa dengan pemahaman mendalam tentang fenomena sosial, ekonomi, dan geografi. Lulusan siap untuk berkarir di bidang bisnis, pemerintahan, dan ilmu sosial.',
    mataPelajaran: ['Ekonomi', 'Sosiologi', 'Geografi', 'Sejarah Peminatan', 'Antropologi'],
    prospek: ['Ekonomi', 'Hukum', 'Ilmu Politik', 'Manajemen', 'Hubungan Internasional'],
    kuota: 60,
  },
  {
    kode: 'Bahasa',
    nama: 'Bahasa dan Budaya',
    icon: BookOpen,
    warna: 'purple',
    deskripsi: 'Program Bahasa mengembangkan kemampuan komunikasi dan apresiasi budaya. Siswa mempelajari bahasa Indonesia, bahasa asing, dan sastra secara mendalam untuk mempersiapkan karir di bidang komunikasi dan diplomatik.',
    mataPelajaran: ['Bahasa Indonesia Peminatan', 'Bahasa Inggris Peminatan', 'Bahasa Jepang/Mandarin', 'Sastra Indonesia', 'Antropologi'],
    prospek: ['Sastra', 'Linguistik', 'Ilmu Komunikasi', 'Hubungan Internasional', 'Pariwisata'],
    kuota: 30,
  },
]

const ekskul = [
  { nama: 'Paskibra', kategori: 'Bela Negara' },
  { nama: 'PMR', kategori: 'Sosial' },
  { nama: 'Pramuka', kategori: 'Kepramukaan' },
  { nama: 'OSIS', kategori: 'Organisasi' },
  { nama: 'KIR (Karya Ilmiah Remaja)', kategori: 'Akademik' },
  { nama: 'Basket', kategori: 'Olahraga' },
  { nama: 'Voli', kategori: 'Olahraga' },
  { nama: 'Futsal', kategori: 'Olahraga' },
  { nama: 'Band & Musik', kategori: 'Seni' },
  { nama: 'Tari Tradisional', kategori: 'Seni' },
  { nama: 'Teater', kategori: 'Seni' },
  { nama: 'English Club', kategori: 'Bahasa' },
  { nama: 'Paduan Suara', kategori: 'Seni' },
  { nama: 'Debat', kategori: 'Akademik' },
]

const warnaBg: Record<string, string> = {
  blue: 'bg-blue-50 border-blue-200',
  green: 'bg-green-50 border-green-200',
  purple: 'bg-purple-50 border-purple-200',
}
const warnaText: Record<string, string> = {
  blue: 'text-blue-700',
  green: 'text-green-700',
  purple: 'text-purple-700',
}
const warnaIcon: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  purple: 'bg-purple-100 text-purple-700',
}

export default function ProgramPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Program Studi</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Tiga program jurusan unggulan yang dirancang untuk mengembangkan potensi terbaik setiap siswa.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {programs.map(({ icon: Icon, ...program }) => (
              <Card key={program.kode} className={`border-2 ${warnaBg[program.warna]} overflow-hidden`}>
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="md:col-span-2 p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${warnaIcon[program.warna]}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className={`font-bold text-xl ${warnaText[program.warna]}`}>{program.kode}</span>
                      </div>
                      <CardTitle className="text-xl text-gray-900 dark:text-slate-100">{program.nama}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{program.deskripsi}</p>
                      <div className="mb-3">
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-2">Mata Pelajaran Peminatan</h4>
                        <div className="flex flex-wrap gap-2">
                          {program.mataPelajaran.map((mp) => (
                            <span key={mp} className="text-xs bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-full px-3 py-1 text-gray-700 dark:text-slate-300">{mp}</span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                  <div className="bg-white/60 dark:bg-slate-800/60 p-6 border-l border-dashed dark:border-slate-700">
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <Users className="h-3 w-3" /> Kuota
                      </div>
                      <div className={`text-3xl font-black ${warnaText[program.warna]}`}>{program.kuota}</div>
                      <div className="text-xs text-gray-400 dark:text-slate-500">siswa per angkatan</div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-2">Prospek Kuliah</h4>
                      <ul className="space-y-1">
                        {program.prospek.map((p) => (
                          <li key={p} className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                            <CheckCircle className={`h-3.5 w-3.5 ${warnaText[program.warna]}`} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ekstrakurikuler */}
      <section className="bg-gray-50 dark:bg-slate-800/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ekstrakurikuler</h2>
            <p className="text-gray-600 dark:text-slate-300">Beragam kegiatan untuk mengembangkan bakat dan minat siswa</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {ekskul.map((item) => (
              <div key={item.nama} className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg p-3 text-center hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all">
                <div className="text-sm font-medium text-gray-800 dark:text-slate-200">{item.nama}</div>
                <div className="text-xs text-gray-400 dark:text-slate-500 mt-1">{item.kategori}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jadwal */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-3">Jam Belajar</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {[
                  { hari: 'Senin - Kamis', jam: '07.00 - 14.30 WIB' },
                  { hari: 'Jumat', jam: '07.00 - 11.30 WIB' },
                  { hari: 'Sabtu', jam: '07.00 - 12.30 WIB (Ekskul)' },
                  { hari: 'Minggu', jam: 'Libur' },
                ].map((item) => (
                  <div key={item.hari} className="flex items-center justify-between py-2 border-b dark:border-slate-700 last:border-b-0">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-slate-300">
                      <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                      <span className="font-medium">{item.hari}</span>
                    </div>
                    <span className="text-gray-600 dark:text-slate-400 text-sm">{item.jam}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
