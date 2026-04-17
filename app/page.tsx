'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Home() {
  const heroRef = useRef<HTMLHeadingElement>(null)

  // Fade-in on mount
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(2rem)'
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 1s cubic-bezier(0.19,1,0.22,1), transform 1s cubic-bezier(0.19,1,0.22,1)'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    })
  }, [])

  return (
    <main className="bg-brand-bg text-brand-beige min-h-screen flex flex-col overflow-hidden">

      {/* Nav */}
      <nav className="flex items-center justify-between px-[4.2vw] py-[2.5vw] shrink-0">
        <span className="font-display text-[1.1rem] tracking-tight">Pricepal</span>
        <Link
          href="/chat"
          className="group relative text-xs tracking-[0.15em] uppercase text-brand-muted hover:text-brand-beige transition-colors duration-500"
        >
          Open app
          <span className="absolute -bottom-px left-0 w-0 h-px bg-brand-blue group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col justify-center px-[4.2vw] pt-[4vw] pb-[8vw]">
        <p className="text-[0.65rem] tracking-[0.25em] uppercase text-brand-blue mb-[3vw] font-sans">
          01 — AI Shopping Assistant
        </p>

        <h1
          ref={heroRef}
          className="font-display font-normal leading-[0.92] tracking-[-0.02em] mb-[4vw]"
          style={{ fontSize: 'clamp(3.5rem, 11.5vw, 10.5rem)' }}
        >
          Find the best<br />
          <span className="italic text-brand-beige/50">price.</span>
          <br />
          Trust the right<br />
          <span className="italic text-brand-beige/50">store.</span>
        </h1>

        <div className="flex items-center gap-[4vw]">
          <Link
            href="/chat"
            className="group relative inline-flex items-center gap-3 text-sm tracking-[0.1em] uppercase text-brand-beige"
          >
            Start searching
            <span className="text-brand-blue transition-transform duration-500 group-hover:translate-x-1">→</span>
            <span className="absolute -bottom-px left-0 w-full h-px bg-brand-beige/20" />
            <span className="absolute -bottom-px left-0 w-0 h-px bg-brand-blue group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </Link>
        </div>
      </section>

      {/* Divider marquee */}
      <div className="border-y border-brand-border overflow-hidden py-3 shrink-0">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-[0.6rem] tracking-[0.3em] uppercase text-brand-muted mx-[3vw]">
              Price comparison &nbsp;·&nbsp; Store trust &nbsp;·&nbsp; Review summaries &nbsp;·&nbsp; AI-powered
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-brand-border shrink-0">
        {[
          {
            n: '02',
            title: 'Price comparison',
            body: 'Compare prices across Amazon, Best Buy, Walmart, Target and more — in seconds.',
          },
          {
            n: '03',
            title: 'Store trust ratings',
            body: 'Know if a store is safe before you buy. Verified scores and scam flags.',
          },
          {
            n: '04',
            title: 'Review summaries',
            body: 'Aggregated pros, cons and sentiment from thousands of real reviews.',
          },
        ].map((f) => (
          <div key={f.n} className="px-[4.2vw] py-[5vw] flex flex-col gap-[2vw]">
            <p className="text-[0.6rem] tracking-[0.25em] uppercase text-brand-blue font-sans">{f.n}</p>
            <h3 className="font-display text-[clamp(1.4rem,2.8vw,2.4rem)] leading-tight">{f.title}</h3>
            <p className="text-brand-muted text-sm leading-relaxed font-sans max-w-xs">{f.body}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-border px-[4.2vw] py-[2vw] flex items-center justify-between shrink-0">
        <p className="text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted font-sans">
          © {new Date().getFullYear()} Pricepal
        </p>
        <p className="text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted font-sans hidden sm:block">
          AI-powered shopping
        </p>
      </footer>
    </main>
  )
}
