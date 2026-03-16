'use client';
import { posts, getPostContent } from '@/lib/data';
import Link from 'next/link';
import Seo from '@/components/Seo';
import { translations, defaultLang } from '@/lib/lang';

export default function Home({ params }) {
  const lang = params.lang || defaultLang;
  const t = translations[lang] || translations[defaultLang];

  return (
    <>
      <Seo title={t.home} description={t.aboutDesc} />
      <h1>{t.latest}</h1>
      <div className="space-y-10 mt-6">
        {posts.map(post => {
          const postContent = getPostContent(post, lang);
          return (
            <article key={post.slug} className="border-b pb-6">
              <Link href={`/${lang}/posts/${post.slug}`}>
                <img
                  src={post.cover}
                  alt={postContent.title}
                  className="rounded mb-3 w-full h-48 object-cover"
                />
              </Link>
              <div className="flex items-center gap-2 text-sm">
                <time className="text-gray-500 dark:text-gray-400">{post.date}</time>
                <Link href={`/${lang}/category/${post.category}`}
                  className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                  {post.category}
                </Link>
              </div>
              <h2 className="mt-2">
                <Link href={`/${lang}/posts/${post.slug}`} className="hover:underline">
                  {postContent.title}
                </Link>
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{postContent.excerpt}</p>
            </article>
          );
        })}
      </div>
    </>
  );
}
