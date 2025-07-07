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
  const buf = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    // ▼▼▼ ここからがデバッグ用の追加コードです ▼▼▼
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    
    // Vercelが実際にどのシークレットキーを認識しているか、末尾6桁だけをログに出力します
    const displayedSecret = process.env.STRIPE_WEBHOOK_SECRET
      ? `...${process.env.STRIPE_WEBHOOK_SECRET.slice(-6)}`
      : 'UNDEFINED or NOT SET';

    console.error(`SECRET RECEIVED BY VERCE: ${displayedSecret}`);
    // ▲▲▲ ここまでがデバッグ用の追加コードです ▲▲▲

    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerDetails = await stripe.customers.retrieve(session.customer as string);
    const email = (customerDetails as Stripe.Customer).email;

    if (email) {
      try {
        await db.collection('customers').doc(email).set({
          email: email,
          stripeCustomerId: session.customer,
          subscriptionStatus: 'active',
          createdAt: new Date(),
        });
        console.log(`✅ Customer ${email} saved to Firestore.`);
      } catch (dbError) {
        console.error(`🔥 Firestore write error: ${dbError}`);
      }
    }
  }

  return NextResponse.json({ received: true });
}