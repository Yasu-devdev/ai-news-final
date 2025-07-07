import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// このAPIが正しくStripeからのものであることを確認するための「秘密の合言葉」
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

  // 今回は 'checkout.session.completed' というイベントだけを処理します
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // 決済が成功した顧客のメールアドレスを取得
    const customerDetails = await stripe.customers.retrieve(session.customer as string);
    const email = (customerDetails as Stripe.Customer).email;

    // TODO: ここで、取得したemailをGoogle Sheetsに書き出す処理を後で追加します
    console.log(`✅ Payment successful for: ${email}`);
  }

  return NextResponse.json({ received: true });
}