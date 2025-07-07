import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin SDKを初期化（すでに初期化済みでない場合のみ）
if (!getApps().length) {
  // Workload Identity 連携を使用しているため、認証情報は不要です。
  // Google Cloud環境で実行されると、自動で認証されます。
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
        // ▼▼▼ ここが新しい処理 ▼▼▼
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
        // ここでエラーが発生しても、Stripeには成功を返すのが一般的です
      }
    }
  }

  return NextResponse.json({ received: true });
}