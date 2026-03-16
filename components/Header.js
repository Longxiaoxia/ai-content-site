'use client';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import LangSwitch from './LangSwitch';
import { translations, defaultLang } from '@/lib/lang';

export default function Header({ lang: currentLang }) {
  const lang = currentLang || defaultLang;
  const t = translations[lang] || translations[defaultLang];

  return (
    <header className="py-4 border-b flex justify-between items-center flex-wrap gap-2">
      <nav className="flex gap-3 md:gap-5 text-sm">
        <Link href={`/${lang}`} className="font-bold">{t.home}</Link>
        <Link href={`/${lang}/category/Town`} className="text-gray-600 dark:text-gray-300">{t.town}</Link>
        <Link href={`/${lang}/category/Beach`} className="text-gray-600 dark:text-gray-300">{t.beach}</Link>
        <Link href={`/${lang}/about`} className="text-gray-600 dark:text-gray-300">{t.tour}</Link>
        <Link href={`/${lang}/category/E-bike`} className="text-gray-600 dark:text-gray-300">{t.ebike}</Link>
      </nav>
      <div className="flex items-center gap-2">
        <LangSwitch currentLang={lang} />
        <ThemeToggle />
      </div>
    </header>
  );
}
