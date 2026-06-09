import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "mail@dthompsondev.com";
const MAX_BODY_BYTES = 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const EMAIL_COOLDOWN_MS = 15 * 60 * 1000;

const requestBuckets = new Map<string, { count: number; resetAt: number }>();
const emailCooldowns = new Map<string, number>();

const newsletterSchema = z.object({
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  website: z.string().max(100).optional(),
});

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const bucket = requestBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    requestBuckets.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_REQUESTS_PER_WINDOW;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 415 },
      );
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Request is too large" },
        { status: 413 },
      );
    }

    const clientIp = getClientIp(request);
    if (isRateLimited(`ip:${clientIp}`)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Request is too large" },
        { status: 413 },
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 },
      );
    }

    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "A valid email is required" },
        { status: 400 },
      );
    }

    const { email, website } = result.data;
    if (website) {
      return NextResponse.json({ success: true });
    }

    const now = Date.now();
    const emailCooldownUntil = emailCooldowns.get(email);
    if (emailCooldownUntil && emailCooldownUntil > now) {
      return NextResponse.json(
        { error: "Please wait before requesting another copy." },
        { status: 429 },
      );
    }
    // Add contact to Resend list
    const { data, error } = await resend.contacts.create({
      email,
      unsubscribed: false,
    });

    if (error) {
      console.error("Resend API Error:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 },
      );
    }

    emailCooldowns.set(email, now + EMAIL_COOLDOWN_MS);

    // Send chapters 1 & 2 as a PDF attachment
    const pdfPath = path.join(
      process.cwd(),
      "public",
      "DevelopersGuideChapters1&2.pdf",
    );
    const pdfBuffer = fs.readFileSync(pdfPath);

    const { error: emailError } = await resend.emails.send({
      from: `The Developer's Guide to AI <${FROM_EMAIL}>`,
      to: email,
      subject: "Your free chapters are here — The Developer's Guide to AI",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #000;">
          <div style="border-bottom: 4px solid #000; padding-bottom: 16px; margin-bottom: 32px;">
            <div style="display: inline-block; background: #fae37d; color: #000; padding: 4px 10px; font-size: 11px; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; font-family: monospace;">
              AI
            </div>
            <span style="font-size: 18px; font-weight: 700; margin-left: 12px;">
              The Developer's Guide to AI
            </span>
          </div>

          <h1 style="font-size: 28px; font-weight: 700; line-height: 1.2; margin: 0 0 16px 0;">
            Chapters 1 &amp; 2 are attached.
          </h1>

          <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0 0 24px 0;">
            Thanks for your interest in <strong>The Developer's Guide to AI: From Prompts to Agents</strong>.
            We've attached the first two chapters so you can see exactly what's inside before committing.
          </p>

          <div style="background: #f8f8f8; border-left: 4px solid #fae37d; padding: 16px 20px; margin: 0 0 24px 0;">
            <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">What you'll find:</p>
            <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;">
              ✓ Understanding LLMs internally<br/>
              ✓ Real code samples you can run today<br/>
              ✓ The companion code repository
            </p>
          </div>

          <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0 0 32px 0;">
            28 pages. 15 minute read. No fluff, just the architecture decisions that matter.
          </p>

          <a href="https://www.amazon.com/dp/1718504764" style="display: inline-block; background: #fae37d; color: #000; padding: 14px 28px; font-weight: 700; text-decoration: none; font-size: 14px; letter-spacing: 0.05em; text-transform: uppercase; font-family: monospace;">
            GET THE FULL BOOK →
          </a>

          <div style="margin-top: 48px; padding-top: 24px; border-top: 2px solid #eee; font-size: 12px; color: #999; line-height: 1.5;">
            <p style="margin: 0;">
              By Jacob Orshalick, Jerry M. Reghunadh &amp; Danny Thompson<br/>
              Published by No Starch Press, 2026
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: "DevelopersGuideToAI-Chapters-1-and-2.pdf",
          content: pdfBuffer,
        },
      ],
    });

    if (emailError) {
      console.error("Email send error:", JSON.stringify(emailError, null, 2));
      // Contact was still created — don't fail the whole request
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
