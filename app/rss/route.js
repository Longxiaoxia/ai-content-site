import { posts } from '@/lib/data';

export async function GET() {
  const baseUrl = "https://yourdomain.com";
  const xml = `
  <rss version="2.0">
    <channel>
      <title>极简内容站</title>
      <link>${baseUrl}</link>
      <description>AI友好 & SEO友好 图文内容平台</description>
      ${posts.map(p => `
        <item>
          <title>${p.title}</title>
          <link>${baseUrl}/posts/${p.slug}</link>
          <guid>${baseUrl}/posts/${p.slug}</guid>
          <pubDate>${new Date(p.date).toUTCString()}</pubDate>
          <description>${p.excerpt}</description>
        </item>
      `).join('')}
    </channel>
  </rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}

export const dynamic = 'force-static';

