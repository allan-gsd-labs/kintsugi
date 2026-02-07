import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'Checkout is not implemented in v1. Stripe is currently mocked.' },
    { status: 501 }
  );
}
