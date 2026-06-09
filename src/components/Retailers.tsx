import { RetailerCards } from "./RetailerCards";

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
          <em className="font-display-italic text-signal text-4xl lg:text-5xl">
            Pick your preferred retailer.
          </em>
        </h2>
        <p className="text-lg text-bone-muted max-w-2xl mx-auto mb-6">
          Paperback, ebook, and Kindle formats. Pick your retailer.
        </p>

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

        <RetailerCards />

        <div className="mt-12 flex items-center justify-center gap-3 font-mono text-xs text-ash uppercase tracking-[0.2em]">
          <span className="h-px w-12 bg-ink-3" aria-hidden="true" />
          Published by No Starch Press · San Francisco · 2026
          <span className="h-px w-12 bg-ink-3" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
