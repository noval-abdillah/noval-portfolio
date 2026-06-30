import { Contact } from '@/components/contact';

export const metadata = {
  title: 'Contact | Noval Abdillah',
  description: 'Get in touch with Noval Abdillah for collaboration opportunities, project inquiries, or professional discussions. Available for freelance and full-time opportunities.',
  alternatives: {
    canonical: 'https://noval-portfolio-gold.vercel.app/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Contact />
    </div>
  );
}
