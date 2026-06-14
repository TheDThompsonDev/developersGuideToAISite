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

function getLinkType(anchor: HTMLAnchorElement): string {
  const href = anchor.getAttribute("href") || "";

  if (href.startsWith("#")) return "internal_anchor";
  if (anchor.hostname && anchor.hostname !== window.location.hostname) {
    return "outbound";
  }
  if (anchor.pathname !== window.location.pathname) return "internal_page";

  return "same_page";
}

function getLinkCategory(anchor: HTMLAnchorElement): string {
  const hostname = anchor.hostname.toLowerCase();
  const pathname = anchor.pathname.toLowerCase();
  const href = anchor.getAttribute("href") || "";

  if (href.startsWith("#")) return "section_nav";
  if (
    hostname.includes("amazon.") ||
    hostname.includes("nostarch.com") ||
    hostname.includes("barnesandnoble.com") ||
    pathname.includes("1718504764") ||
    pathname.includes("developers-guide-to-ai")
  ) {
    return "retailer";
  }
  if (
    hostname.includes("focus.dev") ||
    hostname.includes("jerrymannel.me") ||
    hostname.includes("dthompsondev.com")
  ) {
    return "author";
  }
  if (hostname.includes("nostarch.com")) return "publisher";

  return anchor.hostname && anchor.hostname !== window.location.hostname
    ? "external"
    : "internal";
}

export function AnalyticsTracker() {
  const observedDepths = useRef(new Set<number>());
  const observedSections = useRef(new Set<string>());
  const observedBottom = useRef(false);
  const linkClickCount = useRef(0);
  const retailerLinkClickCount = useRef(0);
  const hasReportedNoLinkClick = useRef(false);
  const hasReportedNoRetailerClick = useRef(false);

  useEffect(() => {
    trackEvent("page_top_view", {
      scroll_depth_percent: 0,
    });

    const reportExitClickSummary = () => {
      if (linkClickCount.current === 0 && !hasReportedNoLinkClick.current) {
        hasReportedNoLinkClick.current = true;
        trackEvent("no_link_click_session", {
          link_click_count: 0,
          reason: "page_hidden_or_unloaded",
          transport_type: "beacon",
        });
      }

      if (
        retailerLinkClickCount.current === 0 &&
        !hasReportedNoRetailerClick.current
      ) {
        hasReportedNoRetailerClick.current = true;
        trackEvent("no_retailer_click_session", {
          retailer_click_count: 0,
          link_click_count: linkClickCount.current,
          reason: "page_hidden_or_unloaded",
          transport_type: "beacon",
        });
      }
    };

    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const linkType = getLinkType(anchor);
      const linkCategory = getLinkCategory(anchor);
      const linkText = getLinkText(anchor);
      const clickSection = getAnalyticsSection(anchor);

      linkClickCount.current += 1;
      if (linkCategory === "retailer") {
        retailerLinkClickCount.current += 1;
      }

      trackEvent("link_click", {
        link_text: linkText,
        link_url: anchor.href,
        link_href: href,
        link_type: linkType,
        link_category: linkCategory,
        click_section: clickSection,
        link_click_count: linkClickCount.current,
        retailer_click_count: retailerLinkClickCount.current,
        ...getClickContext(event),
      });

      if (linkType === "internal_anchor") {
        const targetSection = href.replace("#", "") || "top";

        trackEvent("internal_nav_click", {
          link_text: linkText,
          link_target: targetSection,
          click_section: clickSection,
          link_click_count: linkClickCount.current,
          ...getClickContext(event),
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        reportExitClickSummary();
      }
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", reportExitClickSummary);

    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", reportExitClickSummary);
    };
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
