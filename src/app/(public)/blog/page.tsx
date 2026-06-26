'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { blogPosts } from '@/lib/blog-data';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogListingPage() {
  const { t } = useLanguage();

  // Helper to map translation index to custom category labels/styles
  const getCategoryStyles = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 1:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 2:
      default:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    }
  };

  const getCategoryName = (index: number) => {
    switch (index) {
      case 0:
        return t.blog.categories.ai;
      case 1:
        return t.blog.categories.fullstack;
      case 2:
      default:
        return t.blog.categories.creative;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-green-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-20">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 font-mono tracking-tight">
            THE<span className="text-green-500">.</span>BLOG
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg">
            {t.blog.subtitle}
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t.blog.posts.map((post, index) => (
            <article
              key={index}
              className="group relative bg-zinc-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800/80 hover:border-green-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.04)] flex flex-col"
            >
              {/* Blog Cover Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
                <Image
                  src={blogPosts[index].en.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                {/* Meta Category & Date */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-0.5 text-xs font-mono font-medium rounded-full border ${getCategoryStyles(index)}`}>
                    {getCategoryName(index)}
                  </span>
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Title */}
                <Link href={`/blog/${blogPosts[index].slug}`}>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-500 transition-colors duration-300 leading-snug cursor-pointer">
                    {post.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Bottom footer bar */}
              <div className="flex items-center justify-between px-6 pb-6 pt-4 border-t border-zinc-800/50 mt-auto">
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.time}</span>
                </div>

                <Link
                  href={`/blog/${blogPosts[index].slug}`}
                  className="flex items-center gap-1 text-xs font-mono font-bold text-green-500 group-hover:text-green-400 transition-colors cursor-pointer"
                >
                  {t.blog.readMore}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}