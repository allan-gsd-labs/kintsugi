import { getMailingListProvider } from '@/lib/mailing-list/provider';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const requestCounts = new Map<string, RateLimitEntry>();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getClientIp = (request: Request) => {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown';
  }

  return request.headers.get('x-real-ip') ?? 'unknown';
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const existing = requestCounts.get(ip);

  if (!existing || now >= existing.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    return true;
  }

  existing.count += 1;
  requestCounts.set(ip, existing);
  return false;
};

const parseEmail = (value: unknown) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().toLowerCase();
};

const isValidEmail = (email: string) =>
  email.length > 3 && email.length <= 254 && EMAIL_PATTERN.test(email);

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return Response.json(
      { ok: false, error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const payload = (body ?? {}) as Record<string, unknown>;
  const email = parseEmail(payload.email);
  const honeypot = typeof payload.website === 'string' ? payload.website.trim() : '';
  const source = typeof payload.source === 'string' ? payload.source.trim() : undefined;

  if (honeypot) {
    return Response.json({ ok: true });
  }

  if (!isValidEmail(email)) {
    return Response.json(
      { ok: false, error: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }

  try {
    const provider = getMailingListProvider();
    await provider.subscribe({ email, source });
    return Response.json({ ok: true });
  } catch (error) {
    console.error('[mailing-list] subscription failed', error);
    return Response.json(
      { ok: false, error: 'Unable to subscribe right now. Try again shortly.' },
      { status: 500 },
    );
  }
}

