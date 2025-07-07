import type { Metadata } from 'next';
import ClientPage from './client-page'; // 新しく作ったコンポーネントをインポート

export const metadata: Metadata = {
  title: 'AI Daily News - 毎朝届く、最新AIニュース',
  description: 'AI業界の最新情報を、毎朝あなたのメールボックスにPDFでお届けします。',
};

export default function Page() {
  return <ClientPage />;
}