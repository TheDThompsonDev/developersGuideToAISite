import Link from 'next/link';

const parts = [
  {
    roman: 'I',
    title: 'Getting Started with AI',
    chapters: '3 chapters',
    promise:
      "Ship an LLM-powered app before you finish the part. Ollama running locally, a Node or Python server hitting it, streaming responses to the UI. No OpenAI key required. Build on your own hardware first.",
    topics: ['Local LLMs with Ollama', 'Streaming with Express', 'Python + FastAPI essentials'],
  },
  {
    roman: 'II',
    title: 'Prompt Engineering',
    chapters: '3 chapters',
    promise:
      'Prompt techniques that survive production, not parlor tricks. How to structure prompts inside real codebases, handle failure modes, and write prompts that behave the same way on the hundredth call as on the first.',
    topics: ['Fundamentals', 'Advanced techniques', 'Prompts in code'],
  },
  {
    roman: 'III',
    title: 'Vector Databases & RAG',
    chapters: '2 chapters',
    promise:
      'Retrieval-Augmented Generation from scratch. Vector databases without the hype, chunking strategies, retrieval design, and how to tell when RAG is actually the right answer vs. a context-window trick.',
    topics: ['Vector DBs in practice', 'Designing a RAG system'],
  },
  {
    roman: 'IV',
    title: 'Adapting Models',
    chapters: '3 chapters',
    promise:
      "Fine-tuning when it's worth it, and skipping it when it's not. Data preparation, the real cost curves, and the decisions senior engineers make about prompt engineering vs. fine-tuning vs. a custom model.",
    topics: ['Why (and when)', 'Data preparation', 'Fine-tuning in practice'],
  },
  {
    roman: 'V',
    title: 'Building Agentic Systems',
    chapters: '3 chapters',
    promise:
      "From workflow to autonomous agent. How agents actually work, how to build one, and how to extend them with real tools that do real work, not another 'agent writes poetry' demo.",
    topics: ['Workflows to agents', 'Building an agent', 'Extending with tools'],
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-28 lg:py-36 border-b border-ink-3">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mb-20">
          <p className="kicker mb-5">What You&apos;ll Build</p>
          <h2 className="font-display text-5xl lg:text-6xl leading-[1.05] text-bone">
            Five parts.<br />
            One journey from{' '}
            <em className="font-display-italic text-signal">prompts to agents</em>.
          </h2>
          <p className="mt-6 text-lg text-bone-muted leading-relaxed max-w-2xl">
            This isn&apos;t a collection of essays. It&apos;s a sequenced build. Each part
            extends the last, so by the time you get to agents, you&apos;ve already written
            the LLM calls, the prompts, the retrieval, and the fine-tuning underneath them.
          </p>
        </div>

        <div className="space-y-px bg-ink-3 journey-line">
          {parts.map((part) => (
            <div
              key={part.roman}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12 bg-ink py-12 lg:py-16 px-2 lg:px-8 group card-hover hover:bg-ink-2 transition-colors"
            >
              <div className="lg:col-span-2 flex lg:block items-baseline gap-4">
                <div className="font-display text-7xl lg:text-8xl leading-none text-signal group-hover:translate-x-1 transition-transform drop-shadow-[0_0_20px_rgba(244,206,20,0.15)]">
                  {part.roman}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash lg:mt-4">
                  Part · {part.chapters}
                </div>
              </div>

              <div className="lg:col-span-7">
                <h3 className="font-display text-3xl lg:text-4xl text-bone mb-4">
                  {part.title}
                </h3>
                <p className="text-base lg:text-lg text-bone-muted leading-relaxed">
                  {part.promise}
                </p>
              </div>

              <div className="lg:col-span-3 lg:border-l lg:border-ink-3 lg:pl-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash mb-3">
                  Covers
                </div>
                <ul className="space-y-2">
                  {part.topics.map((topic) => (
                    <li key={topic} className="text-sm text-bone-muted flex gap-3">
                      <span className="text-signal">·</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="#contents"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ash hover:text-signal transition-colors"
          >
            See the full table of contents
            <span aria-hidden="true">↓</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

