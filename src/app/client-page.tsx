"use client";

import Link from 'next/link';

// --- アイコンコンポーネント ---
const ClockIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>);
const ChartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>);
const DocumentIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>);
const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" /></svg>);

// --- ページセクションのコンポーネント定義 ---
const Header = () => ( <header className="absolute inset-x-0 top-0 z-50"><nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global"><div className="flex lg:flex-1"><a href="#" className="-m-1.5 p-1.5"><span className="text-xl font-bold text-gray-900">AI Daily News</span></a></div><div className="flex flex-1 justify-end"><a href="#pricing" className="text-sm font-semibold leading-6 text-gray-900"><span className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">7日間 無料で試す</span></a></div></nav></header>);
const Features = () => ( <div className="bg-white py-20 sm:py-24" id="features"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mx-auto max-w-2xl lg:text-center"><h2 className="text-base font-semibold leading-7 text-blue-600">時間を価値に変える</h2><p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">AI時代の、新しいニュース体験</p><p className="mt-6 text-lg leading-8 text-gray-600">単なる情報収集では終わらない。あなたの意思決定を加速させる、唯一無二のインテリジェンス・レポートです。</p></div><div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"><dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16"><div className="flex flex-col"><dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white"><ClockIcon /></div>圧倒的な「時間対効果」</dt><dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600"><p className="flex-auto">冒頭の「60秒要点キャッチアップ」で、世界の最先端を即座に把握。多忙な日でも、これさえ読めば時流から取り残されません。</p></dd></div><div className="flex flex-col"><dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white"><ChartIcon /></div>単なる要約ではない「独自分析レポート」</dt><dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600"><p className="flex-auto">ニュースの裏側にある「深掘りすべき論点」と、明日から使える「実践的アクションプラン」を提示。日々の業務にすぐに活かせます。</p></dd></div><div className="flex flex-col"><dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white"><DocumentIcon /></div>最高の「読書体験」</dt><dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600"><p className="flex-auto">全てのニュースをカテゴリ分けし、構造化。興味のある部分だけを効率的に読み進められます。</p></dd></div></dl></div></div></div>);
const Pricing = ({ onCheckout }: { onCheckout: (priceId: string) => void }) => ( <div className="bg-slate-50 py-20 sm:py-24" id="pricing"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className="text-base font-semibold leading-7 text-blue-600">料金プラン</h2><p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">あなたに合ったプランを選べます</p><p className="mt-6 text-lg leading-8 text-gray-600">まずは7日間の無料トライアルで、全ての機能をお試しください。</p></div><div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-10 sm:mt-20 lg:max-w-4xl lg:grid-cols-2 lg:gap-x-8"><div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 sm:p-10 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"><h3 className="text-base font-semibold leading-7 text-blue-600">月額プラン</h3><div className="mt-4 flex items-baseline gap-x-2"><span className="text-5xl font-bold tracking-tight text-gray-900">300</span><span className="text-base font-semibold leading-7 text-gray-600">円/月</span></div><p className="mt-6 text-base leading-7 text-gray-600">まずは気軽に始めたい方向けのプランです。</p><p className="mt-1 text-sm text-gray-500">1日あたり約10円</p><ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600"><li className="flex gap-x-3"><CheckIcon />毎日のニュースレター配信</li><li className="flex gap-x-3"><CheckIcon />いつでも解約可能</li></ul><button onClick={() => onCheckout(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY!)} className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500">無料トライアルを始める</button></div><div className="relative rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10 transition-all duration-300 ease-in-out hover:scale-105"><div className="absolute top-4 right-4 z-10"><span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-base font-semibold text-blue-700">約17% お得</span></div><h3 className="text-base font-semibold leading-7 text-blue-600">年間プラン</h3><div className="mt-4 flex items-baseline gap-x-2"><span className="text-5xl font-bold tracking-tight text-gray-900">3,000</span><span className="text-base font-semibold leading-7 text-gray-600">円/年</span></div><p className="mt-6 text-base leading-7 text-gray-600">お得に長期間利用したい方向けのプランです。</p><p className="mt-1 text-sm text-gray-500">月々支払うより600円お得です</p><ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600"><li className="flex gap-x-3"><CheckIcon />毎日のニュースレター配信</li><li className="flex gap-x-3"><CheckIcon />いつでも解約可能</li></ul><button onClick={() => onCheckout(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY!)} className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500">無料トライアルを始める</button></div></div></div></div>);
const FAQ = () => ( <div className="bg-white py-20 sm:py-24" id="faq"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mx-auto max-w-4xl divide-y divide-gray-900/10"><h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">よくあるご質問</h2><dl className="mt-10 space-y-8 divide-y divide-gray-900/10"><div className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8"><dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">どのようなAIニュースが対象ですか？</dt><dd className="mt-2 lg:col-span-7 lg:mt-0"><p className="text-base leading-7 text-gray-600">ビジネス活用事例から最新の研究成果まで、世界中の信頼性の高い情報源から、ビジネスパーソンが本当に知るべきニュースだけを弊社のアナリストが厳選してお届けします。</p></dd></div><div className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8"><dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">支払い方法には何がありますか？</dt><dd className="mt-2 lg:col-span-7 lg:mt-0"><p className="text-base leading-7 text-gray-600">クレジットカード（VISA, Mastercard, American Expressなど、Stripeが対応するすべての主要ブランド）でのお支払いに対応しております。</p></dd></div><div className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8"><dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">無料トライアルはどのような仕組みですか？</dt><dd className="mt-2 lg:col-span-7 lg:mt-0"><p className="text-base leading-7 text-gray-600">お申し込みから7日間は、全ての機能を無料でご利用いただけます。無料期間が終了する前に解約いただければ、料金は一切発生いたしません。解約されない場合、8日目に自動的に有料プランへ移行します。</p></dd></div><div className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8"><dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">解約はいつでもできますか？</dt><dd className="mt-2 lg:col-span-7 lg:mt-0"><p className="text-base leading-7 text-gray-600">はい、いつでも簡単に解約手続きが可能です。サービスの性質上、すでにお支払いいただいた料金の返金は行っておりませんが、解約手続きを完了すると、次回の決済は一切行われません。</p></dd></div><div className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8"><dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">サンプルを見ることはできますか？</dt><dd className="mt-2 lg:col-span-7 lg:mt-0"><p className="text-base leading-7 text-gray-600">はい、ご覧いただけます。こちらの<a href="#" className="text-blue-600 hover:underline">リンク</a>から最新号のサンプル（PDF）をダウンロードできます。また、7日間の無料トライアルもご用意しております。</p></dd></div></dl></div></div></div>);
const FinalCTA = () => ( <div className="bg-white py-16 sm:py-20"><div className="mx-auto max-w-4xl px-6 lg:px-8"><div className="relative isolate overflow-hidden bg-gray-900 px-6 py-20 text-center shadow-2xl sm:rounded-3xl sm:px-16"><h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">今すぐ無料体験</h2><p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">AIの進化に取り残される不安を、<br className="sm:hidden" />最先端を走る自信へ。</p><div className="mt-10 flex items-center justify-center gap-x-6"><a href="#pricing" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100">7日間の無料トライアルを始める</a></div><svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true"><circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" /><defs><radialGradient id="8d958450-c69f-4251-94bc-4e091a323369"><stop stopColor="#7775D6" /><stop offset={1} stopColor="#E935C1" /></radialGradient></defs></svg></div></div></div>);
const Footer = () => ( <footer className="bg-white border-t border-gray-200"><div className="max-w-7xl mx-auto py-12 px-6 lg:px-8"><nav className="flex flex-wrap justify-center gap-x-6 gap-y-4"><Link href="/tokushoho" className="text-sm text-gray-500 hover:text-gray-800">特定商取引法に基づく表記</Link><Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-800">プライバシーポリシー</Link><Link href="/terms" className="text-sm text-gray-500 hover:text-gray-800">利用規約</Link></nav><p className="mt-8 text-center text-xs text-gray-400">&copy; {new Date().getFullYear()} NextGen Solutions. All Rights Reserved.</p></div></footer>);
const StickyBanner = () => ( <div className="fixed inset-x-0 bottom-0 z-50"><div className="bg-white/80 backdrop-blur-sm border-t border-gray-200"><div className="mx-auto max-w-7xl py-3 px-6"><div className="flex items-center justify-between gap-x-6"><p className="text-xs font-semibold leading-6 text-gray-900 sm:text-sm">AIの進化に、乗り遅れない。</p><a href="#pricing" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300">7日間 無料で試す</a></div></div></div></div>);

// ページ本体のコンポーネント
export default function ClientPage() {
  const handleCheckout = async (priceId: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const { sessionId } = await response.json();
      if (!sessionId) throw new Error('Failed to create a checkout session.');

      const stripeJs = await import('@stripe/stripe-js');
      const stripe = await stripeJs.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

      if (stripe) {
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('決済ページの読み込みに失敗しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <div className="bg-white pb-20">
      <Header />
      <main className="isolate">
        <div className="relative">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true"><div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80caff] to-[#4f46e5] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}/></div>
          <div className="pt-32 pb-20 sm:pt-40 sm:pb-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">AI業界の今を、<br />あなたの毎朝に。</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">世界中の最新AIニュースを、専門家が要約・解説。毎朝、読みやすいPDF形式であなたのメールボックスにお届けします。</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a href="#pricing" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">7日間の無料トライアルを始める</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-20 sm:space-y-24">
            <Features />
            <Pricing onCheckout={handleCheckout} />
            <FAQ />
            <FinalCTA />
        </div>
      </main>

      <Footer />
      <StickyBanner />
    </div>
  );
}

