import BlogListingClient from '@/components/blog/BlogListingClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Insights | Noval Abdillah',
  description: 'Articles on AI-assisted development, Next.js, Supabase architecture, and modern full-stack web applications by Noval Abdillah.',
  alternates: {
    canonical: 'https://novalabdillah.com/blog',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://novalabdillah.com/blog',
    title: 'Blog & Insights | Noval Abdillah',
    description: 'Articles on AI-assisted development, Next.js, Supabase architecture, and modern full-stack web applications by Noval Abdillah.',
    siteName: 'Noval Abdillah Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Insights | Noval Abdillah',
    description: 'Articles on AI-assisted development, Next.js, Supabase architecture, and modern full-stack web applications by Noval Abdillah.',
  },
};

export default function BlogListingPage() {
  return <BlogListingClient />;
}
