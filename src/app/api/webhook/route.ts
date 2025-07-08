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

    if (!sig || !webhookSecret) {
      console.error('❌ Webhook secret or signature is missing.');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      const payload = Buffer.from(buf);
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } catch (err: any) {
      console.error(`❌ Webhook signature verification failed: ${err.message}`);
      
      // ▼▼▼【重要】ここからがデバッグ用のコードです ▼▼▼
      // このコードは、署名検証が失敗した場合でも、テストのために処理を続行します。
      // 本番環境では、このセキュリティバイパスは絶対に削除してください。
      console.log('⚠️ Bypassing signature verification for a single debug session.');
      try {
        event = JSON.parse(Buffer.from(buf).toString());
      } catch (jsonError) {
        console.error('❌ Failed to parse webhook payload for debugging.', jsonError);
        return NextResponse.json({ error: 'Failed to parse payload' }, { status: 400 });
      }
      // ▲▲▲ ここまでがデバッグ用のコードです ▲▲▲
    }

    console.log(`✅ Event processed (Verification status may be bypassed). Event type: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      try {
        // Stripe APIから直接顧客情報を取得するのではなく、セッション情報から取得します
        const email = session.customer_details?.email;

        if (email) {
          await db.collection('customers').doc(email).set({
            email: email,
            stripeCustomerId: session.customer,
            subscriptionStatus: 'active',
            createdAt: new Date(),
          });
          console.log(`✅ Customer ${email} saved to Firestore.`);
        } else {
          console.log('⚠️ No email found in checkout session details');
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
