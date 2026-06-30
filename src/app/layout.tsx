import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import '@/app/globals.css';
import { Navbar } from '@/components/layout';
import { Footer } from '@/components/layout';
import { SmoothScroll, PageTransition, CustomCursor } from '@/components/ui';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://noval-portfolio-gold.vercel.app'),
  alternates: {
    canonical: '/',
  },
  title: 'Noval Abdillah | Fullstack Developer & Ai Coder',
  description: 'Portfolio of Noval Abdillah, a Full Stack Developer specializing in building production-grade SaaS applications with Next.js, Node.js, and PostgreSQL. Expert in AI-assisted development using GitHub Copilot.',
  keywords: [
    'Full Stack Developer',
    'SaaS Engineer',
    'Next.js',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Supabase',
    'Stripe Integration',
    'AI-Assisted Development',
    'GitHub Copilot',
    'Bekasi',
    'Indonesia',
  ],
  authors: [{ name: 'Noval Abdillah' }],
  creator: 'Noval Abdillah',
  publisher: 'Noval Abdillah',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://noval-portfolio-gold.vercel.app',
    title: 'Noval Abdillah | Fullstack Developer & Ai Coder',
    description: 'Building production-grade SaaS applications with modern technologies',
    siteName: 'Noval Abdillah Portfolio',
    images: [
      {
        url: 'https://noval-portfolio-gold.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Noval Abdillah Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noval Abdillah | Fullstack Developer & Ai Coder',
    description: 'Building production-grade SaaS applications with modern technologies',
    creator: '@novalabdillah',
  },
  verification: {
    google: 'google8006ea16ce0826eb',
    yandex: 'your-yandex-verification-code',
  },
};

import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgAndPersonSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://noval-portfolio-gold.vercel.app/#organization',
        'name': 'Noval Abdillah',
        'url': 'https://noval-portfolio-gold.vercel.app',
        'logo': 'https://noval-portfolio-gold.vercel.app/favicon.ico',
        'sameAs': [
          'https://github.com/noval-abdillah',
          'https://www.linkedin.com/in/noval-abdillah-415589316/'
        ]
      },
      {
        '@type': 'Person',
        '@id': 'https://noval-portfolio-gold.vercel.app/#person',
        'name': 'Noval Abdillah',
        'jobTitle': 'Full Stack Developer & AI Engineer',
        'url': 'https://noval-portfolio-gold.vercel.app',
        'image': 'https://noval-portfolio-gold.vercel.app/images/Profil.jpeg',
        'sameAs': [
          'https://github.com/noval-abdillah',
          'https://www.linkedin.com/in/noval-abdillah-415589316/'
        ],
        'knowsAbout': [
          'Next.js',
          'TypeScript',
          'Node.js',
          'PostgreSQL',
          'Supabase',
          'Tailwind CSS',
          'Three.js',
          'GSAP',
          'AI-Assisted Development'
        ]
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${mono.variable} font-sans bg-zinc-950 text-zinc-100`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgAndPersonSchema) }}
        />
        <LanguageProvider>
        <CustomCursor>
          <SmoothScroll>
            <PageTransition>
              <Navbar />
              <main className="min-h-screen pt-16">
                {children}
              </main>
              <Footer />
            </PageTransition>
          </SmoothScroll>
        </CustomCursor>
        </LanguageProvider>
      </body>
    </html>
  );
}
