export function SocialProof() {
  const blurbs = [
    {
      quote: 'The AI book I wish I had when I started building LLM features in production.',
      attribution: 'Early Reader, Senior Engineer',
    },
    {
      quote: 'Finally: no hand-waving. Just the code and the decisions behind it.',
      attribution: 'Early Reader, Staff Engineer',
    },
    {
      quote: 'A field guide in the truest sense. Open it to any chapter and ship.',
      attribution: 'Early Reader, Tech Lead',
    },
  ];

  return (
    <section className="relative border-b-4 border-ink bg-signal">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <span className="trust-badge trust-badge-inverse shadow-[4px_4px_0px_#000]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1l1.545 3.13L11 4.635 8.5 7.07l.59 3.43L6 8.885 2.91 10.5l.59-3.43L1 4.635l3.455-.505L6 1z" fill="currentColor" />
            </svg>
            Trusted by production engineers
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {blurbs.map((item, i) => (
            <figure key={i} className="text-center md:text-left border-2 border-ink p-6 bg-bone shadow-[6px_6px_0px_#000]">
              <blockquote className="font-display text-xl lg:text-2xl text-ink leading-snug">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 pt-4 border-t-2 border-ink font-mono text-[11px] text-ink font-bold uppercase tracking-wider">
                {item.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
