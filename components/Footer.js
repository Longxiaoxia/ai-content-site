'use client';
import { translations, defaultLang } from '@/lib/lang';

export default function Footer({ lang: currentLang }) {
  const lang = currentLang || defaultLang;
  const t = translations[lang] || translations[defaultLang];

  const footerTexts = {
    en: "© 2026 Minimal Content Site · AI Friendly · SEO Optimized",
    pt: "© 2026 Site de Conteúdo Minimalista · Amigável para IA · Otimizado para SEO"
  };

  return (
    <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t mt-10">
      {footerTexts[lang] || footerTexts.en}
    </footer>
  );
}
