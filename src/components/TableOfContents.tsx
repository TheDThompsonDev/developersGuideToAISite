const toc = [
  {
    part: 'I',
    title: 'Getting Started with AI',
    chapters: [
      { n: '1', title: 'Understanding Large Language Models', page: 3 },
      { n: '2', title: 'Building Your First LLM-Powered Application', page: 15 },
      { n: '3', title: 'Python Essentials for LLMs and APIs', page: 29 },
    ],
  },
  {
    part: 'II',
    title: 'Prompt Engineering',
    chapters: [
      { n: '4', title: 'Fundamentals of Prompt Engineering', page: 43 },
      { n: '5', title: 'Prompt Engineering Techniques', page: 61 },
      { n: '6', title: 'Prompt Engineering in Code', page: 77 },
    ],
  },
  {
    part: 'III',
    title: 'Vector Databases and RAG',
    chapters: [
      { n: '7', title: 'Vector Databases in Practice', page: 131 },
      { n: '8', title: 'Designing a Retrieval-Augmented Generation System', page: 161 },
    ],
  },
  {
    part: 'IV',
    title: 'Adapting Models to Real-World Tasks',
    chapters: [
      { n: '9', title: 'Why and When to Customize a Model', page: 197 },
      { n: '10', title: 'Preparing Data for Fine-Tuning', page: 207 },
      { n: '11', title: 'Fine-Tuning Models in Practice', page: 219 },
    ],
  },
  {
    part: 'V',
    title: 'Building Agentic Systems',
    chapters: [
      { n: '12', title: 'From Workflows to Autonomous Agents', page: 247 },
      { n: '13', title: 'Building an Autonomous Agent', page: 253 },
      { n: '14', title: 'Extending Agents with Tools', page: 259 },
    ],
  },
];

export function TableOfContents() {
  return (
    <section id="contents" className="relative py-28 lg:py-36 bg-ink-2 border-b border-ink-3">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="kicker mb-5">Table of Contents</p>
          <h2 className="font-display text-5xl lg:text-6xl text-bone">
            Every chapter, every page.
          </h2>
          <p className="mt-5 text-lg text-bone-muted">
            Tap any part to expand.
          </p>
        </div>

        <div className="divide-y divide-ink-3 border-y border-ink-3">
          {toc.map((section) => (
            <details key={section.part} className="group">
              <summary className="flex items-baseline gap-6 py-6 lg:py-8 hover:bg-ink transition-colors px-2 lg:px-4">
                <span className="font-display text-4xl lg:text-5xl text-signal leading-none w-12 lg:w-16 shrink-0">
                  {section.part}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-2xl lg:text-3xl text-bone">
                    {section.title}
                  </span>
                  <span className="block font-mono text-[11px] text-ash uppercase tracking-[0.2em] mt-1">
                    {section.chapters.length} chapters
                  </span>
                </span>
                <span className="chevron text-ash group-hover:text-signal transition-colors" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 6l5 5 5-5" />
                  </svg>
                </span>
              </summary>

              <div className="pb-8 px-2 lg:px-4">
                <ul className="space-y-1 ml-12 lg:ml-20">
                  {section.chapters.map((ch) => (
                    <li key={ch.n} className="flex items-baseline gap-3 py-1.5 text-bone-muted">
                      <span className="font-mono text-xs text-ash w-8 shrink-0">{ch.n}</span>
                      <span className="flex-1">{ch.title}</span>
                      <span className="hidden sm:block flex-1 border-b border-dotted border-ink-3 translate-y-[-4px] mx-2" aria-hidden="true" />
                      <span className="font-mono text-xs text-ash">{ch.page}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

