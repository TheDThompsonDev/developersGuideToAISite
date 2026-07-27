import { track as trackVercelEvent } from "@vercel/analytics";

type AnalyticsPrimitive = string | number | boolean | null | undefined;

type AnalyticsParams = Record<string, AnalyticsPrimitive>;
type PointerLikeEvent = Pick<MouseEvent, "clientX" | "clientY">;

const MAX_VERCEL_VALUE_LENGTH = 255;

function truncateVercelValue(value: AnalyticsPrimitive) {
  return typeof value === "string"
    ? value.slice(0, MAX_VERCEL_VALUE_LENGTH)
    : value;
}

function getVercelEventParams(
  eventName: string,
  params: AnalyticsParams,
): AnalyticsParams {
  const pick = (...keys: string[]) =>
    Object.fromEntries(
      keys
        .map((key) => [key, truncateVercelValue(params[key])] as const)
        .filter((entry) => entry[1] !== undefined),
    );

  switch (eventName) {
    case "page_top_view":
      return pick("page_path");
    case "section_view":
      return pick("section_id", "section_name");
    case "scroll_depth":
      return pick("scroll_depth_percent", "current_section");
    case "page_bottom_reached":
      return pick("page_path");
    case "link_click":
      return pick("link_href", "click_section");
    case "internal_nav_click":
      return pick("link_target", "click_section");
    case "buy_modal_open":
      return pick("buy_opener_placement", "current_section");
    case "buy_modal_close":
      return pick("close_method", "buy_opener_placement");
    case "retailer_click": {
      const clickPlacement = params.click_placement ?? "unknown";
      const openerPlacement = params.buy_opener_placement;

      return {
        ...pick("retailer"),
        conversion_source: truncateVercelValue(
          openerPlacement
            ? `${clickPlacement}:${openerPlacement}`
            : clickPlacement,
        ),
      };
    }
    case "newsletter_submit":
    case "newsletter_error":
    case "generate_lead":
      return pick("form_name", "lead_source");
    case "no_link_click_session":
      return pick("reason", "current_section");
    case "no_retailer_click_session":
      return pick("link_click_count", "current_section");
    default:
      return {};
  }
}

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

  trackVercelEvent(eventName, getVercelEventParams(eventName, params));

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", eventName, params]);
}
