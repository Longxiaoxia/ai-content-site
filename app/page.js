import { redirect } from 'next/navigation';
import { defaultLang } from '@/lib/lang';

export default function RootPage() {
  redirect(`/${defaultLang}`);
}
