'use client';
import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

export default function Admin() {
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('2026-03-12');
  const [cover, setCover] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  const generate = () => {
    const code = `
{
  slug: '${slug}',
  title: '${title}',
  category: '${category}',
  date: '${date}',
  cover: '${cover}',
  excerpt: '${excerpt}',
  content: \`${content}\`
},`;
    navigator.clipboard.writeText(code);
    alert('已复制！粘贴到 lib/data.js');
  };

  return (
    <div className="space-y-4 py-4">
      <h1>文章发布后台</h1>
      <input className="border w-full p-2 rounded" placeholder="slug（英文地址）" onChange={e => setSlug(e.target.value)} />
      <input className="border w-full p-2 rounded" placeholder="标题" onChange={e => setTitle(e.target.value)} />
      <input className="border w-full p-2 rounded" placeholder="分类" onChange={e => setCategory(e.target.value)} />
      <input className="border w-full p-2 rounded" placeholder="日期" onChange={e => setDate(e.target.value)} />
      <ImageUpload onUpload={url => setCover(url)} />
      <input className="border w-full p-2 rounded" placeholder="封面链接" value={cover} onChange={e => setCover(e.target.value)} />
      <input className="border w-full p-2 rounded" placeholder="摘要" onChange={e => setExcerpt(e.target.value)} />
      <textarea className="border w-full p-2 rounded h-40" placeholder="内容（支持HTML）" onChange={e => setContent(e.target.value)} />
      <button onClick={generate} className="bg-black text-white p-2 rounded w-full">生成文章代码</button>
    </div>
  );
}
