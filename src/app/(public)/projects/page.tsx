import { Projects } from '@/components/projects';

export const metadata = {
  title: 'Projects | Noval Abdillah',
  description: 'Explore my portfolio of production-grade SaaS applications and full-stack projects built with Next.js, TypeScript, and modern web technologies.',
  alternatives: {
    canonical: 'https://noval-portfolio-gold.vercel.app/projects',
  },
};

export default function ProjectsPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Full Stack SaaS Development',
    'description': 'Custom full-stack web application development specializing in building production-grade SaaS platforms with Next.js, Node.js, and PostgreSQL.',
    'provider': {
      '@type': 'Person',
      'name': 'Noval Abdillah',
    },
    'areaServed': 'Worldwide',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Software Engineering Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'SaaS Platform Development',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'AI Integration & Prompt Engineering',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'API & Backend Development',
          },
        },
      ],
    },
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Projects />
    </div>
  );
}
