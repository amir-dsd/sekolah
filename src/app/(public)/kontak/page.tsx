import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi SMA Negeri 1 Contoh',
}

export default function KontakPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Hubungi Kami</h1>
          <p className="text-blue-100 text-lg">Kami siap membantu pertanyaan Anda tentang sekolah dan PPDB</p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Informasi Kontak</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-slate-100">Alamat</h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm mt-1">Jl. Pendidikan No. 1, Kecamatan Pusat,<br />Kota Contoh, Provinsi Contoh 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-slate-100">Telepon</h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm mt-1">(021) 1234-5678</p>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">WhatsApp: 0812-3456-7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-slate-100">Email</h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm mt-1">info@sman1contoh.sch.id</p>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">ppdb@sman1contoh.sch.id (khusus PPDB)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-slate-100">Jam Operasional</h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm mt-1">Senin – Kamis: 07.00 – 15.30 WIB</p>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">Jumat: 07.00 – 11.30 WIB</p>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">Sabtu & Minggu: Tutup</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-3">Media Sosial</h3>
                <div className="flex gap-3">
                  {[
                    { label: 'Facebook', handle: '@sman1contoh' },
                    { label: 'Instagram', handle: '@sman1contoh' },
                    { label: 'YouTube', handle: 'SMA Negeri 1 Contoh' },
                  ].map(({ label, handle }) => (
                    <div key={label} className="flex flex-col items-center bg-gray-100 dark:bg-slate-800 rounded-lg px-3 py-2">
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">{label}</span>
                      <span className="text-xs text-gray-500 dark:text-slate-400">{handle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Kirim Pesan</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Nama</label>
                        <input
                          type="text"
                          placeholder="Nama Anda"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
                        <input
                          type="email"
                          placeholder="email@contoh.com"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Subjek</label>
                      <input
                        type="text"
                        placeholder="Perihal pesan"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Pesan</label>
                      <textarea
                        rows={5}
                        placeholder="Tulis pesan Anda di sini..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors font-medium text-sm"
                    >
                      Kirim Pesan
                    </button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Peta */}
      <section className="bg-gray-100 dark:bg-slate-800/50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-6 text-center">Lokasi Sekolah</h2>
          <div className="bg-gray-200 dark:bg-slate-700 rounded-xl h-64 flex items-center justify-center border dark:border-slate-600">
            <div className="text-center text-gray-500 dark:text-slate-400">
              <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-400 dark:text-slate-500" />
              <p>Peta akan ditampilkan di sini</p>
              <p className="text-sm">Integrasikan dengan Google Maps Embed API</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
