import Link from "next/link";
import Image from "next/image";

const authors = [
  {
    name: "Danny Thompson",
    photo: "/danny.png",
    accentColor: "#01ff88",
    lede: "From frying chicken at a gas station to Fortune 500 and beyond.",
    bio: `Accomplished software developer with a proven track record of success in the tech industry. Former Director, Senior Developer, Community Leader, and now Author. One of the most recognized community voices in growing your technical skills in the field of software engineering. Host of the globally top-ranked The Programming Podcast. Organizer of the Commit Your Code Conference for Charity and the Dallas Software Developers meetup. Keynote speaker at international conferences.`,
    site: { label: "dthompsondev.com", href: "https://dthompsondev.com" },
    credentials: [
      "The Programming Podcast",
      "Commit Your Code organizer",
      "Delivered 200+ technical talks",
    ],
  },
  {
    name: "Jacob Orshalick",
    photo: "/jacob.webp",
    accentColor: "#D4A843",
    lede: "Software architect, independent consultant, and long-time Java EE voice.",
    bio: `Over two decades in software development. Former PhD research assistant, now 16+ years as an independent consultant. Has built solutions for startups, Fortune 500s, and everything in between. Co-author of Seam Framework: Experience the Evolution of Java EE. Award-winning open source contributor. Speaks regularly at conferences.`,
    site: { label: "focus.dev", href: "https://focus.dev" },
    credentials: [
      "Prior book: Seam Framework",
      "Conference speaker",
      "20+ years building software",
    ],
  },
  {
    name: "Jerry M. Reghunadh",
    photo: "/jerry.png",
    accentColor: "#D45A3C",
    lede: "Senior director, systems architect, and relentless curiosity-driven engineer.",
    bio: `Over two decades spanning QA automation, product engineering, and architectural leadership. Senior director at a global product organization, where he architects complex solutions and ships products at scale. International conference speaker. Firm believer that writing quality code on bare-bones hardware is an art form. Avid Formula 1 fan.`,
    site: { label: "jerrymannel.me", href: "https://jerrymannel.me" },
    credentials: [
      "Senior director",
      "International speaker",
      "20+ years engineering",
    ],
  },
];

export function Authors() {
  return (
    <section
      id="authors"
      className="relative py-28 lg:py-36 border-b border-ink-3"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <p className="kicker mb-5">The Authors</p>
          <h2 className="font-display text-5xl lg:text-6xl text-bone leading-[1.05]">
            Three engineers.
            <br />
            <em className="font-display-italic text-signal">
              Over fifty years combined
            </em>{" "}
            in the field.
          </h2>
        </div>

        <div className="space-y-px bg-ink-3 border border-ink-3">
          {authors.map((author) => (
            <article
              key={author.name}
              className="grid lg:grid-cols-12 gap-6 lg:gap-10 bg-ink p-8 lg:p-12 hover:bg-ink-2 transition-colors"
            >
              <div className="lg:col-span-3">
                <div
                  className="relative aspect-square w-32 lg:w-full max-w-[220px] border border-ink-3 overflow-hidden"
                  style={{
                    boxShadow: `8px 8px 0px ${author.accentColor}55`,
                  }}
                >
                  <Image
                    src={author.photo}
                    alt={`Portrait of ${author.name}, co-author of The Developer's Guide to AI book`}
                    fill
                    sizes="(max-width: 1024px) 128px, 220px"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 pointer-events-none z-10">
                    <div
                      className="absolute top-0 left-0 w-12 h-0.5"
                      style={{
                        backgroundColor: author.accentColor,
                        opacity: 1,
                      }}
                    />
                    <div
                      className="absolute top-0 left-0 h-12 w-0.5"
                      style={{
                        backgroundColor: author.accentColor,
                        opacity: 1,
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-12 h-0.5"
                      style={{
                        backgroundColor: author.accentColor,
                        opacity: 1,
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 h-12 w-0.5"
                      style={{
                        backgroundColor: author.accentColor,
                        opacity: 1,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <h3 className="font-display text-3xl lg:text-4xl text-bone mb-2">
                  {author.name}
                </h3>
                <p className="font-display-italic text-xl text-signal mb-5">
                  {author.lede}
                </p>
                <p className="text-bone-muted leading-relaxed">{author.bio}</p>

                <div className="mt-6">
                  <Link
                    href={author.site.href}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 font-mono text-sm text-bone hover:text-signal transition-colors"
                  >
                    {author.site.label}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-3 lg:border-l lg:border-ink-3 lg:pl-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash mb-3">
                  Notable
                </div>
                <ul className="space-y-2">
                  {author.credentials.map((c) => (
                    <li key={c} className="text-sm text-bone-muted flex gap-3">
                      <span className="text-signal">·</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
