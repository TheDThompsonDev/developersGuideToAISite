import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink-2 border-t border-ink-3 pt-16 pb-24 md:pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-signal text-ink flex items-center justify-center font-mono text-[11px] font-bold">
                AI
              </div>
              <span className="font-display text-xl text-bone">
                The Developer's Guide to AI
              </span>
            </div>
            <p className="font-display-italic text-signal mb-4">
              From Prompts to Agents
            </p>
            <p className="text-sm text-bone-muted max-w-md">
              A hands-on field guide for working developers. Published by No Starch
              Press, San Francisco, 2026.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash mb-4">
              Authors
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="https://focus.dev" target="_blank" rel="noopener" className="text-bone-muted hover:text-signal">
                  Jacob Orshalick <span className="text-ash">↗</span>
                </Link>
              </li>
              <li>
                <Link href="https://jerrymannel.me" target="_blank" rel="noopener" className="text-bone-muted hover:text-signal">
                  Jerry M. Reghunadh <span className="text-ash">↗</span>
                </Link>
              </li>
              <li>
                <Link href="https://dthompsondev.com" target="_blank" rel="noopener" className="text-bone-muted hover:text-signal">
                  Danny Thompson <span className="text-ash">↗</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash mb-4">
              The Book
            </div>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="#features" className="text-bone-muted hover:text-signal">What's Inside</Link></li>
              <li><Link href="#contents" className="text-bone-muted hover:text-signal">Contents</Link></li>
              <li><Link href="#authors" className="text-bone-muted hover:text-signal">Authors</Link></li>
              <li><Link href="#faq" className="text-bone-muted hover:text-signal">FAQ</Link></li>
              <li><Link href="#retailers" className="text-bone-muted hover:text-signal">Where to Buy</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash mb-4">
              Publisher
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="https://nostarch.com" target="_blank" rel="noopener" className="text-bone-muted hover:text-signal">
                  No Starch Press <span className="text-ash">↗</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink-3 flex flex-col md:flex-row justify-between gap-4 font-mono text-[11px] text-ash">
          <div>
            © {year} Jacob Orshalick, Jerry M. Reghunadh, Danny Thompson.
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span>ISBN 978-1-7185-0476-9 (print)</span>
            <span>ISBN 978-1-7185-0477-6 (ebook)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
