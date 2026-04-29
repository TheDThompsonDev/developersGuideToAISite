import { NextResponse } from 'next/server';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .max(254, "Email is too long"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const { email } = result.data;

    console.log(`[subscribe] Stub: received email ${email}`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Subscription failed. Please try again.' },
      { status: 500 }
    );
  }
}

