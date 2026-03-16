import { posts, getPostContent, getRelatedPosts } from '@/lib/data';
import Seo from '@/components/Seo';
import JsonLd from '@/components/JsonLd';
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
import { defaultLang, supportedLangs, translations } from '@/lib/lang';

export async function generateStaticParams() {
  const paths = [];
  supportedLangs.forEach(lang => {
    posts.forEach(post => {
      paths.push({ lang, slug: post.slug });
    });
  });
  return paths;
}

export default function PostPage({ params }) {
  const lang = params.lang || defaultLang;
  const t = translations[lang] || translations[defaultLang];
  const post = posts.find(p => p.slug === params.slug);
  if (!post) return <div>Post not found</div>;

  const postContent = getPostContent(post, lang);
  const relatedPosts = getRelatedPosts(post, lang, 3);
  const baseUrl = 'https://algarveguide.com';
  const url = `${baseUrl}/${lang}/posts/${post.slug}`;

  // Breadcrumb schema
  const breadcrumbItems = [
    { name: t.home, url: `${baseUrl}/${lang}` },
    { name: post.category, url: `${baseUrl}/${lang}/category/${post.category}` },
    { name: postContent.title, url: url }
  ];

  const relatedLabels = {
    en: 'You May Also Like',
    pt: 'Também Pode Gostar'
  };

  return (
    <>
      <Seo title={postContent.title} description={postContent.excerpt} image={post.cover} />
      <JsonLd data={getArticleSchema(post, lang, url)} />
      <JsonLd data={getBreadcrumbSchema(breadcrumbItems)} />
      <article className="py-2">
        <header>
          <h1>{postContent.title}</h1>
          <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-400 mt-2">
            <time>{post.date}</time>
            <Link href={`/${lang}/category/${post.category}`}
              className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
              {post.category}
            </Link>
          </div>
        </header>
        <img src={post.cover} alt={postContent.title} className="w-full h-auto rounded my-6" loading="lazy" />
        <div className="content" dangerouslySetInnerHTML={{ __html: postContent.content }} />
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-8 border-t">
          <h2 className="text-xl font-bold mb-6">{relatedLabels[lang] || relatedLabels.en}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.slug} className="group">
                <Link href={`/${lang}/posts/${relatedPost.slug}`}>
                  <img
                    src={relatedPost.cover}
                    alt={relatedPost.title}
                    className="w-full h-40 object-cover rounded mb-3 group-hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                </Link>
                <h3 className="font-medium">
                  <Link href={`/${lang}/posts/${relatedPost.slug}`} className="hover:underline">
                    {relatedPost.title}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
