import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { LogoHBI } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-green-950 text-white border-t border-green-900">
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <LogoHBI size={38} />
              <span>Haya Bina Insani</span>
            </div>

            <p className="text-green-100/70 text-sm leading-relaxed">
              Sekolah unggulan yang menghasilkan lulusan berkarakter,
              berprestasi, dan siap menghadapi tantangan global.
            </p>

            <div className="flex gap-2">
              {["Facebook", "Instagram", "YouTube"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-green-100/70 hover:text-white transition-colors text-xs border border-green-800 hover:border-green-600 rounded-lg px-2.5 py-1"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">Navigasi</h3>

            <ul className="space-y-2">
              {[
                { href: "/tentang", label: "Tentang Sekolah" },
                // { href: '/program', label: 'Program Studi' },
                // { href: '/berita', label: 'Berita & Pengumuman' },
                { href: "/ppdb", label: "PPDB Online" },
                { href: "/kontak", label: "Hubungi Kami" },
                // { href: "/ppdb/status", label: "Cek Status" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-green-100/70 hover:text-white text-sm transition-colors"
                  >
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
                { href: "/ppdb", label: "Info PPDB" },
                { href: "/ppdb/daftar", label: "Formulir Pendaftaran" },
                { href: "/ppdb/status", label: "Cek Status Pendaftaran" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-green-100/70 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">Kontak</h3>

            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-green-100/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-yellow-400" />
                <span>
                  Jl. Pendidikan No. 1, Kota Contoh, Provinsi Contoh 12345
                </span>
              </li>

              <li className="flex items-center gap-2 text-sm text-green-100/70">
                <Phone className="h-4 w-4 shrink-0 text-yellow-400" />
                <span>(021) 1234-5678</span>
              </li>

              <li className="flex items-center gap-2 text-sm text-green-100/70">
                <Mail className="h-4 w-4 shrink-0 text-yellow-400" />
                <span>info@hayabinainsani.sch.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-900 mt-10 pt-6 text-center text-sm text-green-100/50">
          <p>
            &copy; {new Date().getFullYear()} Haya Bina Insani. Hak cipta
            dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
