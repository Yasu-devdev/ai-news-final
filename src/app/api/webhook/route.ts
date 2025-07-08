import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { buffer } from 'micro';
import { createRouter, post } from 'micro-method-router';

// ▼▼▼ ここからが新しい部分です ▼▼▼
// Next.jsのBody Parserを無効化するための設定
export const config = {
  api: {
    bodyParser: false,
  },
};

// Firebase Admin SDKの初期化
if (!getApps().length) {
  initializeApp();
}
const db = getFirestore();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Webhookを処理するハンドラ関数
const webhookHandler = async (req: NextRequest) => {
  const sig = req.headers.get('stripe-signature');
  // microライブラリを使って、安全にリクエストボディを取得
  const buf = await buffer(req as any);

  if (!sig || !webhookSecret) {
    console.error('❌ Webhook secret or signature is missing.');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // イベント処理
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
};

// ルーターを作成し、POSTリクエストをハンドラに紐付ける
const router = createRouter();
router.add(post(webhookHandler));

// Next.jsが呼び出すメインの関数
export async function POST(req: NextRequest) {
  return router.handle(req);
}
