const { PrismaClient, Role } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // --- Create Admin User ---
  const hashedPassword = await bcrypt.hash('Matthene@18042025', 12);
  await prisma.admin.upsert({
    where: { email: 'admin@ampirestudio.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin@ampirestudio.com',
      name: 'Admin User',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });
  console.log('✅ Admin user seeded.');

  // --- Create Services ---
  const services = [
    {
      title: 'Web Design & Development',
      slug: 'web-design-development',
      description: 'Custom websites built with modern technologies',
      icon: 'fas fa-code',
      features: JSON.stringify([
        'Static Website Design (HTML/CSS/JS)',
        'Dynamic Development (Next.js, React)',
        'E-Commerce Solutions',
        'Mobile-First Responsive Design',
      ]),
      order: 1,
      published: true,
    },
    {
      title: 'Graphic & Brand Design',
      slug: 'graphic-brand-design',
      description: 'Complete branding and graphic design solutions',
      icon: 'fas fa-palette',
      features: JSON.stringify([
        'Logo & Brand Identity Design',
        'Social Media Graphics',
        'Business Collaterals',
        'Marketing Materials',
      ]),
      order: 2,
      published: true,
    },
    {
      title: 'Social Media Management',
      slug: 'social-media-management',
      description: 'Comprehensive social media strategy and management',
      icon: 'fas fa-hashtag',
      features: JSON.stringify([
        'Profile Optimization & Management',
        'Content Creation & Scheduling',
        'Community Engagement',
        'Paid Ad Campaigns',
      ]),
      order: 3,
      published: true,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`✅ ${services.length} services seeded.`);

  // --- Create Projects ---
  const projects = [
    {
      title: 'Luxe Fashion Store',
      description: 'Custom Shopify store with advanced product filtering',
      content:
        'A complete e-commerce solution for a luxury fashion brand, featuring advanced product filtering, custom theme development, and seamless payment integration.',
      slug: 'luxe-fashion-store',
      imageUrl:
        'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1136&q=80',
      featured: true,
      published: true,
    },
    {
      title: 'FinTech Dashboard',
      description: 'Custom React dashboard with real-time analytics',
      content:
        'A sophisticated financial technology dashboard built with React and Next.js, featuring real-time data visualization, advanced charting capabilities, and secure user authentication.',
      slug: 'fintech-dashboard',
      imageUrl:
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      featured: true,
      published: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
  console.log(`✅ ${projects.length} projects seeded.`);

  // --- Create Testimonials ---
  const testimonials = [
    {
      name: 'Sarah Johnson',
      slug: 'sarah-johnson',
      role: 'CEO, Luxe Fashion',
      company: 'Luxe Fashion',
      content:
        'AMpire Studio transformed our online presence with a stunning Shopify store that increased our conversions by 40%. Their attention to detail and strategic approach made all the difference.',
      imageUrl: 'https://randomuser.me/api/portraits/women/43.jpg',
      featured: true,
      published: true,
    },
    {
      name: 'Michael Chen',
      slug: 'michael-chen',
      role: 'CTO, FinTech Solutions',
      company: 'FinTech Solutions',
      content:
        'The custom dashboard AMpire built for us using Next.js has become indispensable to our operations. Their technical expertise and problem-solving skills are truly impressive.',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      featured: true,
      published: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { slug: testimonial.slug },
      update: testimonial,
      create: testimonial,
    });
  }
  console.log(`✅ ${testimonials.length} testimonials seeded.`);

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });