import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
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

    if (!sig) {
      console.error('❌ Missing stripe-signature header');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    if (!webhookSecret) {
      console.error('❌ Missing STRIPE_WEBHOOK_SECRET environment variable');
      return NextResponse.json({ error: 'Missing webhook secret' }, { status: 500 });
    }

    let event: Stripe.Event;

    try {
      // ▼▼▼ ここが最後の修正点です ▼▼▼
      // arrayBufferを、Stripe SDKが期待するBuffer型に変換します。
      const payload = Buffer.from(buf);
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } catch (err: any) {
      console.error(`❌ Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
    }

    console.log(`✅ Webhook verified successfully. Event type: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      try {
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
        } else {
          console.log('⚠️ No email found for customer');
        }
      } catch (dbError) {
        console.error(`🔥 Firestore write error: ${dbError}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Unexpected error in webhook handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
