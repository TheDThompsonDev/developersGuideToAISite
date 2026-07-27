type LeadEventInput = {
  formName: string;
  leadSource: string;
  status?: string;
};

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-PF014XM3E1";
const GA_API_SECRET = process.env.GA_MEASUREMENT_PROTOCOL_SECRET;

function parseCookieHeader(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};

  return cookieHeader.split(";").reduce<Record<string, string>>((cookies, part) => {
    const [rawName, ...rawValue] = part.trim().split("=");
    if (!rawName) return cookies;

    cookies[rawName] = decodeURIComponent(rawValue.join("="));
    return cookies;
  }, {});
}

function getGaClientId(request: Request): string {
  const cookies = parseCookieHeader(request.headers.get("cookie"));
  const gaCookie = cookies._ga;

  if (gaCookie) {
    const parts = gaCookie.split(".");
    const clientId = parts.slice(-2).join(".");

    if (/^\d+\.\d+$/.test(clientId)) {
      return clientId;
    }
  }

  return `${Date.now()}.${Math.floor(Math.random() * 1_000_000_000)}`;
}

export async function trackNewsletterSignup(
  request: Request,
  { formName, leadSource, status = "success" }: LeadEventInput,
) {
  if (!GA_API_SECRET) {
    console.info(
      "[analytics] Skipping server-side GA lead event: GA_MEASUREMENT_PROTOCOL_SECRET is not set.",
    );
    return;
  }

  const endpoint = new URL("https://www.google-analytics.com/mp/collect");
  endpoint.searchParams.set("measurement_id", GA_MEASUREMENT_ID);
  endpoint.searchParams.set("api_secret", GA_API_SECRET);

  const payload = {
    client_id: getGaClientId(request),
    non_personalized_ads: true,
    events: [
      {
        name: "generate_lead",
        params: {
          form_name: formName,
          lead_source: leadSource,
          signup_status: status,
          event_source: "server",
        },
      },
      {
        name: "newsletter_signup",
        params: {
          form_name: formName,
          lead_source: leadSource,
          signup_status: status,
          event_source: "server",
        },
      },
    ],
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(
        `[analytics] GA Measurement Protocol failed with status ${response.status}.`,
      );
    }
  } catch (error) {
    console.error("[analytics] GA Measurement Protocol error:", error);
  }
}
