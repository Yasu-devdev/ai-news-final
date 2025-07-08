import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin SDKを初期化
if (!getApps().length) {
  // Workload Identity 連携とGCLOUD_PROJECT環境変数により、自動で認証されます
  initializeApp();
}
const db = getFirestore();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const buf = await req.arrayBuffer();
    const sig = req.headers.get('stripe-signature');

    if (!sig || !webhookSecret) {
      return NextResponse.json({ error: 'Webhook secret or signature is missing.' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      const payload = Buffer.from(buf);
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } catch (err: any) {
      console.error(`❌ Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerDetails = await stripe.customers.retrieve(session.customer as string);
      const email = (customerDetails as Stripe.Customer).email;

      if (email) {
        await db.collection('customers').doc(email).set({
          email: email,
          stripeCustomerId: session.customer,
          subscriptionStatus: 'active',
          createdAt: new Date(),
        });
        console.log(`✅ Customer ${email} saved to Firestore.`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Unexpected error in webhook handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
