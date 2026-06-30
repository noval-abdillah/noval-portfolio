export type Language = 'en' | 'id';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      blog: 'Blog',
    },
    hero: {
      role: 'FRONTEND & BACKEND DEVELOPER',
      subtitle: 'Specializing in AI-Assisted Development, crafting production-grade web applications rapidly with Next.js, LLMs, and modern UI engineering.',
      viewProjects: 'View Projects',
      downloadResume: 'Download Resume',
    },
    about: {
      title: 'About Me',
      role: 'Frontend & Backend Developer',
      p1: 'I am a Frontend and Backend Developer who leverages AI as a collaborative programming partner. Because I have a strong foundation in software engineering fundamentals, I can effectively direct AI tools and prevent them from hallucinating or losing architectural direction.',
      p2: 'My core stack includes Next.js, Node.js, and PostgreSQL. I combine modern development frameworks with AI-assisted coding to rapidly build robust, scalable, and production-ready applications without compromising code quality.',
      p3: 'Currently at CiptaInterior / CKS Group, I am building a CMS platform and admin dashboard with JWT/RBAC authentication.',
      techStack: 'Technical Stack',
      certifications: 'Certifications',
      aiAssisted: 'AI-Assisted Development',
      problemSolving: 'Problem Solving Intermediate',
      googleAi: 'Google AI Professional Certificate',
      profileBadge: 'Frontend & Backend Dev',
      officeTools: 'Office Tools Proficiency',
      previewCert: 'Preview',
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'A selection of my recent work in full-stack development, AI integration, and modern web applications.',
      viewCode: 'Source Code',
      viewLive: 'Live Demo',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Have a project in mind or want to collaborate? Feel free to reach out. I am currently available for new opportunities.',
      nameLabel: 'Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email',
      emailPlaceholder: 'john@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell me about your project...',
      sendMessage: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message Sent!',
      successDesc: 'Thank you for reaching out. I will get back to you soon.',
      errorTitle: 'Error!',
      errorDesc: 'Something went wrong. Please try again later.',
    },
    blog: {
      title: 'Latest Insights',
      subtitle: 'Sharing my thoughts on AI-assisted engineering, modern fullstack development, and interactive UI/UX design.',
      readMore: 'Read Article',
      categories: {
        ai: 'AI & Coding',
        fullstack: 'Fullstack',
        creative: 'Creative Dev',
      },
      posts: [
        {
          title: 'How I Use AI Agents to Build 10x Faster',
          excerpt: 'Discover how AI prompting and collaborative coding can accelerate Next.js and Supabase development without losing architectural quality.',
          date: 'Jun 25, 2026',
          time: '5 min read',
        },
        {
          title: 'Mastering Next.js 16 and Supabase Authentication',
          excerpt: 'A complete guide to building secure JWT and RBAC authentication flows using Supabase SSR in Next.js App Router.',
          date: 'Jun 18, 2026',
          time: '8 min read',
        },
        {
          title: 'Creating Premium Web Animations with GSAP and Lenis',
          excerpt: 'Tips and tricks for syncing smooth scrolling animations and scroll-triggered transitions for a state-of-the-art user experience.',
          date: 'Jun 10, 2026',
          time: '6 min read',
        },
      ],
    },
    footer: {
      description: 'Full Stack Developer focused on building high-quality, production-grade applications with modern technologies.',
      quickLinks: 'Quick Links',
      connect: 'Connect',
      rights: 'All rights reserved.',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about my development process, services, and technologies.',
      questions: [
        {
          q: 'What services does Noval Abdillah offer?',
          a: 'Noval Abdillah offers full-stack web development, custom SaaS engineering, MVP creation, and AI integration services. This includes building frontends with Next.js, robust backends with Node.js/PostgreSQL, authentication architectures, and integrating LLMs to build intelligent applications.'
        },
        {
          q: 'How does AI-assisted development benefit the client?',
          a: 'AI-assisted development accelerates boilerplate generation, allowing me to build software up to 10x faster. Because I guide the AI with a strong software engineering foundation, the architectural code remains clean and reliable while clients receive high-quality production-grade platforms much sooner.'
        },
        {
          q: 'What tech stack is used for building applications?',
          a: 'The primary tech stack consists of Next.js, React, Node.js, PostgreSQL, and Supabase. I also leverage Tailwind CSS for responsive styling, and GSAP or Lenis for smooth UI interactions, ensuring modern, performant, and scale-ready web applications.'
        },
        {
          q: 'Can you build a complete MVP from scratch?',
          a: 'Yes, I specialize in taking ideas from concept to a fully functional Minimum Viable Product (MVP). I handle database design, user authentication, payment gateway integration (like Stripe), responsive UI, and secure deployment to production platforms.'
        },
        {
          q: 'How is the security of SaaS applications ensured?',
          a: 'Security is implemented at every layer. I configure strict Row-Level Security (RLS) policies in Supabase, implement secure cookie-based JWT authentication, sanitize user inputs to prevent vulnerabilities, and utilize environment variables for sensitive API keys.'
        },
        {
          q: 'What is the typical timeline for building a custom SaaS?',
          a: 'A standard MVP usually takes 2 to 6 weeks, depending on complexity. Using AI orchestration for boilerplate, I can significantly compress standard development timelines, delivering complete, functional feature sets much faster than traditional development processes.'
        }
      ]
    }
  },
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      projects: 'Proyek',
      contact: 'Kontak',
      blog: 'Blog',
    },
    hero: {
      role: 'FRONTEND & BACKEND DEVELOPER', // Usually kept in English for professional titles
      subtitle: 'Spesialis dalam Pengembangan dengan Bantuan AI, merancang aplikasi web kelas produksi secara cepat dengan Next.js, LLM, dan rekayasa UI modern.',
      viewProjects: 'Lihat Proyek',
      downloadResume: 'Unduh Resume',
    },
    about: {
      title: 'Tentang Saya',
      role: 'Frontend & Backend Developer',
      p1: 'Saya adalah seorang Frontend dan Backend Developer yang terbiasa menggunakan AI sebagai rekan kolaborasi dalam pemrograman. Dengan pemahaman fundamental rekayasa perangkat lunak yang kuat, saya dapat mengarahkan AI secara efektif tanpa membuatnya kehilangan arah atau merusak arsitektur.',
      p2: 'Keahlian utama saya mencakup Next.js, Node.js, dan PostgreSQL. Saya memadukan framework modern dengan koding berbantuan AI untuk membangun aplikasi yang kokoh, terukur, dan siap produksi dengan sangat cepat tanpa mengorbankan kualitas kode.',
      p3: 'Saat ini bekerja di CiptaInterior / CKS Group, membangun platform CMS dan dashboard admin dengan autentikasi JWT/RBAC.',
      techStack: 'Tumpukan Teknologi',
      certifications: 'Sertifikasi',
      aiAssisted: 'Pengembangan dengan Bantuan AI',
      problemSolving: 'Pemecahan Masalah Menengah',
      googleAi: 'Sertifikasi Profesional Google AI',
      profileBadge: 'Frontend & Backend Dev',
      officeTools: 'Penguasaan Microsoft Office',
      previewCert: 'Pratinjau',
    },
    projects: {
      title: 'Proyek Unggulan',
      subtitle: 'Beberapa hasil karya terbaru saya dalam pengembangan full-stack, integrasi AI, dan aplikasi web modern.',
      viewCode: 'Kode Sumber',
      viewLive: 'Demo Langsung',
    },
    contact: {
      title: 'Hubungi Saya',
      subtitle: 'Punya ide proyek atau ingin berkolaborasi? Jangan ragu untuk menghubungi. Saat ini saya terbuka untuk peluang baru.',
      nameLabel: 'Nama',
      namePlaceholder: 'Budi Santoso',
      emailLabel: 'Email',
      emailPlaceholder: 'budi@contoh.com',
      messageLabel: 'Pesan',
      messagePlaceholder: 'Ceritakan tentang proyek Anda...',
      sendMessage: 'Kirim Pesan',
      sending: 'Mengirim...',
      successTitle: 'Pesan Terkirim!',
      successDesc: 'Terima kasih telah menghubungi. Saya akan segera membalas pesan Anda.',
      errorTitle: 'Terjadi Kesalahan!',
      errorDesc: 'Ada yang salah. Silakan coba lagi nanti.',
    },
    blog: {
      title: 'Artikel Terbaru',
      subtitle: 'Berbagi wawasan seputar rekayasa teknologi berbantuan AI, pengembangan full-stack modern, dan animasi UI.',
      readMore: 'Baca Artikel',
      categories: {
        ai: 'AI & Koding',
        fullstack: 'Fullstack',
        creative: 'Creative Dev',
      },
      posts: [
        {
          title: 'Cara Saya Menggunakan AI Agent untuk Membangun Aplikasi 10x Lebih Cepat',
          excerpt: 'Pelajari bagaimana rekayasa prompt dan pemrograman kolaboratif AI mempercepat pembuatan Next.js & Supabase tanpa merusak kualitas kode.',
          date: '25 Jun 2026',
          time: '5 mnt baca',
        },
        {
          title: 'Menguasai Autentikasi Next.js 16 dan Supabase',
          excerpt: 'Panduan lengkap membangun alur autentikasi JWT dan RBAC yang aman menggunakan Supabase SSR di Next.js App Router.',
          date: '18 Jun 2026',
          time: '8 mnt baca',
        },
        {
          title: 'Membuat Animasi Web Premium dengan GSAP dan Lenis',
          excerpt: 'Tips dan trik mensinkronisasi animasi smooth scroll dan transisi scroll-trigger untuk pengalaman pengguna premium.',
          date: '10 Jun 2026',
          time: '6 mnt baca',
        },
      ],
    },
    footer: {
      description: 'Full Stack Developer yang fokus membangun aplikasi berkualitas tinggi dan berstandar produksi dengan teknologi modern.',
      quickLinks: 'Tautan Cepat',
      connect: 'Terhubung',
      rights: 'Hak cipta dilindungi.',
    },
    faq: {
      title: 'Pertanyaan yang Sering Diajukan',
      subtitle: 'Temukan jawaban untuk pertanyaan umum tentang proses pengembangan, layanan, dan teknologi saya.',
      questions: [
        {
          q: 'Layanan apa saja yang ditawarkan oleh Noval Abdillah?',
          a: 'Noval Abdillah menawarkan jasa pengembangan web full-stack, rekayasa platform SaaS kustom, pembuatan MVP, dan integrasi kecerdasan buatan (AI). Layanan ini mencakup pembuatan frontend dengan Next.js, backend dengan Node.js/PostgreSQL, autentikasi, serta integrasi LLM.'
        },
        {
          q: 'Bagaimana pengembangan berbantuan AI menguntungkan klien?',
          a: 'Pengembangan berbantuan AI mempercepat pembuatan kode dasar sehingga proses pembangunan aplikasi menjadi hingga 10x lebih cepat. Dengan fondasi rekayasa perangkat lunak yang kuat, saya mengarahkan AI agar kode tetap bersih dan andal tanpa mengorbankan kualitas arsitektur.'
        },
        {
          q: 'Tumpukan teknologi apa yang digunakan untuk membangun aplikasi?',
          a: 'Tumpukan teknologi utama saya terdiri dari Next.js, React, Node.js, PostgreSQL, dan Supabase. Saya juga menggunakan Tailwind CSS untuk styling responsif serta GSAP dan Lenis untuk animasi interaksi UI yang mulus dan siap skala.'
        },
        {
          q: 'Apakah Anda bisa membangun MVP lengkap dari nol?',
          a: 'Ya, saya berpengalaman mengubah ide konsep menjadi produk MVP (Minimum Viable Product) yang siap pakai. Saya menangani desain database, alur autentikasi, integrasi gerbang pembayaran, desain antarmuka responsif, hingga deployment aman ke server produksi.'
        },
        {
          q: 'Bagaimana Anda memastikan keamanan aplikasi SaaS yang dibangun?',
          a: 'Keamanan diterapkan di setiap lapisan aplikasi. Saya mengonfigurasi aturan Row-Level Security (RLS) ketat di Supabase, menggunakan autentikasi JWT berbasis cookie aman, melakukan sanitasi input, serta menyembunyikan kredensial di variabel lingkungan.'
        },
        {
          q: 'Berapa lama waktu pengerjaan untuk membangun platform SaaS?',
          a: 'Proses pembuatan MVP standar biasanya memakan waktu antara 2 hingga 6 minggu tergantung kompleksitasnya. Dengan orkestrasi AI untuk kode boilerplate, saya dapat memangkas durasi pengerjaan secara signifikan untuk menghasilkan fitur fungsional secara lebih cepat.'
        }
      ]
    }
  }
};
