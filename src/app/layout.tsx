import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'SMA Negeri 1 Contoh', template: '%s | SMA Negeri 1 Contoh' },
  description: 'Website resmi SMA Negeri 1 Contoh - Sekolah unggulan berakreditasi A, mencetak generasi berkarakter dan berprestasi.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Anti-flicker: apply theme before paint */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              var t = localStorage.getItem('theme');
              var prefer = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (t === 'dark' || (!t && prefer)) {
                document.documentElement.classList.add('dark');
              }
            } catch(e){}
          })();
        `}} />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
