import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-brand-bg text-brand-beige">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 md:px-16">
        <span className="font-display text-lg tracking-tight">Pricepal</span>
        <Link
          href="/chat"
          className="text-sm text-brand-muted hover:text-brand-beige transition-colors duration-300"
        >
          Open app →
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex flex-col justify-center flex-1 px-8 pt-16 pb-24 md:px-16 md:pt-24">
        <p className="text-xs tracking-[0.2em] uppercase text-brand-blue mb-8 font-sans">
          01 — AI Shopping Assistant
        </p>

        <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight mb-10 max-w-4xl">
          Find the best price.{' '}
          <span className="italic text-brand-beige/60">Trust the right store.</span>
        </h1>

        <p className="text-brand-muted text-lg md:text-xl max-w-xl leading-relaxed mb-14 font-sans">
          Search any product, compare prices across stores, verify seller trustworthiness,
          and read aggregated reviews — all in one conversation.
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="/chat"
            className="inline-flex items-center gap-3 bg-brand-blue text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-brand-blue-dim transition-colors duration-300"
          >
            Start searching
            <span className="text-white/60">→</span>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 pb-24 md:px-16">
        <div className="border-t border-brand-border pt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-border">
          {[
            {
              number: '02',
              title: 'Price comparison',
              description:
                'Instantly compare prices across Amazon, Best Buy, Walmart, Target, and more.',
            },
            {
              number: '03',
              title: 'Store trust ratings',
              description:
                'Know if a store is safe before you buy. Verified ratings and scam flags.',
            },
            {
              number: '04',
              title: 'Review summaries',
              description:
                'Aggregated pros, cons, and sentiment from thousands of real reviews.',
            },
          ].map((f) => (
            <div key={f.number} className="bg-brand-bg p-8 md:p-10">
              <p className="text-xs tracking-[0.2em] uppercase text-brand-blue mb-6 font-sans">
                {f.number}
              </p>
              <h3 className="font-display text-2xl mb-4">{f.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed font-sans">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-border px-8 py-6 md:px-16">
        <p className="text-xs text-brand-muted font-sans">
          © {new Date().getFullYear()} Pricepal
        </p>
      </footer>
    </main>
  )
}
