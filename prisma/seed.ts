import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@ampirestudio.com' },
    update: {},
    create: {
      email: 'admin@ampirestudio.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  console.log('Admin user created:', admin.email)

  // Create sample services
  const services = [
    {
      title: 'Web Design & Development',
      description: 'Custom websites built with modern technologies',
      icon: 'fas fa-code',
      features: JSON.stringify([
        'Static Website Design (HTML/CSS/JS)',
        'Dynamic Development (Next.js, React)',
        'E-Commerce Solutions',
        'Mobile-First Responsive Design'
      ]),
      order: 1,
      published: true
    },
    {
      title: 'Graphic & Brand Design',
      description: 'Complete branding and graphic design solutions',
      icon: 'fas fa-palette',
      features: JSON.stringify([
        'Logo & Brand Identity Design',
        'Social Media Graphics',
        'Business Collaterals',
        'Marketing Materials'
      ]),
      order: 2,
      published: true
    },
    {
      title: 'Social Media Management',
      description: 'Comprehensive social media strategy and management',
      icon: 'fas fa-hashtag',
      features: JSON.stringify([
        'Profile Optimization & Management',
        'Content Creation & Scheduling',
        'Community Engagement',
        'Paid Ad Campaigns'
      ]),
      order: 3,
      published: true
    }
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.title.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: service
    })
  }

  console.log('Services created:', services.length)

  // Create sample projects
  const projects = [
    {
      title: 'Luxe Fashion Store',
      description: 'Custom Shopify store with advanced product filtering',
      content: 'A complete e-commerce solution for a luxury fashion brand, featuring advanced product filtering, custom theme development, and seamless payment integration.',
      slug: 'luxe-fashion-store',
      imageUrl: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1136&q=80',
      featured: true,
      published: true
    },
    {
      title: 'FinTech Dashboard',
      description: 'Custom React dashboard with real-time analytics',
      content: 'A sophisticated financial technology dashboard built with React and Next.js, featuring real-time data visualization, advanced charting capabilities, and secure user authentication.',
      slug: 'fintech-dashboard',
      imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      featured: true,
      published: true
    },
    {
      title: 'Café Brand Identity',
      description: 'Complete branding package for artisanal café',
      content: 'A comprehensive brand identity project for an artisanal café, including logo design, packaging, menu design, and social media graphics that perfectly capture the café\'s essence.',
      slug: 'cafe-brand-identity',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      featured: false,
      published: true
    }
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project
    })
  }

  console.log('Projects created:', projects.length)

  // Create sample testimonials
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, Luxe Fashion',
      company: 'Luxe Fashion',
      content: 'AMpire Studio transformed our online presence with a stunning Shopify store that increased our conversions by 40%. Their attention to detail and strategic approach made all the difference.',
      imageUrl: 'https://randomuser.me/api/portraits/women/43.jpg',
      featured: true,
      published: true
    },
    {
      name: 'Michael Chen',
      role: 'CTO, FinTech Solutions',
      company: 'FinTech Solutions',
      content: 'The custom dashboard AMpire built for us using Next.js has become indispensable to our operations. Their technical expertise and problem-solving skills are truly impressive.',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      featured: true,
      published: true
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, Café Artisan',
      company: 'Café Artisan',
      content: 'From our logo to packaging and social media graphics, AMpire created a cohesive brand identity that perfectly captures our café\'s essence. Our customer engagement has skyrocketed!',
      imageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
      featured: false,
      published: true
    }
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: testimonial
    })
  }

  console.log('Testimonials created:', testimonials.length)

  // Create sample articles
  const articles = [
    {
      title: 'The Future of Web Development: Trends to Watch in 2024',
      slug: 'future-of-web-development-2024',
      excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps.',
      content: `# The Future of Web Development: Trends to Watch in 2024

Web development continues to evolve at a rapid pace, with new technologies and methodologies emerging constantly. As we move through 2024, several key trends are shaping the future of our industry.

## 1. AI-Powered Development

Artificial intelligence is revolutionizing how we build websites. From AI-powered code completion to automated testing, machine learning is making development faster and more efficient.

## 2. Progressive Web Apps (PWAs)

PWAs continue to gain traction as they offer the best of both web and mobile applications. With improved performance and offline capabilities, they're becoming the preferred choice for many businesses.

## 3. Serverless Architecture

Serverless computing is changing how we think about backend development. By eliminating the need to manage servers, developers can focus more on writing code and less on infrastructure.

## 4. JAMstack Architecture

The JAMstack (JavaScript, APIs, Markup) approach is gaining popularity for its performance benefits, security improvements, and scalability.

## 5. WebAssembly

WebAssembly is enabling high-performance applications to run in the browser, opening up new possibilities for web-based software.

As these trends continue to develop, staying current with the latest technologies and best practices will be crucial for web developers who want to remain competitive in the industry.`,
      imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      published: true
    },
    {
      title: 'Essential SEO Strategies for Modern Websites',
      slug: 'essential-seo-strategies-modern-websites',
      excerpt: 'Learn the most effective SEO strategies to improve your website\'s visibility and drive organic traffic.',
      content: `# Essential SEO Strategies for Modern Websites

Search engine optimization remains a critical component of digital success. Here are the essential strategies every modern website should implement.

## 1. Technical SEO Foundation

Before focusing on content, ensure your technical foundation is solid:
- Fast loading times
- Mobile responsiveness
- Secure HTTPS connection
- Clean URL structure
- Proper XML sitemap

## 2. Quality Content Creation

Content is still king in SEO. Focus on:
- Comprehensive, valuable information
- Natural keyword integration
- Regular content updates
- User engagement metrics

## 3. On-Page Optimization

Optimize every page for search engines:
- Strategic keyword placement
- Meta descriptions and title tags
- Header tag hierarchy
- Image optimization with alt text

## 4. User Experience Signals

Google increasingly prioritizes user experience:
- Low bounce rates
- High time on page
- Mobile-friendly design
- Easy navigation

## 5. Backlink Building

Quality backlinks remain crucial for authority:
- Guest posting
- Content partnerships
- Social media promotion
- Industry directory listings

By implementing these strategies consistently, you'll improve your website's search visibility and drive more qualified organic traffic.`,
      published: true
    }
  ]

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article
    })
  }

  console.log('Articles created:', articles.length)

  // Create sample contact submissions
  const contactSubmissions = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1-555-0123',
      subject: 'Website Redesign Inquiry',
      message: 'I\'m interested in redesigning my company website. Please provide a quote for a complete redesign.',
      read: false
    },
    {
      name: 'Jane Smith',
      email: 'jane@business.com',
      phone: '+1-555-0456',
      subject: 'E-commerce Development',
      message: 'Looking to build an online store for my retail business. Need estimates and timeline.',
      read: false
    },
    {
      name: 'Bob Johnson',
      email: 'bob@startup.io',
      phone: '+1-555-0789',
      subject: 'Mobile App Development',
      message: 'Interested in developing a mobile app for our startup. Please contact me to discuss requirements.',
      read: true
    }
  ]

  for (const submission of contactSubmissions) {
    await prisma.contactSubmission.upsert({
      where: { id: submission.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: submission
    })
  }

  console.log('Contact submissions created:', contactSubmissions.length)

  // Create sample media entries
  const mediaItems = [
    {
      filename: 'hero-image.jpg',
      originalName: 'Hero Background Image',
      filePath: '/uploads/hero-image.jpg',
      fileSize: 1024000,
      mimeType: 'image/jpeg',
      altText: 'Hero background image for homepage'
    },
    {
      filename: 'logo.png',
      originalName: 'Company Logo',
      filePath: '/uploads/logo.png',
      fileSize: 512000,
      mimeType: 'image/png',
      altText: 'AMpire Studio company logo'
    },
    {
      filename: 'team-photo.jpg',
      originalName: 'Team Photo',
      filePath: '/uploads/team-photo.jpg',
      fileSize: 2048000,
      mimeType: 'image/jpeg',
      altText: 'AMpire Studio team photo'
    }
  ]

  for (const media of mediaItems) {
    await prisma.media.upsert({
      where: { id: media.filename },
      update: {},
      create: media
    })
  }

  console.log('Media items created:', mediaItems.length)

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })