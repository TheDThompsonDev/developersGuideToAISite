# Analytics Plan

The site uses GA4 measurement ID `G-PF014XM3E1` through `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

## Hosting Setup

Set this variable in Vercel for Production, Preview, and Development:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PF014XM3E1
```

Cloudflare can stay as the DNS/proxy layer. The Google tag runs in the browser, so no Cloudflare DNS change is required.

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
- `retailer_click`
- `page_bottom_reached`

## Custom Events

| Event | What it answers |
| --- | --- |
| `page_top_view` | Visitor reached the page and started at the top. |
| `section_view` | Which sections were actually viewed. |
| `scroll_depth` | Whether people reached 25%, 50%, 75%, 90%, or 100%. |
| `page_bottom_reached` | Whether people reached the bottom of the page. |
| `internal_nav_click` | Which in-page links people use. |
| `buy_modal_open` | Which buy button opened the retailer modal. |
| `buy_modal_close` | Whether people close the buy modal before choosing. |
| `retailer_click` | Which retailer link was clicked and from where. |
| `newsletter_submit` | Lead form attempt without sending any email address to GA. |
| `newsletter_error` | Failed lead form attempt. |
| `generate_lead` | Successful newsletter/sample-chapter signup. |

## Useful Parameters

Most custom events include:

- `current_section`
- `page_region`: `top`, `middle`, or `bottom`
- `scroll_percent`
- `viewport_top_px`
- `click_x_px`, `click_y_px`
- `click_x_percent`, `click_y_percent`

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

- `buy_opener_placement`
- `current_section`
- `page_region`
- `retailer`

Use `eventCount` as the value and filter to `retailer_click`.
