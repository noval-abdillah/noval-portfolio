'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { blogPosts } from '@/lib/blog-data';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = use(params);
  const { language } = useLanguage();
  const router = useRouter();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-4xl font-bold font-mono text-green-500 mb-4">404</h1>
        <p className="text-zinc-400 mb-8">Article not found / Artikel tidak ditemukan</p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-green-500 text-zinc-950 font-bold font-mono rounded-lg hover:bg-green-400 transition-colors"
        >
          Back to Home / Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const content = post[language];

  return (
    <article className="min-h-screen bg-zinc-950 pt-16 pb-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Back navigation */}
        <button 
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-zinc-400 hover:text-green-500 transition-colors duration-300 font-mono text-sm mb-6 md:mb-12"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>{language === 'en' ? 'Back' : 'Kembali'}</span>
        </button>

        {/* Banner Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-8 md:mb-12 bg-zinc-800 border border-zinc-800">
          <Image
            src={content.image}
            alt={content.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
              {content.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {content.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-zinc-500 text-sm font-mono border-y border-zinc-900 py-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{content.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{content.time}</span>
            </div>
          </div>
        </header>

        {/* Post Content */}
        <div 
          className="prose prose-invert max-w-none text-zinc-300"
          dangerouslySetInnerHTML={{ __html: content.contentHtml }}
        />

        {/* Bottom Banner */}
        <div className="border-t border-zinc-900 mt-10 md:mt-16 pt-8 flex justify-center">
          <Link 
            href="/"
            className="px-8 py-3 border border-green-500/30 text-zinc-400 hover:text-green-400 hover:border-green-500 font-mono text-sm rounded-lg transition-all duration-300"
          >
            {language === 'en' ? 'VIEW ALL POSTS' : 'LIHAT SEMUA POSTINGAN'}
          </Link>
        </div>
      </div>
    </article>
  );
}
