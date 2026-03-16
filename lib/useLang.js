'use client';
import { translations, defaultLang } from './lang';

export function useLang() {
  if (typeof window === 'undefined') return translations[defaultLang];
  const current = localStorage.getItem('lang') || defaultLang;
  return translations[current] || translations[defaultLang];
}
