"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Subscription failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="newsletter"
      className="relative py-20 lg:py-24 bg-ink border-t-4 border-signal overflow-hidden"
    >
      <div className="grid-overlay" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8 z-10 text-center">
        <p className="kicker mb-4">Stay in the loop</p>
        <h2 className="font-display text-4xl lg:text-5xl leading-[0.95] mb-4 uppercase text-bone">
          Get AI Engineering
          <br />
          <span className="italic text-signal">insights delivered.</span>
        </h2>
        <p className="text-lg font-mono text-ash mb-10 max-w-lg mx-auto">
          New chapters, code drops, and field notes - straight to your inbox.
        </p>

        <div className="max-w-md mx-auto">
          {status === "success" ? (
            <div className="bg-ink-2 border-4 border-signal p-8 shadow-[8px_8px_0px_#fae37d]">
              <div className="font-display text-4xl text-signal mb-2">
                You&apos;re in.
              </div>
              <p className="font-mono text-sm text-bone-muted uppercase tracking-widest">
                Welcome to the list. 🎉
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@company.com"
                className="flex-1 px-4 py-4 bg-ink-2 border-2 border-ink-3 text-bone font-mono text-sm focus:outline-none focus:border-signal transition-colors rounded-none placeholder-ash"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="cta-brutal cta-brutal-primary px-8 py-4 text-sm whitespace-nowrap"
              >
                {status === "loading" ? "SUBSCRIBING..." : "SUBSCRIBE"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-xs text-rust font-mono uppercase mt-3">
              Something went wrong. Please try again.
            </p>
          )}

          {status !== "success" && (
            <p className="font-mono text-[10px] text-ash uppercase tracking-widest text-center mt-4">
              Zero spam. One-click unsubscribe.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
