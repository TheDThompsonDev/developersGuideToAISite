import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isValidEmail } from "@/lib/validation";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "mail@dthompsondev.com";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email is required" },
        { status: 400 },
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
