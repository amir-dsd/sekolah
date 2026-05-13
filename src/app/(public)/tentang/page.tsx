import type { Metadata } from 'next'
import { GraduationCap, Target, Heart, Lightbulb, Award, Eye, Flag } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Tentang Sekolah',
  description: 'Profil dan sejarah Haya Bina Insani',
}

const nilaiSekolah = [
  { icon: Heart, label: 'Integritas', deskripsi: 'Jujur dan bertanggung jawab dalam setiap tindakan' },
  { icon: Lightbulb, label: 'Inovasi', deskripsi: 'Terus berinovasi dalam pembelajaran dan pengembangan diri' },
  { icon: Target, label: 'Prestasi', deskripsi: 'Berorientasi pada pencapaian hasil terbaik' },
  { icon: Award, label: 'Keunggulan', deskripsi: 'Menjaga standar kualitas tertinggi dalam segala bidang' },
]

const strukturOrganisasi = [
  { jabatan: 'Kepala Sekolah', nama: 'Drs. Budi Santoso, M.Pd.' },
  { jabatan: 'Wakil Kepala Bid. Kurikulum', nama: 'Dra. Siti Rahayu, M.Si.' },
  { jabatan: 'Wakil Kepala Bid. Kesiswaan', nama: 'Hendra Gunawan, S.Pd.' },
  { jabatan: 'Wakil Kepala Bid. Sarana & Prasarana', nama: 'Wahyu Hidayat, S.T.' },
  { jabatan: 'Wakil Kepala Bid. Humas', nama: 'Retno Wulandari, S.Sos.' },
  { jabatan: 'Kepala Tata Usaha', nama: 'Ahmad Fauzi, S.E.' },
]

const akreditasi = [
  { tahun: '2024', nilai: 'A (Unggul)', lembaga: 'BAN-S/M' },
  { tahun: '2019', nilai: 'A', lembaga: 'BAN-S/M' },
  { tahun: '2014', nilai: 'A', lembaga: 'BAN-S/M' },
]

export default function TentangPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Tentang Sekolah</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Mengenal lebih dalam Haya Bina Insani — sejarah, visi, dan komitmen kami untuk pendidikan berkualitas.
          </p>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Visi &amp; Misi</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Landasan dan arah pengembangan Haya Bina Insani dalam mewujudkan pendidikan berkualitas</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Visi */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 bg-blue-700 rounded-xl flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-800">Visi</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-base font-medium italic">
                "Mewujudkan lulusan yang beriman, berakhlak mulia, berprestasi, berbudaya, dan berwawasan global."
              </p>
            </div>
            {/* Misi */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 bg-green-700 rounded-xl flex items-center justify-center">
                  <Flag className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-800">Misi</h3>
              </div>
              <ol className="space-y-3">
                {[
                  'Menumbuhkan penghayatan terhadap ajaran agama dan budaya bangsa sebagai sumber kearifan dalam bertindak.',
                  'Melaksanakan pembelajaran dan bimbingan secara efektif untuk mengoptimalkan potensi setiap siswa.',
                  'Mendorong dan membantu siswa mengenali potensi diri sehingga dapat berkembang secara optimal.',
                  'Menerapkan manajemen partisipatif yang melibatkan seluruh warga sekolah dan pemangku kepentingan.',
                  'Membangun budaya berprestasi dan semangat kompetitif yang sehat di seluruh warga sekolah.',
                ].map((m, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                    <span className="w-6 h-6 bg-green-700 text-white rounded-full flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">{i + 1}</span>
                    {m}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Profil Sekolah */}
      <section className="py-16 bg-white ">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900  mb-4">Profil Sekolah</h2>
              <p className="text-gray-600  leading-relaxed mb-4">
                Haya Bina Insani berdiri sejak tahun <strong>1975</strong> dan telah menjadi salah satu sekolah menengah atas terbaik di kota ini. Selama lebih dari 45 tahun, kami telah melahirkan ribuan alumni yang sukses di berbagai bidang.
              </p>
              <p className="text-gray-600  leading-relaxed mb-6">
                Dengan fasilitas modern, tenaga pengajar berpengalaman, dan lingkungan belajar yang kondusif, kami berkomitmen untuk memberikan pendidikan terbaik bagi setiap siswa.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'NSS', value: '301056701001' },
                  { label: 'NPSN', value: '20227019' },
                  { label: 'Status', value: 'Negeri' },
                  { label: 'Akreditasi', value: 'A (Unggul)' },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50  rounded-lg p-3">
                    <div className="text-xs text-gray-500  mb-1">{item.label}</div>
                    <div className="font-semibold text-gray-800 ">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg h-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&q=80"
                alt="Gedung Haya Bina Insani"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nilai Sekolah */}
      <section className="bg-gray-50  py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900  mb-3">Nilai-Nilai Kami</h2>
            <p className="text-gray-600 ">Prinsip yang menjadi fondasi pendidikan di Haya Bina Insani</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nilaiSekolah.map(({ icon: Icon, label, deskripsi }) => (
              <Card key={label} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 bg-blue-100  rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-blue-700 " />
                  </div>
                  <h3 className="font-bold text-gray-900  mb-2">{label}</h3>
                  <p className="text-gray-600  text-sm">{deskripsi}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section className="py-16 bg-white ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900  mb-3">Struktur Organisasi</h2>
            <p className="text-gray-600 ">Tim kepemimpinan Haya Bina Insani periode 2024/2025</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-3">
              {strukturOrganisasi.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-white  border  rounded-lg hover:border-blue-300  transition-colors"
                >
                  <div>
                    <div className="text-sm text-gray-500 ">{item.jabatan}</div>
                    <div className="font-semibold text-gray-800 ">{item.nama}</div>
                  </div>
                  {i === 0 && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      Pimpinan
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Akreditasi */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">Riwayat Akreditasi</h2>
            <p className="text-blue-200">Pengakuan kualitas pendidikan kami dari lembaga nasional</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {akreditasi.map((item) => (
              <div key={item.tahun} className="bg-white/10 rounded-xl p-6 text-center min-w-[160px] border border-white/20">
                <div className="text-4xl font-black text-yellow-400 mb-1">{item.nilai}</div>
                <div className="text-sm text-blue-200 mb-1">Tahun {item.tahun}</div>
                <div className="text-xs text-blue-300">{item.lembaga}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
