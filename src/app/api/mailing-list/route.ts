import { NextRequest, NextResponse } from 'next/server';

type MailingPayload = {
  email?: string;
  company?: string;
};

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const rateLimitState = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isRateLimited(key: string, now: number) {
  const current = rateLimitState.get(key);
  if (!current || current.resetAt <= now) {
    rateLimitState.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (current.count >= MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  rateLimitState.set(key, current);
  return false;
}

export async function POST(request: NextRequest) {
  const now = Date.now();
  const key = getClientKey(request);

  if (isRateLimited(key, now)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429 }
    );
  }

  let payload: MailingPayload;
  try {
    payload = (await request.json()) as MailingPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
  }

  const email = payload.email?.trim().toLowerCase() ?? '';
  const company = payload.company?.trim() ?? '';

  if (company.length > 0) {
    return NextResponse.json({ message: 'Thanks for subscribing.' }, { status: 200 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const provider = process.env.MAILING_LIST_PROVIDER || 'console';

  if (provider !== 'console') {
    return NextResponse.json(
      { error: 'Configured mailing list provider is not supported in v1.' },
      { status: 501 }
    );
  }

  console.info('[mailing-list] subscription', { email, provider, at: new Date().toISOString() });

  return NextResponse.json({ message: 'Thanks for subscribing.' }, { status: 200 });
}
