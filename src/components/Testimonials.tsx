const testimonials = [
  {
    quote:
      "The gap between 'tried ChatGPT once' and 'ship this in production' is where most developers get stuck. This book closes that gap with real code, real decisions, and zero hand-waving.",
    author: 'Early Reader',
    role: 'Staff Engineer',
    highlight: false,
  },
  {
    quote:
      "Most AI books explain the technology. This one teaches you the taste. It covers when to reach for RAG vs. fine-tuning, when a prompt is enough, and when you need an agent. That's the part nobody writes about.",
    author: 'Early Reader',
    role: 'Principal Engineer',
    highlight: true,
  },
  {
    quote:
      "I've been building LLM features for two years and still learned something in every part. The RAG and agent chapters are especially valuable. These are the patterns I wish had been written down six months ago.",
    author: 'Early Reader',
    role: 'Tech Lead',
    highlight: false,
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28 lg:py-36 bg-bone text-ink border-b border-ink-3 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <p className="kicker mb-5" style={{ color: 'var(--color-ink)' }}>
            Praise
          </p>
          <h2 className="font-display text-5xl lg:text-6xl text-ink leading-[1.05]">
            What senior engineers are saying.
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <figure className="lg:col-span-7">
            <div className="font-display text-8xl leading-none mb-4" style={{ color: 'var(--color-signal)' }} aria-hidden="true">
              &ldquo;
            </div>
            <blockquote className="font-display text-3xl lg:text-4xl leading-snug text-ink">
              {testimonials[1].quote}
            </blockquote>
            <figcaption className="mt-8 pt-6 border-t border-ink/20">
              <div className="font-display text-xl text-ink">{testimonials[1].author}</div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] mt-1" style={{ color: 'var(--color-ash)' }}>
                {testimonials[1].role}
              </div>
            </figcaption>
          </figure>

          <div className="lg:col-span-5 space-y-12 lg:pl-8 lg:border-l lg:border-ink/10">
            {[testimonials[0], testimonials[2]].map((t, i) => (
              <figure key={i}>
                <blockquote className="font-display-italic text-xl text-ink leading-snug">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4">
                  <div className="font-display text-base text-ink">{t.author}</div>
                  <div className="font-mono text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-ash)' }}>
                    {t.role}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
