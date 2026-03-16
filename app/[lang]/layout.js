import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { getWebsiteSchema } from '@/lib/schema';
import { supportedLangs, defaultLang } from '@/lib/lang';

export async function generateStaticParams() {
  return supportedLangs.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const lang = params.lang || defaultLang;
  const titles = {
    en: 'Algarve Travel Guide · Your Complete Guide to the Algarve',
    pt: 'Guia de Viagem do Algarve · O Seu Guia Completo do Algarve'
  };
  const descriptions = {
    en: 'Discover the best of Algarve, Portugal. Complete travel guide with beaches, attractions, food, and tips for Lagos, Portimão, and more.',
    pt: 'Descubra o melhor do Algarve, Portugal. Guia de viagem completo com praias, atrações, gastronomia e dicas para Lagos, Portimão e mais.'
  };
  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    manifest: '/manifest.json',
  };
}

export default function LangLayout({ children, params }) {
  const lang = params.lang || defaultLang;
  return (
    <>
      <JsonLd data={getWebsiteSchema(lang)} />
      <Header lang={lang} />
      <main className="py-8">{children}</main>
      <Footer lang={lang} />
    </>
  );
}
