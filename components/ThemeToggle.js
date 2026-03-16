'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  }, []);

  const toggle = () => {
    document.documentElement.classList.toggle('dark');
    localStorage.theme = dark ? 'light' : 'dark';
    setDark(!dark);
  };

  return (
    <button onClick={toggle} className="text-sm px-2 py-1 rounded border">
      {dark ? '☀️ 浅色' : '🌙 深色'}
    </button>
  );
}
