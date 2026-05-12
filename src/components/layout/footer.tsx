import Link from 'next/link'
import { GraduationCap, MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900  text-white border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span>SMA Negeri 1 Contoh</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sekolah unggulan yang menghasilkan lulusan berkarakter, berprestasi, dan siap menghadapi tantangan global.
            </p>
            <div className="flex gap-2">
              {['Facebook', 'Instagram', 'YouTube'].map((platform) => (
                <a key={platform} href="#" className="text-slate-400 hover:text-white transition-colors text-xs border border-slate-700 hover:border-slate-500 rounded-lg px-2.5 py-1">
                  {platform}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">Navigasi</h3>
            <ul className="space-y-2">
              {[
                { href: '/tentang', label: 'Tentang Sekolah' },
                { href: '/program', label: 'Program Studi' },
                { href: '/berita', label: 'Berita & Pengumuman' },
                { href: '/ppdb', label: 'PPDB Online' },
                { href: '/kontak', label: 'Hubungi Kami' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">PPDB</h3>
            <ul className="space-y-2">
              {[
                { href: '/ppdb', label: 'Info PPDB' },
                { href: '/ppdb/daftar', label: 'Formulir Pendaftaran' },
                { href: '/ppdb/status', label: 'Cek Status Pendaftaran' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-blue-500" />
                <span>Jl. Pendidikan No. 1, Kota Contoh, Provinsi Contoh 12345</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="h-4 w-4 shrink-0 text-blue-500" />
                <span>(021) 1234-5678</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="h-4 w-4 shrink-0 text-blue-500" />
                <span>info@sman1contoh.sch.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} SMA Negeri 1 Contoh. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
