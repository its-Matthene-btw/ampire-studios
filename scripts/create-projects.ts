import { db } from "../src/lib/db"

async function createProjects() {
  const projects = [
    {
      title: "E-Commerce Platform for Fashion Retailer",
      description: "A comprehensive e-commerce solution with advanced features for a leading fashion retailer.",
      content: `We developed a cutting-edge e-commerce platform for a fashion retailer that needed to scale their online operations. The project included:

• Custom shopping cart and checkout system
• Inventory management integration
• Customer accounts and order tracking
• Mobile-responsive design
• SEO optimization
• Payment gateway integration
• Advanced product filtering and search
• Email marketing automation

The result was a 60% increase in online sales and improved customer satisfaction scores. The platform handles over 10,000 daily visitors and processes hundreds of orders daily.`,
      slug: "fashion-retailer-ecommerce",
      imageUrl: "/images/projects/fashion-ecommerce.jpg",
      featured: true,
      published: true
    },
    {
      title: "Corporate Website for Tech Startup",
      description: "Modern, responsive website for a B2B SaaS startup with integrated marketing tools.",
      content: `This project involved creating a complete online presence for a tech startup in the B2B SaaS space. Key deliverables included:

• Custom WordPress theme development
• Responsive design for all devices
• Lead generation forms and CRM integration
• Blog and content management system
• SEO optimization and content strategy
• Analytics and performance monitoring
• A/B testing capabilities
• Integration with marketing automation tools

The website helped the startup increase qualified leads by 45% and establish their brand authority in the industry.`,
      slug: "tech-startup-corporate-website",
      imageUrl: "/images/projects/tech-startup-website.jpg",
      featured: true,
      published: true
    },
    {
      title: "Mobile App for Fitness Tracking",
      description: "Cross-platform mobile application for fitness enthusiasts with social features.",
      content: `We developed a comprehensive fitness tracking mobile app that works seamlessly on both iOS and Android platforms. The app features:

• Custom workout planning and tracking
• Social features for sharing progress
• Integration with wearable devices
• Nutrition tracking and meal planning
• Progress analytics and insights
• Personal trainer matching
• Community challenges and leaderboards
• Subscription management system

The app has been downloaded over 50,000 times and maintains a 4.8-star rating on app stores. Users report significant improvements in their fitness consistency and goal achievement.`,
      slug: "fitness-tracking-mobile-app",
      imageUrl: "/images/projects/fitness-app.jpg",
      featured: false,
      published: true
    },
    {
      title: "Restaurant Management System",
      description: "Complete POS and management system for restaurant chain with multiple locations.",
      content: `This comprehensive restaurant management system was designed for a growing restaurant chain with multiple locations. The system includes:

• Point of Sale (POS) system
• Inventory management
• Staff scheduling and payroll
• Customer loyalty program
• Online ordering integration
• Table management system
• Sales analytics and reporting
• Multi-location management

The system has streamlined operations across all locations, reducing operational costs by 30% and improving customer service efficiency. The restaurant chain has since expanded to three additional locations using the same system.`,
      slug: "restaurant-management-system",
      imageUrl: "/images/projects/restaurant-pos.jpg",
      featured: false,
      published: true
    },
    {
      title: "Real Estate Portal",
      description: "Comprehensive property listing and management platform for real estate agency.",
      content: `We built a comprehensive real estate portal that serves both property buyers and real estate agents. The platform features:

• Advanced property search and filtering
• Virtual tour capabilities
• Agent profiles and directories
• Mortgage calculator integration
• Property comparison tools
• Saved searches and alerts
• Lead management for agents
• Mobile app companion

The portal now lists over 5,000 properties and facilitates hundreds of property transactions monthly. Real estate agents report a 40% increase in qualified leads through the platform.`,
      slug: "real-estate-portal",
      imageUrl: "/images/projects/real-estate-portal.jpg",
      featured: true,
      published: true
    },
    {
      title: "Educational Learning Platform",
      description: "Online learning management system for educational institution with interactive features.",
      content: `This educational platform was developed for a learning institution to deliver online courses effectively. The system includes:

• Course management and creation tools
• Student enrollment and progress tracking
• Interactive quizzes and assessments
• Video streaming and content delivery
• Discussion forums and collaboration tools
• Grade book and reporting
• Mobile app for learning on-the-go
• Integration with existing student information systems

The platform has successfully delivered courses to over 2,000 students with a 95% completion rate. Student engagement and satisfaction scores have significantly improved since implementation.`,
      slug: "educational-learning-platform",
      imageUrl: "/images/projects/learning-platform.jpg",
      featured: false,
      published: true
    },
    {
      title: "Healthcare Appointment System",
      description: "Patient management and appointment scheduling system for medical practice.",
      content: `We developed a comprehensive healthcare management system for a multi-specialty medical practice. The system features:

• Patient registration and management
• Appointment scheduling and reminders
• Electronic health records integration
• Billing and insurance processing
• Telemedicine capabilities
• Prescription management
• Staff scheduling and resource management
• HIPAA compliance and security

The system has improved patient satisfaction scores by 35% and reduced administrative workload by 50%. The practice has been able to serve 25% more patients with the same staff resources.`,
      slug: "healthcare-appointment-system",
      imageUrl: "/images/projects/healthcare-system.jpg",
      featured: false,
      published: true
    },
    {
      title: "Digital Marketing Dashboard",
      description: "Analytics and campaign management dashboard for digital marketing agency.",
      content: `This comprehensive dashboard was created for a digital marketing agency to manage client campaigns and track performance across multiple channels. Features include:

• Multi-channel campaign management
• Real-time analytics and reporting
• Social media integration
• SEO monitoring and tracking
• Budget management and ROI analysis
• Client reporting and white-label options
• Automated insights and recommendations
• Team collaboration tools

The dashboard has helped the agency improve client retention by 60% and increase campaign ROI by an average of 25% across all client accounts.`,
      slug: "digital-marketing-dashboard",
      imageUrl: "/images/projects/marketing-dashboard.jpg",
      featured: true,
      published: true
    }
  ]

  try {
    console.log("Creating projects...")
    
    for (const project of projects) {
      const created = await db.project.create({
        data: project
      })
      console.log(`Created project: ${created.title}`)
    }

    console.log("All projects created successfully!")
  } catch (error) {
    console.error("Error creating projects:", error)
  }
}

createProjects()