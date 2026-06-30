import { About } from '@/components/about';

export const metadata = {
  title: 'About | Noval Abdillah',
  description: 'Learn more about Noval Abdillah - Full Stack SaaS Developer specializing in Next.js, TypeScript, and AI-assisted development. View my skills, certifications, and professional background.',
  alternatives: {
    canonical: 'https://noval-portfolio-gold.vercel.app/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <About />
    </div>
  );
}
