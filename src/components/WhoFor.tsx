const forYou = [
  "You've played with ChatGPT and Claude. Now you want to build with them.",
  "You're comfortable reading TypeScript or Python. You've shipped real code.",
  "You're tired of AI demos that don't survive contact with production.",
  "You want to understand when to use RAG, fine-tuning, prompts, or agents, and why.",
  "You'd rather build five real systems than read five theoretical papers.",
];

const notForYou = [
  "You've never written a line of code. Start somewhere else, then come back.",
  "You want a cookbook of copy-paste prompts. This teaches systems thinking, not incantations.",
  "You want ML theory, transformer math, or training models from scratch.",
  "You're looking for speculation about AGI. This book is about shipping working software.",
];

export function WhoFor() {
  return (
    <section className="relative py-28 lg:py-36 border-b border-ink-3">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-16">
          <p className="kicker mb-5">Audience</p>
          <h2 className="font-display text-5xl lg:text-6xl text-bone leading-[1.05] max-w-3xl">
            This book is for, and not for, specific people.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-ink-3 border border-ink-3">
          <div className="bg-ink p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-8 bg-signal text-ink flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">
                For You If
              </span>
            </div>
            <ul className="space-y-5">
              {forYou.map((item, i) => (
                <li key={i} className="flex gap-4 text-bone">
                  <span className="font-mono text-xs text-ash pt-1.5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-ink-2 p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-8 border border-ash text-ash flex items-center justify-center text-sm">
                ×
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash">
                Probably Not For You If
              </span>
            </div>
            <ul className="space-y-5">
              {notForYou.map((item, i) => (
                <li key={i} className="flex gap-4 text-bone-muted">
                  <span className="font-mono text-xs text-ash pt-1.5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
