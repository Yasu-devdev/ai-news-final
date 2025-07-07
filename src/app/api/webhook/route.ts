import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// ▼▼▼ このブロックがエラーを解決する重要な部分です ▼▼▼
// Next.jsのデフォルトの本文解析を無効にし、Stripeが必要とする生の本文を受け取れるようにします。
export const config = {
  api: {
    bodyParser: false,
  },
};
// ▲▲▲ ここまで ▲▲▲

// Firebase Admin SDKを初期化（すでに初期化済みでない場合のみ）
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
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  // 'checkout.session.completed' イベントを処理します
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Stripeから顧客情報を取得し、メールアドレスを取り出す
    const customerDetails = await stripe.customers.retrieve(session.customer as string);
    const email = (customerDetails as Stripe.Customer).email;

    if (email) {
      try {
        // Firestoreの 'customers' コレクションに、顧客情報を保存する
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
