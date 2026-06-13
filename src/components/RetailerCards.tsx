"use client";

import { getClickContext, trackEvent } from "../lib/analytics";

const retailers = [
  {
    name: "Amazon",
    role: "Prime & Kindle",
    price: "From $59.99",
    note: "Paperback and Kindle formats, widest availability",
    url: "https://amazon.com/dp/1718504764",
    cta: "Buy on Amazon",
    featured: true,
    icon: "bag",
  },
  {
    name: "No Starch Press",
    role: "Direct from publisher",
    price: "From $59.99",
    note: "Paperback + ebook bundle, best for authors",
    url: "https://nostarch.com/developers-guide-to-ai",
    cta: "Buy Direct",
    featured: false,
    icon: "card",
  },
  {
    name: "Barnes & Noble",
    role: "Online & in-store",
    price: "From $59.99",
    note: "Paperback and Nook ebook",
    url: "https://www.barnesandnoble.com/w/the-developers-guide-to-ai-jacob-orshalick/1148828031",
    cta: "Buy at B&N",
    featured: false,
    icon: "book",
  },
] as const;

type RetailerCardsProps = {
  placement?: "retailers_section" | "buy_modal";
  sourcePlacement?: string;
};

function RetailerIcon({ icon }: { icon: (typeof retailers)[number]["icon"] }) {
  if (icon === "bag") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 7l2-3h8l2 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 7v9a1 1 0 001 1h10a1 1 0 001-1V7"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 10h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (icon === "card") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="3"
          width="16"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6 7h8M6 10h5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 3h12v14H4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M7 3v14" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 7h4M10 10h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RetailerCards({
  placement = "retailers_section",
  sourcePlacement,
}: RetailerCardsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6 text-left">
      {retailers.map((r) => (
        <div
          key={r.name}
          className={`relative flex flex-col border p-8 transition-all ${
            r.featured
              ? "featured-glow bg-signal text-ink border-signal shadow-[0_0_60px_rgba(244,206,20,0.25)]"
              : "bg-ink-2 border-ink-3 card-hover hover:border-signal"
          }`}
        >
          {r.featured && (
            <div className="mb-6 inline-flex w-fit bg-ink text-signal px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] shadow-[3px_3px_0px_rgba(0,0,0,0.18)]">
              Recommended
            </div>
          )}

          <div className={`mb-4 ${r.featured ? "text-ink/60" : "text-ash"}`}>
            <RetailerIcon icon={r.icon} />
          </div>

          <div
            className={`font-mono text-[10px] uppercase tracking-[0.25em] mb-3 ${r.featured ? "text-ink/70" : "text-ash"}`}
          >
            {r.role}
          </div>
          <h3
            className={`font-display text-3xl mb-3 ${r.featured ? "text-ink" : "text-bone"}`}
          >
            {r.name}
          </h3>
          <div
            className={`font-mono text-lg mb-2 ${r.featured ? "text-ink" : "text-signal"}`}
          >
            {r.price}
          </div>
          <p
            className={`text-sm mb-8 flex-1 ${r.featured ? "text-ink/80" : "text-bone-muted"}`}
          >
            {r.note}
          </p>

          <a
            href={r.url}
            target="_blank"
            rel="noopener"
            onClick={(event) => {
              trackEvent("retailer_click", {
                retailer: r.name,
                retailer_role: r.role,
                retailer_url: r.url,
                link_text: r.cta,
                click_placement: placement,
                buy_opener_placement: sourcePlacement,
                ...getClickContext(event),
              });
            }}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-medium transition-colors ${
              r.featured
                ? "bg-ink text-signal hover:bg-ink-2"
                : "bg-signal text-ink hover:bg-bone"
            }`}
          >
            {r.cta}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      ))}
    </div>
  );
}
