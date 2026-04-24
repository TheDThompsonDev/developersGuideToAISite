# The Developer's Guide to AI — Landing Page

Production-ready Next.js 15 App Router landing page, built for the book _The Developer's Guide to AI: From Prompts to Agents_ (No Starch Press, 2026).

## What changed vs. the previous version

The rewrite is organized around three goals: **conversion**, **SEO**, and **editorial gravitas**.

### Conversion

- **Sharp positioning**: The subtitle "From Prompts to Agents" is now the site's center of gravity. It communicates journey + scope instantly.
- **Real features**: The old Features section pitched a different book. Rewritten around the five actual parts (LLMs → Prompts → RAG → Fine-Tuning → Agents) with specific promises instead of hype.
- **Complete Table of Contents**: Every chapter + page number, using native `<details>` for server-rendered interactivity.
- **Who Is / Isn't For You**: Sharp qualification section reduces bad-fit buyers and boosts good-fit ones.
- **Testimonials**: Placeholder structure ready for real blurbs. Editorial-style pull quotes, not carousel cards.
- **Free Chapter 1 email capture**: Single highest-ROI addition. Builds your launch list.
- **Rich author bios**: Pulled directly from the book. Real outbound links (focus.dev, jerrymannel.me, dthompsondev.com).
- **Comprehensive FAQ**: Twelve questions answering real developer skepticism.
- **Retailer hierarchy**: No Starch featured, Amazon + B&N supporting. Real pricing.
- **Sticky mobile buy bar**: Always-visible CTA on mobile.

### SEO

- **Fully server-rendered**: Only the email form is `'use client'`. H1 and all critical content is indexed.
- **Rich metadata**: OpenGraph, Twitter Card, canonical URL, comprehensive keywords.
- **Three JSON-LD schemas**: Book + FAQPage + BreadcrumbList. This unlocks rich-card treatment and expandable FAQ in Google results.
- **sitemap.xml + robots.txt**: Via Next.js conventions (`app/sitemap.ts`, `app/robots.ts`).
- **Semantic HTML**: `<article>`, `<figure>`, `<blockquote>`, `<details>`, `<header>`, `<footer>`, `<nav>` used correctly.

### Design

- **Editorial technical authority**: Feels like a book, not a SaaS landing page.
- **Typography**: Instrument Serif (display + italic subtitle) · Geist Sans (body) · JetBrains Mono (chapter numbers, ISBN, spec lines).
- **Palette**: Near-black ink (#0A0A0A), warm bone cream (#F5F1E8), signal yellow (#F4CE14).
- **Structural motifs**: Roman numerals for parts, chapter numbers in mono, rule lines, editorial kicker text, "Fig. 001" corner marks.

---

## Launch Checklist

Before you go live, handle these:

### Critical (blocks launch)

- [ ] **Update retailer URLs** in `components/Retailers.tsx` — real No Starch page, Amazon ASIN, B&N URL.
- [ ] **Replace `SITE_URL`** in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, and `components/BookSchema.tsx` with your production URL.
- [ ] **Add cover image** to `/public/cover.png` (3:4 aspect ratio recommended).
- [ ] **Add OG image** to `/public/og.png` (1200x630, displayed when links are shared on social media). Can be auto-generated via Next's `opengraph-image.tsx` file convention if you'd rather.
- [ ] **Add favicon** to `/public/favicon.ico` and `/public/apple-touch-icon.png`.
- [ ] **Replace placeholder testimonials** in `components/Testimonials.tsx` and `components/SocialProof.tsx` with real quotes.
- [ ] **Add author photos** to `/public/authors/jacob.jpg`, `/public/authors/jerry.jpg`, `/public/authors/danny.jpg` (square, ~600x600).

### High priority

- [ ] **Wire up email capture**: `components/EmailCapture.tsx` posts to `/api/subscribe`. Create that route (see below) pointing at your mailing list provider (ConvertKit, Resend, Mailchimp, Beehiiv, etc.).
- [ ] **Confirm publication date and page count** match reality — currently showing 2026 / 304 pages in `BookSchema.tsx` and Hero.
- [ ] **Verify ISBNs** in `components/BookSchema.tsx`, `components/Footer.tsx`, and `components/Hero.tsx`.

### Nice to have before launch

- [ ] Once reviews roll in, uncomment the `aggregateRating` block in `components/BookSchema.tsx` to get star ratings in search results.
- [ ] Add an `opengraph-image.tsx` file in `app/` to auto-generate a branded share card.
- [ ] Add analytics (Vercel Analytics, Plausible, or Fathom are all privacy-friendly options).
- [ ] A/B test the Hero subhead and CTAs once you have traffic.

---

## Project Structure

```
book-site/
├── app/
│   ├── layout.tsx          # Fonts, metadata, JSON-LD injection
│   ├── page.tsx            # Section composition
│   ├── globals.css         # Design tokens + utilities
│   ├── sitemap.ts          # SEO
│   └── robots.ts           # SEO
├── components/
│   ├── BookSchema.tsx      # JSON-LD (Book + FAQPage + Breadcrumbs)
│   ├── Nav.tsx             # Sticky nav, mobile via <details>
│   ├── Hero.tsx            # H1, subtitle, book cover, CTAs, specs
│   ├── SocialProof.tsx     # Early-reader blurbs under hero
│   ├── Features.tsx        # The 5 parts as promise cards
│   ├── TableOfContents.tsx # Full TOC with leader dots
│   ├── Testimonials.tsx    # Large editorial pull quotes
│   ├── WhoFor.tsx          # For / Not For sharp qualification
│   ├── EmailCapture.tsx    # Free Chapter 1 (only 'use client')
│   ├── Authors.tsx         # Rich bios + outbound links
│   ├── FAQ.tsx             # 12 Q&A (exported for schema)
│   ├── Retailers.tsx       # Conversion destination
│   ├── StickyBuyBar.tsx    # Mobile persistent CTA
│   └── Footer.tsx          # Publisher credit + ISBN + legal
└── public/
    ├── cover.png           # ⚠️ Add book cover
    ├── og.png              # ⚠️ Add OG image
    ├── favicon.ico
    ├── apple-touch-icon.png
    └── authors/
        ├── jacob.jpg       # ⚠️ Add headshots
        ├── jerry.jpg
        └── danny.jpg
```

---

## Dependencies

Install these in your existing Next.js project:

```bash
npm install geist
```

For fonts: `next/font/google` imports are built-in. Geist is self-hosted; alternatively, use `import { GeistSans } from 'geist/font/sans'` for zero-config.

Tailwind v4 is assumed (note the `@import "tailwindcss";` and `@theme` block in `globals.css`). If you're on Tailwind v3, convert the `@theme` CSS tokens into `tailwind.config.ts` `theme.extend`.

---

## Sample email-capture API route

Drop this in `app/api/subscribe/route.ts`:

```ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  // Example: ConvertKit
  // await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ api_key: process.env.CONVERTKIT_API_KEY, email }),
  // });

  // Example: Resend (send the chapter PDF as an attachment)
  // await resend.emails.send({...});

  return NextResponse.json({ success: true });
}
```

---

## Design Notes

- The `'use client'` directive is only used in `EmailCapture.tsx` (form state). Everything else is server-rendered, which is what you wanted for SEO.
- `TableOfContents` and `FAQ` use native `<details>` elements for expand/collapse — zero client JS, fully accessible, indexable by Google.
- The mobile nav also uses `<details>` for the same reason.
- Ambient yellow glows are CSS-only (`.ambient-glow` class), not images. Cheap to render, no LCP cost.
- The noise overlay is a tiny inline SVG — sub-1KB, renders instantly.
- Font loading uses `next/font` with `display: swap` to avoid FOUT while keeping good Core Web Vitals.
- All animations respect `prefers-reduced-motion`.

---

## Questions, tweaks, ideas?

The copy, structure, and design are all open to iteration. Obvious next experiments:

1. A video trailer or podcast episode embed near the Hero.
2. A second email-capture near the bottom of the page with a different hook.
3. An "In the Press" or "As Seen On" logos bar once the book gets coverage.
4. A comparison block vs. other AI books ("How this is different from _Building LLMs for Production_ / _Generative Deep Learning_ / etc.").
