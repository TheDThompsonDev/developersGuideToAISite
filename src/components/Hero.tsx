import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-ink text-bone pt-24 pb-20 lg:pt-32 lg:pb-32">
      <div className="grid-overlay" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-4 mb-6 rise">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-signal text-ink font-mono text-xs font-bold uppercase tracking-widest border-2 border-signal">
                <span
                  className="w-2 h-2 bg-ink rounded-full animate-pulse"
                  aria-hidden="true"
                />
                Shipping 2026
              </span>
              <span className="font-mono text-xs text-bone-muted tracking-wider uppercase">
                No Starch Press
              </span>
            </div>

            <div className="rise rise-delay-1 mb-8">
              <p className="font-display text-[4rem] sm:text-[6rem] lg:text-[7.5rem] leading-[0.85] text-bone uppercase">
                Stop building
                <br />
                <span className="text-signal">toy AI demos.</span>
              </p>
            </div>

            <h1 className="font-sans text-xl lg:text-2xl text-bone-muted max-w-2xl leading-relaxed rise rise-delay-2 mb-10 border-l-4 border-signal pl-6">
              <strong className="text-bone font-medium">
                The Developer's Guide to AI
              </strong>{" "}
              is the field manual for engineering production-grade{" "}
              <span className="text-bone">LLM applications</span>,{" "}
              <span className="text-bone">RAG pipelines</span>, and{" "}
              <span className="text-bone">autonomous agents</span>.
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 rise rise-delay-3">
              <Link
                href="#retailers"
                className="cta-brutal cta-brutal-primary px-8 py-5 text-lg"
              >
                Buy the Book
                <span className="ml-3 font-normal opacity-70">From $59</span>
              </Link>
              <Link href="#chapter1" className="cta-brutal px-8 py-5 text-lg">
                Read Chapter 1 Free
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 font-mono text-xs text-bone-muted uppercase tracking-widest rise rise-delay-4 border-t border-ink-3 pt-6">
              <div>
                <span className="text-ash block mb-1">Formats</span>
                Print, E-Book, Kindle
              </div>
              <div>
                <span className="text-ash block mb-1">Length</span>
                304 Pages, 5 Parts
              </div>
              <div>
                <span className="text-ash block mb-1">Focus</span>
                Engineering, Not Theory
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 relative rise rise-delay-2 hidden lg:block">
            <div className="relative aspect-[3/4] border-4 border-ink-3 bg-ink-2 shadow-[20px_20px_0px_rgba(239,255,0,0.1)] group">
              <Image
                src="/book-cover.png"
                alt="The Developer's Guide to AI Book Cover"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />

              <div className="absolute -top-4 -right-4 bg-signal text-ink font-mono text-xs font-bold uppercase tracking-widest px-4 py-2 border-2 border-ink rotate-3 shadow-[4px_4px_0px_#000]">
                Fig. 001
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
