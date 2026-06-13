type AnalyticsPrimitive = string | number | boolean | null | undefined;

type AnalyticsParams = Record<string, AnalyticsPrimitive>;
type PointerLikeEvent = Pick<MouseEvent, "clientX" | "clientY">;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: "event",
      eventName: string,
      eventParams?: AnalyticsParams
    ) => void;
  }
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-PF014XM3E1";

function getSectionName(element: HTMLElement): string {
  return (
    element.dataset.analyticsSection ||
    element.id ||
    element.getAttribute("aria-label") ||
    element.tagName.toLowerCase()
  );
}

export function getCurrentSection(): string {
  if (typeof window === "undefined") return "server";

  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(
      "[data-analytics-section], main section[id], footer"
    )
  );

  if (sections.length === 0) return "unknown";

  const midpoint = window.innerHeight / 2;
  const containingSection = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= midpoint && rect.bottom >= midpoint;
  });

  if (containingSection) return getSectionName(containingSection);

  const nearestSection = sections.reduce<HTMLElement | null>((nearest, section) => {
    if (!nearest) return section;

    const sectionCenter = section.getBoundingClientRect().top + section.offsetHeight / 2;
    const nearestCenter = nearest.getBoundingClientRect().top + nearest.offsetHeight / 2;

    return Math.abs(sectionCenter - midpoint) < Math.abs(nearestCenter - midpoint)
      ? section
      : nearest;
  }, null);

  return nearestSection ? getSectionName(nearestSection) : "unknown";
}

export function getScrollContext(): AnalyticsParams {
  if (typeof window === "undefined") return {};

  const documentElement = document.documentElement;
  const scrollY = Math.max(window.scrollY, documentElement.scrollTop, 0);
  const scrollableHeight = Math.max(
    documentElement.scrollHeight - window.innerHeight,
    1
  );
  const scrollPercent = Math.min(
    100,
    Math.max(0, Math.round((scrollY / scrollableHeight) * 100))
  );

  return {
    current_section: getCurrentSection(),
    page_region:
      scrollPercent <= 15 ? "top" : scrollPercent >= 85 ? "bottom" : "middle",
    scroll_percent: scrollPercent,
    viewport_top_px: Math.round(scrollY),
    viewport_height_px: window.innerHeight,
    page_path: window.location.pathname,
    page_title: document.title,
  };
}

export function getClickContext(event: PointerLikeEvent): AnalyticsParams {
  if (typeof window === "undefined") return {};

  return {
    click_x_px: Math.round(event.clientX),
    click_y_px: Math.round(event.clientY),
    click_x_percent: Math.round((event.clientX / window.innerWidth) * 100),
    click_y_percent: Math.round((event.clientY / window.innerHeight) * 100),
    viewport_width_px: window.innerWidth,
    viewport_height_px: window.innerHeight,
  };
}

export function trackEvent(
  eventName: string,
  eventParams: AnalyticsParams = {}
) {
  if (typeof window === "undefined") return;

  const params = {
    ...getScrollContext(),
    ...eventParams,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", eventName, params]);
}
