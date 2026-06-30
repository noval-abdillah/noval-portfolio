import BlogPostClient from '@/components/blog/BlogPostClient';
import { blogPosts } from '@/lib/blog-data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.en.title} | Noval Abdillah`,
    description: post.en.excerpt,
    alternates: {
      canonical: `https://noval-portfolio-gold.vercel.app/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `https://noval-portfolio-gold.vercel.app/blog/${slug}`,
      title: post.en.title,
      description: post.en.excerpt,
      images: [
        {
          url: `https://noval-portfolio-gold.vercel.app${post.en.image}`,
          alt: post.en.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.en.title,
      description: post.en.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const publishedDate = post.slug === 'how-i-use-ai-agents-to-build-10x-faster' ? '2026-06-25T00:00:00Z' :
                        post.slug === 'mastering-nextjs-16-and-supabase-authentication' ? '2026-06-18T00:00:00Z' : '2026-06-10T00:00:00Z';
  
  const modifiedDate = '2026-06-30T00:00:00Z'; // Today's date as fresh update signal

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.en.title,
    'description': post.en.excerpt,
    'image': `https://noval-portfolio-gold.vercel.app${post.en.image}`,
    'datePublished': publishedDate,
    'dateModified': modifiedDate,
    'author': {
      '@type': 'Person',
      'name': 'Noval Abdillah',
      'jobTitle': 'Full Stack Developer',
      'url': 'https://noval-portfolio-gold.vercel.app/about'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Noval Abdillah',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://noval-portfolio-gold.vercel.app/favicon.ico'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://noval-portfolio-gold.vercel.app/blog/${slug}`
    }
  };

  let tutorialSchema: Record<string, unknown> | null = null;

  if (slug === 'mastering-nextjs-16-and-supabase-authentication') {
    tutorialSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Master Next.js 16 and Supabase Authentication',
      'description': post.en.excerpt,
      'step': [
        {
          '@type': 'HowToStep',
          'name': 'Setting up Server-Side Clients',
          'text': 'Initialize createServerClient from @supabase/ssr in Next.js Server Components, allowing automatic cookie read and write back to the client browser.',
          'url': `https://noval-portfolio-gold.vercel.app/blog/${slug}#1-setting-up-server-side-clients`
        },
        {
          '@type': 'HowToStep',
          'name': 'Protecting Routes in Middleware',
          'text': 'Secure routes globally using middleware.ts to inspect session state before serving static layout files, boosting security and performance.',
          'url': `https://noval-portfolio-gold.vercel.app/blog/${slug}#2-protecting-routes-in-middleware`
        },
        {
          '@type': 'HowToStep',
          'name': 'Implementing Role-Based Access Control (RBAC)',
          'text': 'Validate role attributes in database metadata or tables to restrict/allow actions for admin control panels.',
          'url': `https://noval-portfolio-gold.vercel.app/blog/${slug}#3-implementing-rbac-role-based-access-control`
        },
        {
          '@type': 'HowToStep',
          'name': 'Handling Session Refresh',
          'text': 'Call supabase.auth.getUser() in middleware to force session refresh and ensure cookie session tokens stay synchronized.',
          'url': `https://noval-portfolio-gold.vercel.app/blog/${slug}#4-handling-session-refresh-and-token-lifecycle`
        },
        {
          '@type': 'HowToStep',
          'name': 'Production Deployment Best Practices',
          'text': 'Set secure environment variables, enable RLS, rate limit endpoints, and add audit logs to secure your deployment.',
          'url': `https://noval-portfolio-gold.vercel.app/blog/${slug}#5-best-practices-for-production`
        }
      ]
    };
  } else if (slug === 'creating-premium-web-animations-with-gsap-and-lenis') {
    tutorialSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Create Premium Web Animations with GSAP and Lenis',
      'description': post.en.excerpt,
      'step': [
        {
          '@type': 'HowToStep',
          'name': 'Setting up Lenis Smooth Scroll',
          'text': 'Initialize Lenis smooth scroll and bind it to requestAnimationFrame to sync mouse wheel input speed.',
          'url': `https://noval-portfolio-gold.vercel.app/blog/${slug}#1-setting-up-lenis-smooth-scroll`
        },
        {
          '@type': 'HowToStep',
          'name': 'ScrollTrigger Orchestration',
          'text': 'Use GSAP ScrollTrigger to trigger elements animations when they enter the viewport, using stagger for sequential fade-ins.',
          'url': `https://noval-portfolio-gold.vercel.app/blog/${slug}#2-scrolltrigger-orchestration`
        },
        {
          '@type': 'HowToStep',
          'name': 'Performance Optimization',
          'text': 'Use gsap.context() inside React useEffect for proper unmounting, and animate transform and opacity instead of layout properties.',
          'url': `https://noval-portfolio-gold.vercel.app/blog/${slug}#3-performance-optimization-tips`
        },
        {
          '@type': 'HowToStep',
          'name': 'Handling Mobile Devices',
          'text': 'Disable smooth scroll on mobile if necessary and let touch events resolve natively to prevent scroll conflicts.',
          'url': `https://noval-portfolio-gold.vercel.app/blog/${slug}#4-mobile-considerations`
        },
        {
          '@type': 'HowToStep',
          'name': 'Memory Management',
          'text': 'Call ctx.revert() or kill() on timeline instances inside useEffect cleanups to prevent client browser memory leaks.',
          'url': `https://noval-portfolio-gold.vercel.app/blog/${slug}#5-designing-for-performance`
        }
      ]
    };
  }

  const schemas: Record<string, unknown>[] = [articleSchema as Record<string, unknown>];
  if (tutorialSchema) {
    schemas.push(tutorialSchema);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <BlogPostClient slug={slug} />
    </>
  );
}
