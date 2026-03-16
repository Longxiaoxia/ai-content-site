'use client';
import { usePathname, useRouter } from 'next/navigation';
import { supportedLangs } from '@/lib/lang';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Português' },
];

export default function LangSwitch({ currentLang }) {
  const pathname = usePathname();
  const router = useRouter();

  const change = (e) => {
    const newLang = e.target.value;
    // 替换路径中的语言代码
    const segments = pathname.split('/');
    if (supportedLangs.includes(segments[1])) {
      segments[1] = newLang;
    } else {
      segments.splice(1, 0, newLang);
    }
    const newPath = segments.join('/') || '/';
    router.push(newPath);
  };

  return (
    <select
      value={currentLang}
      onChange={change}
      className="text-sm border rounded px-2 py-1 bg-white dark:bg-slate-800"
    >
      {languages.map(l => (
        <option key={l.code} value={l.code}>{l.name}</option>
      ))}
    </select>
  );
}
