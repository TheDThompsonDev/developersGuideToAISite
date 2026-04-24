import Link from 'next/link';

export function InsideTheBook() {
  return (
    <section id="excerpt" className="relative py-28 lg:py-36 border-b border-ink-3 overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 lg:mb-16">
          <p className="kicker mb-5">From the Manuscript</p>
          <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] text-bone">
            Real decisions.<br />
            <em className="font-display-italic text-signal">Real code.</em>
          </h2>
          <p className="mt-6 text-lg text-bone-muted max-w-2xl leading-relaxed">
            Four excerpts, pulled directly from the book. A maxim, two production code samples,
            and a decision framework. This is the voice of the book — unedited.
          </p>
        </div>

        {/* Tabbed viewer — CSS-only via radio + :checked */}
        <div className="excerpt-viewer">
          {/* Hidden radio inputs drive the tab state */}
          <input type="radio" name="excerpt-tab" id="excerpt-tab-1" defaultChecked className="sr-only peer/t1" />
          <input type="radio" name="excerpt-tab" id="excerpt-tab-2" className="sr-only peer/t2" />
          <input type="radio" name="excerpt-tab" id="excerpt-tab-3" className="sr-only peer/t3" />
          <input type="radio" name="excerpt-tab" id="excerpt-tab-4" className="sr-only peer/t4" />

          {/* Tab labels */}
          <div className="excerpt-tabs" role="tablist" aria-label="Book excerpts">
            <label htmlFor="excerpt-tab-1" className="excerpt-tab" data-tab="1">
              <span className="excerpt-tab-num">01</span>
              <span className="excerpt-tab-label">The Maxim</span>
              <span className="excerpt-tab-meta">Ch. 8 · RAG</span>
            </label>
            <label htmlFor="excerpt-tab-2" className="excerpt-tab" data-tab="2">
              <span className="excerpt-tab-num">02</span>
              <span className="excerpt-tab-label">RAG Pipeline</span>
              <span className="excerpt-tab-meta">Ch. 8 · Code</span>
            </label>
            <label htmlFor="excerpt-tab-3" className="excerpt-tab" data-tab="3">
              <span className="excerpt-tab-num">03</span>
              <span className="excerpt-tab-label">Tool Agents</span>
              <span className="excerpt-tab-meta">Ch. 14 · Code</span>
            </label>
            <label htmlFor="excerpt-tab-4" className="excerpt-tab" data-tab="4">
              <span className="excerpt-tab-num">04</span>
              <span className="excerpt-tab-label">Trade-offs</span>
              <span className="excerpt-tab-meta">Ch. 6 · Prompts</span>
            </label>
          </div>

          {/* Tab panels — all rendered, active one shown via CSS */}
          <div className="excerpt-panels">
            {/* ============ TAB 1: THE MAXIM ============ */}
            <article className="excerpt-panel" data-panel="1">
              <div className="excerpt-header">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
                  Chapter 8 · Designing a RAG System · p. 190
                </span>
              </div>

              <div className="px-4 py-8 lg:px-12 lg:py-16">
                <blockquote className="font-display text-3xl lg:text-6xl leading-[1.05] text-bone">
                  "Better data beats<br />
                  <em className="font-display-italic text-signal">bigger prompts.</em>"
                </blockquote>

                <div className="mt-10 lg:mt-12 grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-2 lg:border-r lg:border-ink-3 lg:pr-8">
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
                      Context
                    </div>
                  </div>
                  <div className="lg:col-span-10">
                    <p className="text-lg text-bone-muted leading-relaxed">
                      Every retrieval trick in this chapter — better chunking, smarter
                      retrieval, re-ranking, citations — depends on having clean,
                      current, and trustworthy sources. Treat data quality like a
                      first-class feature of your pipeline, not an afterthought.
                    </p>
                    <p className="mt-5 font-display-italic text-xl text-bone">
                      "When answers are wrong, observability is how you debug the
                      pipeline — not the prompt."
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* ============ TAB 2: THE RAG CODE (TypeScript) ============ */}
            <article className="excerpt-panel" data-panel="2">
              <div className="excerpt-header">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
                  Chapter 8 · Building RAG Pipelines · p. 201
                </span>
              </div>

              <div className="px-4 py-8 lg:px-12 lg:py-12">
                <p className="text-bone-muted mb-8 leading-relaxed max-w-2xl">
                  Production RAG requires more than naive similarity search. Here we implement Multi-Query Retrieval to handle ambiguous user intent, increasing our semantic coverage across the vectorstore.
                </p>

                <pre className="excerpt-code">
                  <code>
                    <span className="code-comment">{'// From: part3/rag/retrieval.ts'}</span>{'\n'}
                    <span className="code-kw">import</span> {'{ Document }'} <span className="code-kw">from</span> <span className="code-string">'@langchain/core/documents'</span>;{'\n'}
                    <span className="code-kw">import</span> {'{ OpenAIEmbeddings }'} <span className="code-kw">from</span> <span className="code-string">'@langchain/openai'</span>;{'\n'}
                    <span className="code-kw">import</span> {'{ PineconeStore }'} <span className="code-kw">from</span> <span className="code-string">'@langchain/pinecone'</span>;{'\n'}
                    {'\n'}
                    <span className="code-marker">❶</span> <span className="code-kw">export async function</span> <span className="code-fn">retrieveContext</span>(query: <span className="code-type">string</span>) {'{'}{'\n'}
                    {'  '}<span className="code-kw">const</span> vectorstore = <span className="code-kw">await</span> PineconeStore.fromExistingIndex({'\n'}
                    {'    '}<span className="code-kw">new</span> OpenAIEmbeddings(),{'\n'}
                    {'    '}{'{ pineconeIndex: index }'}{'\n'}
                    {'  '});{'\n'}
                    {'\n'}
                    {'  '}<span className="code-marker">❷</span> <span className="code-comment">{'// Generate 3 variations of the query for semantic coverage'}</span>{'\n'}
                    {'  '}<span className="code-kw">const</span> variations = <span className="code-kw">await</span> <span className="code-fn">generateQueryVariations</span>(query);{'\n'}
                    {'  '}<span className="code-kw">const</span> retrievedDocs = <span className="code-kw">await</span> Promise.all({'\n'}
                    {'    '}<span className="code-marker">❸</span> variations.map((v) {`=>`} vectorstore.similaritySearch(v, 3)){'\n'}
                    {'  '});{'\n'}
                    {'\n'}
                    {'  '}<span className="code-marker">❹</span> <span className="code-kw">return</span> <span className="code-fn">deduplicateDocuments</span>(retrievedDocs.flat());{'\n'}
                    {'}'}
                  </code>
                </pre>

                {/* Annotation legend */}
                <ul className="mt-8 grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  <li className="flex gap-3 text-bone-muted">
                    <span className="code-marker shrink-0">❶</span>
                    <span>The core retrieval function, wrapping our Pinecone connection.</span>
                  </li>
                  <li className="flex gap-3 text-bone-muted">
                    <span className="code-marker shrink-0">❷</span>
                    <span>An LLM sub-call generates multiple semantic angles of the same question.</span>
                  </li>
                  <li className="flex gap-3 text-bone-muted">
                    <span className="code-marker shrink-0">❸</span>
                    <span>Parallel execution of similarity searches across all query variations.</span>
                  </li>
                  <li className="flex gap-3 text-bone-muted">
                    <span className="code-marker shrink-0">❹</span>
                    <span>Flattening and deduplicating the results ensures high-quality context without token waste.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* ============ TAB 3: THE AGENT CODE (Python) ============ */}
            <article className="excerpt-panel" data-panel="3">
              <div className="excerpt-header">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
                  Chapter 14 · Extending Agents with Tools · p. 258
                </span>
              </div>

              <div className="px-6 py-10 lg:px-12 lg:py-12">
                <p className="text-bone-muted mb-8 leading-relaxed max-w-2xl">
                  Here's how the book teaches an agent to <em>do</em> things, not just talk
                  about them. The <code className="text-signal font-mono text-sm">@tool</code> decorator
                  registers a Python function — and the docstring is what the LLM reads
                  to decide when and how to call it.
                </p>

                {/* Code block */}
                <pre className="excerpt-code">
                  <code>
                    <span className="code-comment"># From: part5/agents/tools.py</span>
                    {'\n'}
                    <span className="code-kw">from</span> smolagents <span className="code-kw">import</span> tool, CodeAgent, LiteLLMModel
                    {'\n\n'}
                    <span className="code-marker">❶</span> <span className="code-decorator">@tool</span>
                    {'\n'}
                    <span className="code-marker">❷</span> <span className="code-kw">def</span> <span className="code-fn">save_file</span>(data: <span className="code-type">str</span>) -&gt; <span className="code-type">None</span>:
                    {'\n    '}
                    <span className="code-marker">❸</span> <span className="code-string">{'"""'}</span>
                    {'\n    '}
                    <span className="code-string">Save the data to a file.</span>
                    {'\n'}
                    {'\n    '}
                    <span className="code-string">Args:</span>
                    {'\n    '}
                    <span className="code-string">    data: The data to save to the file.</span>
                    {'\n    '}
                    <span className="code-string">{'"""'}</span>
                    {'\n    '}
                    <span className="code-marker">❹</span> <span className="code-kw">with</span> <span className="code-fn">open</span>(<span className="code-string">"investments.txt"</span>, <span className="code-string">"w"</span>) <span className="code-kw">as</span> f:
                    {'\n        '}
                    f.write(data)
                    {'\n\n'}
                    agent = <span className="code-fn">CodeAgent</span>(
                    {'\n    '}
                    <span className="code-marker">❺</span> tools=[save_file],
                    {'\n    '}
                    model=model,
                    {'\n    '}
                    add_base_tools=<span className="code-const">True</span>,
                    {'\n'}
                    )
                  </code>
                </pre>

                {/* Annotation legend */}
                <ul className="mt-8 grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  <li className="flex gap-3 text-bone-muted">
                    <span className="code-marker shrink-0">❶</span>
                    <span>The <code className="text-signal font-mono">@tool</code> decorator registers the function with the agent runtime.</span>
                  </li>
                  <li className="flex gap-3 text-bone-muted">
                    <span className="code-marker shrink-0">❷</span>
                    <span>Type hints matter — the agent uses them to validate inputs.</span>
                  </li>
                  <li className="flex gap-3 text-bone-muted">
                    <span className="code-marker shrink-0">❸</span>
                    <span>The docstring <em>is</em> the instruction manual. The LLM reads it.</span>
                  </li>
                  <li className="flex gap-3 text-bone-muted">
                    <span className="code-marker shrink-0">❹</span>
                    <span>A real filesystem operation — the agent can now persist state.</span>
                  </li>
                  <li className="flex gap-3 text-bone-muted md:col-span-2">
                    <span className="code-marker shrink-0">❺</span>
                    <span>The tool is passed to the agent. It can now decide when to call it.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* ============ TAB 4: THE FRAMEWORK ============ */}
            <article className="excerpt-panel" data-panel="4">
              <div className="excerpt-header">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
                  Chapter 6 · Prompt Engineering in Code · p. 80
                </span>
              </div>

              <div className="px-4 py-8 lg:px-12 lg:py-12">
                <p className="text-bone-muted mb-8 leading-relaxed max-w-2xl">
                  Every AI codebase has to pick an abstraction level — raw SDK, lightweight
                  wrapper, or full framework. The book's trade-off curve:
                </p>

                {/* Trade-off as a visual framework */}
                <div className="border border-ink-3 bg-ink-2">
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ink-3">
                    <div className="p-8 lg:p-10">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="font-mono text-signal text-sm">↑</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">
                          Higher Abstraction
                        </span>
                      </div>
                      <p className="font-display text-2xl text-bone leading-snug mb-4">
                        Buys speed of delivery and shared conventions.
                      </p>
                      <p className="text-sm text-ash font-mono">
                        LangChain · LlamaIndex · Haystack · CrewAI
                      </p>
                    </div>
                    <div className="p-8 lg:p-10">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="font-mono text-signal text-sm">↓</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">
                          Lower Abstraction
                        </span>
                      </div>
                      <p className="font-display text-2xl text-bone leading-snug mb-4">
                        Buys performance, debuggability, and long-term freedom.
                      </p>
                      <p className="text-sm text-ash font-mono">
                        OpenAI SDK · Anthropic SDK · Ollama client
                      </p>
                    </div>
                  </div>
                </div>

                <blockquote className="mt-10 pt-8 border-t border-ink-3">
                  <p className="font-display-italic text-2xl lg:text-3xl text-bone leading-snug">
                    "Choose the level that removes your biggest current bottleneck —
                    and be ready to slide up or down the stack as those bottlenecks
                    change."
                  </p>
                </blockquote>
              </div>
            </article>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-ink-3">
          <p className="text-sm text-ash font-mono">
            These are four excerpts out of 304 pages.
          </p>
          <Link
            href="#chapter1"
            className="inline-flex items-center gap-2 text-sm text-bone hover:text-signal transition-colors"
          >
            Get Chapter 1 in your inbox
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
