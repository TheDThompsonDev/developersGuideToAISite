"use client";

import { useState } from "react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Subscription failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="chapter1"
      className="relative py-20 lg:py-24 bg-bone border-b-4 border-ink text-ink overflow-hidden"
    >
      <div className="grid-overlay grid-overlay-dark" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8 z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <p className="kicker mb-4 text-ink border-b-2 border-ink pb-2 inline-block">
            Free Evaluation
          </p>
          <h2 className="font-display text-4xl lg:text-5xl leading-[0.95] mb-4 uppercase">
            Read Chapter 1. <br />
            <span className="italic text-ash">Judge for yourself.</span>
          </h2>
          <p className="text-lg font-mono text-ash mb-6">
            28 pages. 15 minute read. Actual code samples.
          </p>

          <ul className="space-y-2 font-mono text-sm uppercase tracking-widest text-ink">
            <li className="flex items-center gap-2">
              <span className="text-signal bg-ink px-1">✓</span> Understanding
              LLMs internally
            </li>
            <li className="flex items-center gap-2">
              <span className="text-signal bg-ink px-1">✓</span> The companion
              code repo
            </li>
          </ul>
        </div>

        <div className="w-full md:w-[400px] bg-ink p-8 border-4 border-ink shadow-[12px_12px_0px_#fae37d]">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="font-display text-4xl text-signal mb-2">
                Sent.
              </div>
              <p className="font-mono text-sm text-bone-muted uppercase tracking-widest">
                Check your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label
                htmlFor="email-capture"
                className="font-mono text-xs uppercase tracking-widest text-signal"
              >
                Where should we send it?
              </label>
              <input
                id="email-capture"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@company.com"
                className="w-full px-4 py-4 bg-ink-2 border-2 border-ink-3 text-bone font-mono text-sm focus:outline-none focus:border-signal transition-colors rounded-none placeholder-ash"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="cta-brutal cta-brutal-primary w-full py-4 text-sm"
              >
                {status === "loading" ? "TRANSMITTING..." : "SEND ME CHAPTER 1"}
              </button>

              {status === "error" && (
                <p className="text-xs text-rust font-mono uppercase mt-2">
                  Error. Please retry.
                </p>
              )}
              <p className="font-mono text-[10px] text-ash uppercase tracking-widest text-center mt-2">
                Zero spam. One-click unsubscribe.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
