import './globals.css';
import { defaultLang } from '@/lib/lang';

export const metadata = {
  title: 'Algarve Travel Guide · Your Complete Guide to the Algarve',
  description: 'Discover the best of Algarve, Portugal. Complete travel guide with beaches, attractions, food, and tips for Lagos, Portimão, and more.',
  metadataBase: new URL('https://algarveguide.com'),
};

export default function RootLayout({ children }) {
  return (
    <html lang={defaultLang === 'pt' ? 'pt-PT' : 'en-US'} className="min-h-screen">
      <body className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 max-w-3xl mx-auto px-4 transition-colors">
        {children}
      </body>
    </html>
  );
}
