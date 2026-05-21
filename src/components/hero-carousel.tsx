'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  { src: 'https://i.postimg.cc/xCpK7NBz/GEDUNG-SEKOLAH.jpg', alt: 'Gedung Sekolah' },
  { src: 'https://i.postimg.cc/QMbgQybn/RUANG-KELAS.jpg', alt: 'Ruang Kelas' },
  { src: 'https://i.postimg.cc/T1Gptd3w/IMG-20251020-WA0012.jpg', alt: 'Kegiatan Sekolah' },
  { src: 'https://i.postimg.cc/HWqgDZwS/IMG-20250421-WA0009.jpg', alt: 'Kegiatan Sekolah' },
  { src: 'https://i.postimg.cc/T2z6M7Vs/IMG-20250612-WA0006.jpg', alt: 'Kegiatan Sekolah' },
  { src: 'https://i.postimg.cc/QxcrXQSD/IMG-20260209-WA0025.jpg', alt: 'Kegiatan Sekolah' },
  { src: 'https://i.postimg.cc/ryBkXn1P/IMG-20260209-WA0035.jpg', alt: 'Kegiatan Sekolah' },
  { src: 'https://i.postimg.cc/rF5L81gp/IMG20250808081833.jpg', alt: 'Kegiatan Sekolah' },
  { src: 'https://i.postimg.cc/W1jctdfD/IMG20250819084425.jpg', alt: 'Kegiatan Sekolah' },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 4000)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <div
      className="relative group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Carousel frame */}
      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-green-950/50 border border-white/10">
        {/* Images */}
        <div className="relative w-full h-80 bg-green-950">
          {images.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === current ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />

          {/* Prev / Next */}
          <button
            onClick={prev}
            aria-label="Sebelumnya"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Berikutnya"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-5 h-2 bg-white'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Akreditasi badge — outside overflow-hidden so it's not clipped */}
      <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-green-900 rounded-2xl px-5 py-3 shadow-xl text-center z-10">
        <p className="text-xs font-semibold">Akreditasi</p>
        <p className="text-2xl font-black leading-tight">A</p>
        <p className="text-xs font-semibold">Unggul</p>
      </div>
    </div>
  )
}
