import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
  try {
    const { priceId } = await request.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    // STUDIOのオンボーディングURL
    const STUDIO_ONBOARDING_URL = process.env.NEXT_PUBLIC_STUDIO_ONBOARDING_URL;

    if (!STUDIO_ONBOARDING_URL) {
      console.error('STUDIO_ONBOARDING_URL is not set');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 7,
      },
      // STUDIOのオンボーディングページにリダイレクト
      success_url: `${STUDIO_ONBOARDING_URL}?session_id={CHECKOUT_SESSION_ID}&email={CUSTOMER_EMAIL}`,
      cancel_url: `${request.headers.get('origin')}/`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}