"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function StickyBuyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none flex justify-center lg:justify-end lg:items-end lg:p-8">
      <div className="pointer-events-auto w-full lg:w-auto bg-ink border-2 border-signal shadow-[8px_8px_0px_#fae37d] p-4 flex items-center justify-between lg:justify-center gap-6 rise">
        <div className="hidden lg:block">
          <div className="font-display text-xl text-bone leading-none uppercase">
            The Developer's Guide to AI
          </div>
          <div className="font-mono text-xs text-signal mt-1 uppercase tracking-widest">
            Available Now
          </div>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="font-mono text-sm text-bone font-bold">$59</div>
          <Link
            href="#retailers"
            className="cta-brutal cta-brutal-primary px-6 py-3 text-sm flex-1 lg:flex-none text-center"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}

