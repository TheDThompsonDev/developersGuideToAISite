const testimonials = [
  {
    quote:
      "This book demystified AI under the hood for me. The explanations are clear, the companion repo is hands-on and keeps improving, and the coverage of RAG, tokens, prompt engineering, and fine-tuning gave me real foundations to build on. Even though the AI landscape changes almost every day, these fundamentals don't.",
    author: "Sara Baqla",
    role: "AI Native Engineer",
    highlight: false,
  },
  {
    quote:
      'Going through "The Developer’s Guide to AI", with fellow developers in our Commit Your Code Discord, leading chapter discussions over several months, helped me turn scattered AI concepts into something clear and practical. It broke down topics like RAG, prompt engineering, and agents in a way that actually made sense to apply. The experience went beyond reading, it gave me real confidence in using AI in development. This is a book that truly meets you where you are. If you’re looking to move from learning AI to actually building with it, this is a great place to start.',
    author: "David Kea, Jr.",
    role: "Enterprise Technology Business Specialist",
    highlight: true,
  },
  {
    quote:
      "Even as a developer who thought I understood LLMs well, this book delivered new, practical insights. It bridges theory and real-world application, showing how to use LLMs at the application layer without a data science background. A high-value, must-read for any developer building with AI",
    author: "Preet Katari",
    role: "Cloud Solutions Architect",
    highlight: false,
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28 lg:py-36 bg-bone text-ink border-b border-ink-3 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <p className="kicker mb-5" style={{ color: "var(--color-ink)" }}>
            Praise
          </p>
          <h2 className="font-display text-5xl lg:text-6xl text-ink leading-[1.05]">
            What senior engineers are saying.
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <figure className="lg:col-span-7">
            <div
              className="font-display text-8xl leading-none mb-4"
              style={{ color: "var(--color-signal)" }}
              aria-hidden="true"
            >
              &ldquo;
            </div>
            <blockquote className="font-display text-3xl lg:text-4xl leading-snug text-ink">
              {testimonials[1].quote}
            </blockquote>
            <figcaption className="mt-8 pt-6 border-t border-ink/20">
              <div className="font-display text-xl text-ink">
                {testimonials[1].author}
              </div>
              <div
                className="font-mono text-xs uppercase tracking-[0.2em] mt-1"
                style={{ color: "var(--color-ash)" }}
              >
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
                  <div className="font-display text-base text-ink">
                    {t.author}
                  </div>
                  <div
                    className="font-mono text-[11px] uppercase tracking-wider"
                    style={{ color: "var(--color-ash)" }}
                  >
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
