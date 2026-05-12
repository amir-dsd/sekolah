import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'SMA Negeri 1 Contoh', template: '%s | SMA Negeri 1 Contoh' },
  description: 'Website resmi SMA Negeri 1 Contoh - Sekolah unggulan berakreditasi A, mencetak generasi berkarakter dan berprestasi.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">
        {children}
      </body>
    </html>
  )
}
