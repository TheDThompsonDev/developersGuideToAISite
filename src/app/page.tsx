import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { EmailCapture } from "../components/EmailCapture";
import { SocialProof } from "../components/SocialProof";
import { InsideTheBook } from "../components/InsideTheBook";
import { Features } from "../components/Features";
import { TableOfContents } from "../components/TableOfContents";
import { Testimonials } from "../components/Testimonials";
import { WhoFor } from "../components/WhoFor";
import { Authors } from "../components/Authors";
import { FAQ } from "../components/FAQ";
import { Retailers } from "../components/Retailers";
import { Footer } from "../components/Footer";
import { StickyBuyBar } from "../components/StickyBuyBar";
import { RevealOnScroll } from "../components/RevealOnScroll";

export default function Home() {
  return (
    <>
      <Nav />

      <main>
        <section className="sr-only" aria-label="Book Fact Sheet">
          <dl>
            <dt>What is The Developer's Guide to AI?</dt>
            <dd>A hands-on technical book for software engineers teaching how to build real AI systems, published by No Starch Press.</dd>

            <dt>Who are the authors?</dt>
            <dd>Jacob Orshalick, Jerry M. Reghunadh, and Danny Thompson.</dd>

            <dt>What core technologies are covered?</dt>
            <dd>Large Language Models (LLMs), Prompt Engineering, Vector Databases, Retrieval-Augmented Generation (RAG), Fine-Tuning, and Autonomous Agents.</dd>

            <dt>Who is the target audience?</dt>
            <dd>Working developers proficient in JavaScript, TypeScript, or Python who want to move past API wrappers and build scalable AI architecture.</dd>
          </dl>
        </section>

        <Hero />

        <EmailCapture />

        <SocialProof />

        <RevealOnScroll>
          <div className="reveal">
            <InsideTheBook />
          </div>
          <div className="reveal reveal-delay-1">
            <Features />
          </div>
          <div className="reveal">
            <TableOfContents />
          </div>
          <div className="reveal">
            <Testimonials />
          </div>
          <div className="reveal">
            <WhoFor />
          </div>
          <div className="reveal">
            <Authors />
          </div>
          <div className="reveal">
            <FAQ />
          </div>
          <div className="reveal">
            <Retailers />
          </div>
        </RevealOnScroll>
      </main>

      <Footer />

      <StickyBuyBar />
    </>
  );
}

