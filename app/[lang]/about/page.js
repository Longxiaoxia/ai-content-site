'use client';
import Seo from '@/components/Seo';
import { translations, defaultLang } from '@/lib/lang';

export default function About({ params }) {
  const lang = params.lang || defaultLang;
  const t = translations[lang] || translations[defaultLang];
  return (
    <>
      <Seo title={t.aboutSite} description={t.aboutDesc} />
      <h1>{t.aboutSite}</h1>
      <p>{t.aboutDesc}</p>
    </>
  );
}
