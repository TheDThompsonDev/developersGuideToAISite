import Link from "next/link";

const retailers = [
  {
    name: "Amazon",
    role: "Prime & Kindle",
    price: "From $59.99",
    note: "Paperback and Kindle formats, widest availability",
    url: "https://amazon.com/dp/1718504764",
    cta: "Buy on Amazon",
    featured: true,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 7l2-3h8l2 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 7v9a1 1 0 001 1h10a1 1 0 001-1V7"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 10h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "No Starch Press",
    role: "Direct from publisher",
    price: "From $59.95",
    note: "Paperback + ebook bundle, best for authors",
    url: "https://nostarch.com/developers-guide-ai",
    cta: "Buy Direct",
    featured: false,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="3"
          width="16"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6 7h8M6 10h5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Barnes & Noble",
    role: "Online & in-store",
    price: "From $59.95",
    note: "Paperback and Nook ebook",
    url: "https://barnesandnoble.com/w/developers-guide-ai",
    cta: "Buy at B&N",
    featured: false,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 3h12v14H4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M7 3v14" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 7h4M10 10h3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function Retailers() {
  return (
    <section
      id="retailers"
      className="relative py-16 lg:py-24 border-b border-ink-3 overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 text-center">
        <p className="kicker mb-5">Get the Book</p>
        <h2 className="font-display text-5xl lg:text-6xl text-bone leading-[1.05] mb-6">
          Available now.
          <br />
          <em className="font-display-italic text-signal">Ship this week.</em>
        </h2>
        <p className="text-lg text-bone-muted max-w-2xl mx-auto mb-6">
          Paperback, ebook, and Kindle formats. Pick your retailer.
        </p>

        {/* Trust badge */}
        <div className="flex justify-center mb-10">
          <div className="trust-badge">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 1l1.5 3.5L12 5l-2.5 2.5.5 3.5L7 9.5 3.5 11l.5-3.5L1.5 5l3.5-.5L7 1z"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </svg>
            No Starch Press Quality Guarantee
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          {retailers.map((r) => (
            <div
              key={r.name}
              className={`relative flex flex-col border p-8 transition-all ${
                r.featured
                  ? "featured-glow bg-signal text-ink border-signal shadow-[0_0_60px_rgba(244,206,20,0.25)] md:-translate-y-2"
                  : "bg-ink-2 border-ink-3 card-hover hover:border-signal"
              }`}
            >
              {r.featured && (
                <div className="absolute -top-3 left-6 bg-ink text-signal px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]">
                  Recommended
                </div>
              )}

              {/* Retailer icon */}
              <div
                className={`mb-4 ${r.featured ? "text-ink/60" : "text-ash"}`}
              >
                {r.icon}
              </div>

              <div
                className={`font-mono text-[10px] uppercase tracking-[0.25em] mb-3 ${r.featured ? "text-ink/70" : "text-ash"}`}
              >
                {r.role}
              </div>
              <h3
                className={`font-display text-3xl mb-3 ${r.featured ? "text-ink" : "text-bone"}`}
              >
                {r.name}
              </h3>
              <div
                className={`font-mono text-lg mb-2 ${r.featured ? "text-ink" : "text-signal"}`}
              >
                {r.price}
              </div>
              <p
                className={`text-sm mb-8 flex-1 ${r.featured ? "text-ink/80" : "text-bone-muted"}`}
              >
                {r.note}
              </p>

              <Link
                href={r.url}
                target="_blank"
                rel="noopener"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-medium transition-colors ${
                  r.featured
                    ? "bg-ink text-signal hover:bg-ink-2"
                    : "bg-signal text-ink hover:bg-bone"
                }`}
              >
                {r.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Publisher line - reinforces legitimacy one more time */}
        <div className="mt-12 flex items-center justify-center gap-3 font-mono text-xs text-ash uppercase tracking-[0.2em]">
          <span className="h-px w-12 bg-ink-3" aria-hidden="true" />
          Published by No Starch Press · San Francisco · 2026
          <span className="h-px w-12 bg-ink-3" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
