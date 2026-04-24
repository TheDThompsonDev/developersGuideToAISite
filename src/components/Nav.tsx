import Link from 'next/link';

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-3" style={{
      background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.95), rgba(10, 10, 10, 0.85))',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 bg-signal text-ink flex items-center justify-center font-mono text-[11px] font-bold tracking-tight">
              AI
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-[15px] text-bone">
                The Developer&apos;s Guide
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash mt-0.5">
                No Starch Press · 2026
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="#features"
              className="text-sm text-bone-muted hover:text-signal transition-colors"
            >
              What&apos;s Inside
            </Link>
            <Link
              href="#contents"
              className="text-sm text-bone-muted hover:text-signal transition-colors"
            >
              Contents
            </Link>
            <Link
              href="#authors"
              className="text-sm text-bone-muted hover:text-signal transition-colors"
            >
              Authors
            </Link>
            <Link
              href="#faq"
              className="text-sm text-bone-muted hover:text-signal transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="#retailers"
              className="text-sm font-medium px-4 py-2 bg-signal text-ink hover:bg-bone transition-colors"
            >
              Buy the Book
            </Link>
          </nav>

          <details className="md:hidden relative">
            <summary className="p-2 -mr-2 text-bone" aria-label="Menu">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            </summary>
            <div className="absolute right-0 top-full mt-2 w-56 bg-ink-2 border border-ink-3 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <Link href="#features" className="block px-4 py-2 text-sm text-bone-muted hover:bg-ink-3 hover:text-signal">
                What&apos;s Inside
              </Link>
              <Link href="#contents" className="block px-4 py-2 text-sm text-bone-muted hover:bg-ink-3 hover:text-signal">
                Contents
              </Link>
              <Link href="#authors" className="block px-4 py-2 text-sm text-bone-muted hover:bg-ink-3 hover:text-signal">
                Authors
              </Link>
              <Link href="#faq" className="block px-4 py-2 text-sm text-bone-muted hover:bg-ink-3 hover:text-signal">
                FAQ
              </Link>
              <div className="border-t border-ink-3 mt-2 pt-2">
                <Link
                  href="#retailers"
                  className="block mx-2 px-3 py-2 text-sm font-medium bg-signal text-ink text-center"
                >
                  Buy the Book
                </Link>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
