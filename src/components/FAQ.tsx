export const FAQ_ITEMS = [
  {
    q: 'What programming languages does the book use?',
    a: "Primarily JavaScript/TypeScript (Node + Express) and Python (FastAPI). If you can read either one, you'll be fine. Most concepts are language-agnostic, and the book shows the same idea in both where it matters.",
  },
  {
    q: 'Do I need prior AI or ML experience?',
    a: "No. The book assumes you're a working developer who's used ChatGPT or Claude and written real software. It does not assume you've studied transformer math or trained models. Chapter 1 covers the mental model of LLMs from first principles; you ramp up from there.",
  },
  {
    q: 'Which AI providers and models does the book cover?',
    a: "The book teaches patterns that work across providers. You'll run local models via Ollama, hit hosted APIs (OpenAI-compatible patterns that also work with Anthropic, Google, and open-source providers), and see where provider-specific decisions actually matter.",
  },
  {
    q: 'Does it cover RAG (Retrieval-Augmented Generation)?',
    a: 'Yes, Part III is entirely about RAG. Two chapters: one on vector databases in practice, one on designing a full RAG system. You build a working system, not just read about the concept.',
  },
  {
    q: 'Does it cover agents and agentic systems?',
    a: 'Yes, Part V is three chapters on agents. From the workflow-to-autonomous-agent progression, through building your first agent, to extending agents with tools that do real work.',
  },
  {
    q: 'Is the source code available?',
    a: "Yes. All code from the book is available in a companion repository. You get free access when you buy the book. Beta-test signups also receive repo access.",
  },
  {
    q: 'Paperback or ebook: which should I get?',
    a: "If you want to annotate and reference it on a shelf, paperback. If you want to copy-paste code samples and read on multiple devices, ebook. Many readers buy both, and No Starch sometimes bundles them.",
  },
  {
    q: "Won't this be outdated quickly given how fast AI moves?",
    a: 'The book is deliberately built around durable patterns like prompt engineering fundamentals, RAG architecture, fine-tuning trade-offs, and agent design, not model-of-the-week tutorials. The specific providers and models will shift; the engineering principles stay.',
  },
  {
    q: 'Is this suitable for senior or staff engineers?',
    a: "Yes, and we've heard this specifically from early readers. If you're senior and new to AI, this is the fastest way to get production-ready context. If you're already shipping AI features, the RAG, fine-tuning, and agent chapters fill in the gaps between tutorials and real systems.",
  },
  {
    q: 'How does this compare to an online course or YouTube tutorial?',
    a: "Courses move fast and get out of date. This is a reference: something you open to Chapter 8 when you need to design a retrieval system, or Chapter 12 when you're deciding between a workflow and an agent. It's the book you keep on the desk, not the one you binge once.",
  },
  {
    q: 'Who are the authors?',
    a: 'Jacob Orshalick is a software architect with 20+ years of experience and co-author of Seam Framework. Jerry M. Reghunadh is a senior director with two decades in engineering and international speaking. Danny Thompson is a senior developer advocate, host of The Programming Podcast, and organizer of the Commit Your Code conference. Technical review by Nikhil Kapoor (16+ years in AI/ML).',
  },
  {
    q: 'Where can I buy the book?',
    a: "Directly from No Starch Press (best price, supports the publisher and authors), Amazon (widest availability), Barnes & Noble, or most technical booksellers. Ebook formats are available through No Starch and most major ebook retailers.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-28 lg:py-36 bg-ink-2 border-b border-ink-3">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mb-16">
          <p className="kicker mb-5">Questions</p>
          <h2 className="font-display text-5xl lg:text-6xl text-bone leading-[1.05]">
            Everything you'd want to know<br />
            <em className="font-display-italic text-signal">before you buy.</em>
          </h2>
        </div>

        <div className="divide-y divide-ink-3 border-y border-ink-3">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="group">
              <summary className="flex items-start gap-6 py-6 hover:bg-ink transition-colors px-2 lg:px-4 -mx-2 lg:-mx-4">
                <span className="font-mono text-xs text-ash pt-2 w-8 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-display text-xl lg:text-2xl text-bone leading-snug">
                  {item.q}
                </span>
                <span className="chevron text-ash group-hover:text-signal mt-2" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 6l5 5 5-5" />
                  </svg>
                </span>
              </summary>
              <div className="pb-6 pl-12 lg:pl-16 pr-4 text-bone-muted leading-relaxed max-w-3xl">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

