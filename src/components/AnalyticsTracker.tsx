"use client";

import { useEffect, useRef } from "react";
import { getClickContext, trackEvent } from "../lib/analytics";

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  chapter1: "Free Chapter",
  "social-proof": "Social Proof",
  excerpt: "Inside the Book",
  features: "Features",
  contents: "Table of Contents",
  testimonials: "Testimonials",
  audience: "Audience",
  authors: "Authors",
  faq: "FAQ",
  retailers: "Retailers",
  newsletter: "Newsletter",
  footer: "Footer",
};

function getAnalyticsSection(element: HTMLElement): string {
  const section = element.closest<HTMLElement>(
    "[data-analytics-section], main section[id], footer"
  );

  if (!section) return "unknown";
  return section.dataset.analyticsSection || section.id || section.tagName.toLowerCase();
}

function getLinkText(anchor: HTMLAnchorElement): string {
  return anchor.textContent?.replace(/\s+/g, " ").trim().slice(0, 80) || "unknown";
}

export function AnalyticsTracker() {
  const observedDepths = useRef(new Set<number>());
  const observedSections = useRef(new Set<string>());
  const observedBottom = useRef(false);

  useEffect(() => {
    trackEvent("page_top_view", {
      scroll_depth_percent: 0,
    });

    const handleInternalLinkClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const targetSection = anchor.getAttribute("href")?.replace("#", "") || "top";

      trackEvent("internal_nav_click", {
        link_text: getLinkText(anchor),
        link_target: targetSection,
        click_section: getAnalyticsSection(anchor),
        ...getClickContext(event),
      });
    };

    document.addEventListener("click", handleInternalLinkClick, { capture: true });
    return () => document.removeEventListener("click", handleInternalLinkClick, { capture: true });
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-analytics-section], main section[id], footer"
      )
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.45) continue;

          const section = entry.target as HTMLElement;
          const sectionId =
            section.dataset.analyticsSection ||
            section.id ||
            section.tagName.toLowerCase();

          if (observedSections.current.has(sectionId)) continue;

          observedSections.current.add(sectionId);
          trackEvent("section_view", {
            section_id: sectionId,
            section_name: SECTION_LABELS[sectionId] ?? sectionId,
            visible_percent: Math.round(entry.intersectionRatio * 100),
          });
        }
      },
      {
        rootMargin: "-10% 0px -20% 0px",
        threshold: [0.45, 0.65],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const thresholds = [25, 50, 75, 90, 100];
    let animationFrame = 0;

    const reportScrollDepth = () => {
      animationFrame = 0;

      const documentElement = document.documentElement;
      const scrollableHeight = Math.max(
        documentElement.scrollHeight - window.innerHeight,
        1
      );
      const scrollPercent = Math.min(
        100,
        Math.round((window.scrollY / scrollableHeight) * 100)
      );

      for (const threshold of thresholds) {
        if (
          scrollPercent >= threshold &&
          !observedDepths.current.has(threshold)
        ) {
          observedDepths.current.add(threshold);
          trackEvent("scroll_depth", {
            scroll_depth_percent: threshold,
          });
        }
      }

      const hasReachedBottom =
        window.scrollY + window.innerHeight >= documentElement.scrollHeight - 8;

      if (hasReachedBottom && !observedBottom.current) {
        observedBottom.current = true;
        trackEvent("page_bottom_reached", {
          scroll_depth_percent: 100,
        });
      }
    };

    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(reportScrollDepth);
    };

    reportScrollDepth();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
