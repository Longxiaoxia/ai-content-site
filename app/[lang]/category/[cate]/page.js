import { posts, getPostContent } from '@/lib/data';
import Link from 'next/link';
import Seo from '@/components/Seo';
import { translations, defaultLang, supportedLangs } from '@/lib/lang';

export async function generateStaticParams() {
  const paths = [];
  const categories = [...new Set(posts.map((post) => post.category))];
  supportedLangs.forEach(lang => {
    categories.forEach(cate => {
      paths.push({ lang, cate });
    });
  });
  return paths;
}

export default function CategoryPage({ params }) {
  const lang = params.lang || defaultLang;
  const t = translations[lang] || translations[defaultLang];
  const list = posts.filter(p => p.category === params.cate);

  return (
    <>
      <Seo title={`${t.category}: ${params.cate}`} description={`${params.cate} related content`} />
      <h1>{t.category}: {params.cate}</h1>
      <div className="space-y-8 mt-6">
        {list.map(post => {
          const postContent = getPostContent(post, lang);
          return (
            <article key={post.slug} className="border-b pb-6">
              <Link href={`/${lang}/posts/${post.slug}`}>
                <img src={post.cover} alt={postContent.title} className="rounded w-full h-40 object-cover mb-3" />
              </Link>
              <time className="text-sm text-gray-500 dark:text-gray-400">{post.date}</time>
              <h2 className="mt-1">
                <Link href={`/${lang}/posts/${post.slug}`} className="hover:underline">{postContent.title}</Link>
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{postContent.excerpt}</p>
            </article>
          );
        })}
      </div>
    </>
  );
}
