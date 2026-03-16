'use client';
import { usePathname } from 'next/navigation';

export default function Seo({ title, description, image }) {
  const pathname = usePathname();
  const baseUrl = "https://algarveguide.com";
  const url = `${baseUrl}${pathname}`;

  return (
    <>
      <title>{title} | Algarve Travel Guide</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Algarve Travel Guide" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </>
  );
}
