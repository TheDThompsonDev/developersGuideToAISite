# Analytics Plan

The site sends page views and behavior events to both Vercel Web Analytics and GA4. GA4 uses measurement ID `G-PF014XM3E1` through `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

## Hosting Setup

In the Vercel project:

1. Open **Analytics** in the project sidebar.
2. Enable Web Analytics.
3. Redeploy the site so Vercel creates the analytics intake routes.

The site uses `@vercel/analytics` v2, which enables Resilient Intake. If Cloudflare proxies the production domain, make sure it forwards Vercel's analytics routes to the Vercel deployment, including `/_vercel/insights/*` and the unique intake path Vercel creates after deployment.

Set this variable in Vercel for Production, Preview, and Development:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PF014XM3E1
GA_MEASUREMENT_PROTOCOL_SECRET=<your GA4 Measurement Protocol API secret>
```

Cloudflare can stay as the DNS/proxy layer. The Google tag runs in the browser, so no Cloudflare DNS change is required.

Create the Measurement Protocol secret in Google Analytics:

1. Admin > Data collection and modification > Data streams.
2. Open the web stream for this site.
3. Events > Measurement Protocol API secrets.
4. Create a secret and save it in Vercel as `GA_MEASUREMENT_PROTOCOL_SECRET`.

## Vercel Web Analytics

Vercel automatically records page views, referrers, routes, countries, browsers, operating systems, and device types. The shared client tracker also forwards the site's custom events to Vercel without sending email addresses or other form values.

Custom events require a Pro or Enterprise Vercel plan. A standard Pro plan supports two properties per custom event, so Vercel receives the two most useful dimensions for each event while GA4 keeps the full payload:

| Event | Vercel properties |
| --- | --- |
| `page_top_view` | `page_path` |
| `section_view` | `section_id`, `section_name` |
| `scroll_depth` | `scroll_depth_percent`, `current_section` |
| `page_bottom_reached` | `page_path` |
| `link_click` | `link_href`, `click_section` |
| `internal_nav_click` | `link_target`, `click_section` |
| `buy_modal_open` | `buy_opener_placement`, `current_section` |
| `buy_modal_close` | `close_method`, `buy_opener_placement` |
| `retailer_click` | `retailer`, `conversion_source` |
| `newsletter_submit` | `form_name`, `lead_source` |
| `newsletter_error` | `form_name`, `lead_source` |
| `generate_lead` | `form_name`, `lead_source` |
| `newsletter_signup` | `form_name`, `lead_source` |
| `no_link_click_session` | `reason`, `current_section` |
| `no_retailer_click_session` | `link_click_count`, `current_section` |

`newsletter_signup` is sent from the server only after Resend creates the contact, making it the canonical signup conversion. Use `retailer_click` as the outbound purchase-intent conversion because the retailer completes the sale off-site.

In Vercel, open **Analytics > Events** and drill into:

- `link_click` to see destinations and the sections that generated clicks.
- `retailer_click` to compare retailers and CTA sources such as `buy_modal:hero_primary`.
- `newsletter_signup` to count confirmed signups by form and lead source.
- `section_view` and `scroll_depth` to see where visitors stop reading.
- `no_link_click_session` and `no_retailer_click_session` to quantify sessions without action.

## GA4 Settings

In Google Analytics, go to Admin > Data streams > Web stream > Enhanced measurement and enable:

- Page views
- Scrolls
- Outbound clicks
- Site search, if added later
- Form interactions
- File downloads

Mark these as key events:

- `generate_lead`
- `newsletter_signup`
- `retailer_click`
- `page_bottom_reached`
- `no_retailer_click_session`

## GA4 Custom Dimensions

GA4 collects event parameters, but most custom parameters do not become useful report columns until they are registered as event-scoped custom dimensions.

Go to Admin > Data display > Custom definitions > Create custom dimension and add these event-scoped dimensions:

| Dimension name | Event parameter |
| --- | --- |
| Link text | `link_text` |
| Link URL | `link_url` |
| Link href | `link_href` |
| Link type | `link_type` |
| Link category | `link_category` |
| Click section | `click_section` |
| Current section | `current_section` |
| Page region | `page_region` |
| Buy opener placement | `buy_opener_placement` |
| Click placement | `click_placement` |
| Retailer | `retailer` |
| Retailer URL | `retailer_url` |
| Lead source | `lead_source` |
| Form name | `form_name` |
| Signup status | `signup_status` |
| Event source | `event_source` |
| Reason | `reason` |

For numeric analysis, add these custom metrics:

| Metric name | Event parameter |
| --- | --- |
| Scroll percent | `scroll_percent` |
| Scroll depth percent | `scroll_depth_percent` |
| Link click count | `link_click_count` |
| Retailer click count | `retailer_click_count` |
| Click X percent | `click_x_percent` |
| Click Y percent | `click_y_percent` |

Use Realtime and DebugView to validate events immediately. Standard reports and newly registered custom dimensions can take time to populate.

## Custom Events

| Event | What it answers |
| --- | --- |
| `page_top_view` | Visitor reached the page and started at the top. |
| `section_view` | Which sections were actually viewed. |
| `scroll_depth` | Whether people reached 25%, 50%, 75%, 90%, or 100%. |
| `page_bottom_reached` | Whether people reached the bottom of the page. |
| `link_click` | Every clicked link, including section nav, author links, publisher links, and retailer links. |
| `internal_nav_click` | Which in-page links people use. |
| `buy_modal_open` | Which buy button opened the retailer modal. |
| `buy_modal_close` | Whether people close the buy modal before choosing. |
| `retailer_click` | Which retailer link was clicked and from where. |
| `no_link_click_session` | The visitor left or hid the page without clicking any link. |
| `no_retailer_click_session` | The visitor left or hid the page without clicking Amazon, No Starch, or Barnes & Noble. |
| `newsletter_submit` | Lead form attempt without sending any email address to GA. |
| `newsletter_error` | Failed lead form attempt. |
| `generate_lead` | Successful newsletter/sample-chapter signup. |
| `newsletter_signup` | Server-side confirmation that `/api/newsletter` created the signup. |

## Useful Parameters

Most custom events include:

- `current_section`
- `page_region`: `top`, `middle`, or `bottom`
- `scroll_percent`
- `viewport_top_px`
- `click_x_px`, `click_y_px`
- `click_x_percent`, `click_y_percent`
- `link_text`
- `link_url`
- `link_type`: `internal_anchor`, `internal_page`, `outbound`, or `same_page`
- `link_category`: `section_nav`, `retailer`, `author`, `publisher`, `external`, or `internal`
- `link_click_count`
- `retailer_click_count`

Buy events also include:

- `buy_opener_placement`: `nav_desktop`, `nav_mobile`, `hero_primary`, or `sticky_buy_bar`
- `click_placement`: `buy_modal` or `retailers_section`
- `retailer`
- `retailer_url`

This lets GA answer questions like: "Did someone click Buy the Book from the navbar while reading FAQ?" or "Do retailer clicks mostly happen from the sticky bar modal or the retailer section?"

## Suggested GA4 Explorations

Create a funnel exploration:

1. `page_top_view`
2. `section_view` where `section_id` is `chapter1`
3. `buy_modal_open`
4. `retailer_click`

Create a second funnel:

1. `page_top_view`
2. `section_view` where `section_id` is `chapter1`
3. `generate_lead`

Create a free-form table with rows:

- `link_category`
- `link_text`
- `link_url`
- `click_section`
- `current_section`

Use `eventCount` as the value and filter to `link_click`.

Create another free-form table with rows:

- `buy_opener_placement`
- `current_section`
- `page_region`
- `retailer`

Use `eventCount` as the value and filter to `retailer_click`.

Create a clicked-vs-not-clicked scorecard:

- `link_click`
- `no_link_click_session`
- `retailer_click`
- `no_retailer_click_session`
