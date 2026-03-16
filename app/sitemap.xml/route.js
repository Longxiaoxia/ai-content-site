import { posts } from '@/lib/data';
import { supportedLangs } from '@/lib/lang';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = 'https://algarveguide.com';

  // Static pages
  const staticPages = supportedLangs.flatMap((lang) => [
    {
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/${lang}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]);

  // Category pages
  const categories = [...new Set(posts.map((post) => post.category))];
  const categoryPages = supportedLangs.flatMap((lang) =>
    categories.map((category) => ({
      url: `${baseUrl}/${lang}/category/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    }))
  );

  // Post pages
  const postPages = supportedLangs.flatMap((lang) =>
    posts.map((post) => ({
      url: `${baseUrl}/${lang}/posts/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly',
      priority: 0.9,
    }))
  );

  const allPages = [...staticPages, ...categoryPages, ...postPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
