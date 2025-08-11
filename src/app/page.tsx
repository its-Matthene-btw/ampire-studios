"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ContactSection from "@/components/ContactSection"

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  
  // Dynamic data states
  const [services, setServices] = useState<any[]>([])
  const [portfolioItems, setPortfolioItems] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user has previously set a theme
    if (localStorage.getItem('color-theme') === 'light') {
      setIsDarkMode(false)
    } else {
      setIsDarkMode(true)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('color-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('color-theme', 'light')
    }
  }, [isDarkMode])

  // Fetch data from API endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch services
        const servicesRes = await fetch('/api/services')
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json()
          setServices(servicesData)
        } else {
          // Use fallback data if API fails
          setServices(getFallbackServices())
        }
        
        // Fetch portfolio items
        const portfolioRes = await fetch('/api/projects')
        if (portfolioRes.ok) {
          const portfolioData = await portfolioRes.json()
          setPortfolioItems(portfolioData)
        } else {
          // Use fallback data if API fails
          setPortfolioItems(getFallbackPortfolio())
        }
        
        // Fetch testimonials
        const testimonialsRes = await fetch('/api/testimonials')
        if (testimonialsRes.ok) {
          const testimonialsData = await testimonialsRes.json()
          setTestimonials(testimonialsData)
        } else {
          // Use fallback data if API fails
          setTestimonials(getFallbackTestimonials())
        }
        
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load some content. Using fallback data.')
        
        // Use fallback data if there's an error
        setServices(getFallbackServices())
        setPortfolioItems(getFallbackPortfolio())
        setTestimonials(getFallbackTestimonials())
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Fallback data functions
  const getFallbackServices = () => [
    {
      icon: "fas fa-code",
      title: "Web Design & Development",
      color: "text-primary-light dark:text-primary-dark",
      bgColor: "bg-primary-light/10 dark:bg-primary-dark/10",
      features: [
        "Static Website Design (HTML/CSS/JS)",
        "Dynamic Development (Next.js, React)",
        "E-Commerce Solutions",
        "Mobile-First Responsive Design"
      ]
    },
    {
      icon: "fas fa-palette",
      title: "Graphic & Brand Design",
      color: "text-secondary-light dark:text-secondary-dark",
      bgColor: "bg-secondary-light/10 dark:bg-secondary-dark/10",
      features: [
        "Logo & Brand Identity Design",
        "Social Media Graphics",
        "Business Collaterals",
        "Marketing Materials"
      ]
    },
    {
      icon: "fas fa-hashtag",
      title: "Social Media Management",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      features: [
        "Profile Optimization & Management",
        "Content Creation & Scheduling",
        "Community Engagement",
        "Paid Ad Campaigns"
      ]
    },
    {
      icon: "fas fa-shopping-cart",
      title: "E-Commerce Solutions",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      features: [
        "Shopify & WooCommerce Setup",
        "Product Catalog Management",
        "Secure Payment Integration",
        "Conversion Optimization"
      ]
    },
    {
      icon: "fas fa-plus-circle",
      title: "Add-on Services",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      features: [
        "Hosting & Domain Setup",
        "Basic SEO Implementation",
        "Analytics Integration",
        "Ongoing Maintenance Plans"
      ]
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Mobile App Development",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      features: [
        "iOS & Android App Development",
        "Cross-Platform Solutions",
        "UI/UX Design",
        "App Store Optimization"
      ]
    }
  ]

  const getFallbackPortfolio = () => [
    {
      title: "Luxe Fashion Store",
      description: "Custom Shopify store with advanced product filtering",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1136&q=80",
      tags: ["E-Commerce", "Shopify", "Responsive"]
    },
    {
      title: "FinTech Dashboard",
      description: "Custom React dashboard with real-time analytics",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      tags: ["Web App", "React", "Next.js"]
    },
    {
      title: "Fitness Mobile App",
      description: "Cross-platform fitness tracking application",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1136&q=80",
      tags: ["Mobile", "React Native", "iOS/Android"]
    },
    {
      title: "Café Brand Identity",
      description: "Complete branding package for artisanal café",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Branding", "Logo", "Packaging"]
    },
    {
      title: "SaaS Product Launch",
      description: "High-conversion landing page for tech startup",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1136&q=80",
      tags: ["Landing Page", "HTML/CSS", "A/B Testing"]
    },
    {
      title: "Beauty Brand Social",
      description: "Complete social media strategy and content",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      tags: ["Social Media", "Instagram", "Content Strategy"]
    }
  ]

  const getFallbackTestimonials = () => [
    {
      name: "Sarah Johnson",
      role: "CEO, Luxe Fashion",
      image: "https://randomuser.me/api/portraits/women/43.jpg",
      content: "AMpire Studio transformed our online presence with a stunning Shopify store that increased our conversions by 40%. Their attention to detail and strategic approach made all the difference."
    },
    {
      name: "Michael Chen",
      role: "CTO, FinTech Solutions",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "The custom dashboard AMpire built for us using Next.js has become indispensable to our operations. Their technical expertise and problem-solving skills are truly impressive."
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, Café Artisan",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      content: "From our logo to packaging and social media graphics, AMpire created a cohesive brand identity that perfectly captures our café's essence. Our customer engagement has skyrocketed!"
    }
  ]

  const advantages = [
    {
      icon: "fas fa-medal",
      title: "Proven Expertise",
      description: "Our team combines years of experience with cutting-edge technologies to deliver exceptional results.",
      color: "text-primary-light dark:text-primary-dark",
      bgColor: "bg-primary-light/10 dark:bg-primary-dark/10"
    },
    {
      icon: "fas fa-hand-holding-usd",
      title: "Transparent Pricing",
      description: "No hidden fees. We offer competitive rates with clear breakdowns of what you're paying for.",
      color: "text-secondary-light dark:text-secondary-dark",
      bgColor: "bg-secondary-light/10 dark:bg-secondary-dark/10"
    },
    {
      icon: "fas fa-headset",
      title: "Dedicated Support",
      description: "We provide ongoing support and maintenance to ensure your digital assets remain optimal.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: "fas fa-bolt",
      title: "Fast Turnaround",
      description: "We respect your time with efficient processes that deliver quality results without unnecessary delays.",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ]

  const technologies = [
    { icon: "fab fa-react", name: "React/Next.js", color: "text-blue-500" },
    { icon: "fab fa-node-js", name: "Node.js", color: "text-green-600" },
    { icon: "fab fa-wordpress", name: "WordPress", color: "text-blue-700" },
    { icon: "fab fa-shopify", name: "Shopify", color: "text-green-400" },
    { icon: "fab fa-laravel", name: "PHP/Laravel", color: "text-purple-500" },
    { icon: "fas fa-database", name: "MySQL/MongoDB", color: "text-yellow-500" },
    { icon: "fab fa-aws", name: "AWS", color: "text-orange-500" },
    { icon: "fab fa-google", name: "Google Cloud", color: "text-blue-500" }
  ]

  const processSteps = [
    {
      step: 1,
      title: "Discovery & Consultation",
      description: "We start by understanding your business, goals, and requirements through detailed discussions and research.",
      color: "bg-primary-light dark:bg-primary-dark"
    },
    {
      step: 2,
      title: "Planning & Strategy",
      description: "Our team creates a comprehensive project plan with timelines, milestones, and technology stack recommendations.",
      color: "bg-secondary-light dark:bg-secondary-dark"
    },
    {
      step: 3,
      title: "Design & Prototyping",
      description: "We develop wireframes and design mockups for your approval before any development begins.",
      color: "bg-purple-500"
    },
    {
      step: 4,
      title: "Development",
      description: "Our developers build your solution with clean, efficient code following industry best practices.",
      color: "bg-blue-500"
    },
    {
      step: 5,
      title: "Testing & Quality Assurance",
      description: "We rigorously test all functionality across devices and browsers to ensure flawless performance.",
      color: "bg-green-500"
    },
    {
      step: 6,
      title: "Launch & Support",
      description: "We deploy your solution and provide training plus ongoing support to ensure long-term success.",
      color: "bg-yellow-500"
    }
  ]

  const faqs = [
    {
      question: "How long does a typical website project take?",
      answer: "Project timelines vary based on complexity. A basic brochure website typically takes 2-4 weeks, while a custom e-commerce solution may take 6-12 weeks. After our initial consultation, we'll provide a detailed timeline tailored to your specific project requirements."
    },
    {
      question: "What's included in your pricing?",
      answer: "Our pricing is transparent and includes all agreed-upon design, development, and testing work. We provide itemized quotes that clearly outline what's included. Optional add-ons like hosting, maintenance, and SEO services are priced separately so you only pay for what you need."
    },
    {
      question: "Do you offer ongoing support after launch?",
      answer: "Yes, we offer various support packages tailored to your needs. These can include regular updates, security monitoring, performance optimization, and content updates. We also provide training so you can manage basic updates yourself if preferred."
    },
    {
      question: "Can you work with our existing branding?",
      answer: "Absolutely. We can either work within your existing brand guidelines or help refresh/expand them as needed. For new brands, we offer comprehensive branding services to establish a cohesive visual identity across all platforms."
    },
    {
      question: "What platforms do you specialize in?",
      answer: "We're platform-agnostic and recommend solutions based on your specific needs. For CMS solutions, we work with WordPress, Shopify, and custom headless setups. For web apps, we specialize in React/Next.js, Node.js, and modern JavaScript frameworks. We also develop native and cross-platform mobile applications."
    }
  ]

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      {/* Font Awesome CSS */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      {/* Loading and Error States */}
      {loading && (
        <div className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg">
          Loading content...
        </div>
      )}
      
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-500 text-white px-4 py-2 rounded-md shadow-lg">
          {error}
        </div>
      )}
      
     

      {/* Hero Section */}
      <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            
            <div className="md:w-1/2 mb-12 md:mb-0 relative z-10 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Elevate Your <span className="gradient-text">Digital Presence</span> With Our Expertise
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                We craft stunning websites, powerful brands, and effective digital strategies to help your business thrive online.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <Link href="/contact" className="bg-primary-light dark:bg-primary-dark text-white px-6 py-3 rounded-md hover:opacity-90 transition font-medium text-center">
                  Start Your Project
                </Link>
                <Link href="/services" className="border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition font-medium text-center">
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="w-full h-[400px] md:w-1/2 md:h-auto">
              {/* eslint-disable-next-line @next/next/no-sync-scripts */}
              <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.33/build/spline-viewer.js"></script>
              <spline-viewer 
                url="https://prod.spline.design/LXokXiakLcRp6d04/scene.splinecode" 
                className="scale-[1.75] translate-y-8 md:scale-[2.2] md:translate-x-[40%] md:-translate-y-[10%] lg:scale-[2.0] lg:translate-x-[15%] lg:-translate-y-[15%]">
              </spline-viewer>
            </div>
          </div>
        </div>
      </section>
      
      {/* Clients/Partners Section */}
      <section className="py-8 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Working with innovative technologies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="h-10 flex items-center opacity-70 hover:opacity-100 transition">
              <i className="fab fa-react text-4xl text-blue-500"></i>
              <span className="ml-2 font-medium">React</span>
            </div>
            <div className="h-10 flex items-center opacity-70 hover:opacity-100 transition">
              <i className="fab fa-wordpress text-4xl text-blue-700"></i>
              <span className="ml-2 font-medium">WordPress</span>
            </div>
            <div className="h-10 flex items-center opacity-70 hover:opacity-100 transition">
              <i className="fab fa-shopify text-4xl text-green-600"></i>
              <span className="ml-2 font-medium">Shopify</span>
            </div>
            <div className="h-10 flex items-center opacity-70 hover:opacity-100 transition">
              <i className="fab fa-wix text-4xl text-blue-400"></i>
              <span className="ml-2 font-medium">Wix</span>
            </div>
            <div className="h-10 flex items-center opacity-70 hover:opacity-100 transition">
              <i className="fab fa-google text-4xl text-blue-500"></i>
              <span className="ml-2 font-medium">Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-light dark:text-primary-dark font-semibold">OUR SERVICES</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Comprehensive Digital Solutions</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              We offer a full spectrum of services to establish, enhance, and grow your digital presence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition duration-300">
                <div className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <i className={`${service.icon} ${service.color} text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-light dark:text-primary-dark font-semibold">WHY CHOOSE US</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">The AMpire Studio Advantage</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              We don't just deliver projects - we build partnerships that drive real business results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 text-center">
                <div className={`w-16 h-16 ${advantage.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${advantage.icon} ${advantage.color} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-4">Our Commitment to Excellence</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  At AMpire Studio, we approach every project with the same level of dedication and professionalism, whether it's a small business website or a complex enterprise application.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 bg-primary-light/10 dark:bg-primary-dark/10 rounded-full flex items-center justify-center">
                        <i className="fas fa-check-circle text-primary-light dark:text-primary-dark w-4 h-4"></i>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Strategic Approach</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        We analyze your business objectives to create solutions that align with your goals.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 bg-primary-light/10 dark:bg-primary-dark/10 rounded-full flex items-center justify-center">
                        <i className="fas fa-check-circle text-primary-light dark:text-primary-dark w-4 h-4"></i>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Quality Assurance</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Rigorous testing ensures flawless performance across all devices and platforms.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 bg-primary-light/10 dark:bg-primary-dark/10 rounded-full flex items-center justify-center">
                        <i className="fas fa-check-circle text-primary-light dark:text-primary-dark w-4 h-4"></i>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Client-Centric Process</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Regular updates and collaboration ensure the final product exceeds expectations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 bg-gray-50 dark:bg-gray-700 p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-4">Technologies We Master</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We stay at the forefront of technology to deliver modern, scalable solutions for our clients.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {technologies.map((tech, index) => (
                    <div key={index} className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <i className={`${tech.icon} ${tech.color} text-2xl mr-3`}></i>
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-light dark:text-primary-dark font-semibold">OUR PROCESS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">How We Bring Your Vision to Life</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Our structured approach ensures efficiency, transparency, and outstanding results at every stage.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {processSteps.map((step, index) => (
                <div key={index} className="process-step relative pl-16 pb-12">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold z-10">
                    <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center`}>
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-light dark:text-primary-dark font-semibold">OUR WORK</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Portfolio Showcase</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Explore some of our recent projects across various industries and platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <div key={index} className="portfolio-item relative rounded-xl overflow-hidden shadow-lg">
                <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
                <div className="portfolio-overlay absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-200 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-md hover:opacity-90 transition font-medium">
              Start Your Project
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-light dark:text-primary-dark font-semibold">CLIENT TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">What Our Clients Say</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Don't just take our word for it - hear from businesses we've helped transform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {testimonial.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    <ContactSection />

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-light dark:text-primary-dark font-semibold">FAQS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Frequently Asked Questions</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Get answers to common questions about our services and process.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="faq-toggle w-full flex justify-between items-center p-6 text-left"
                  >
                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                    <span className={`transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {activeFaq === index && (
                    <div className="faq-content px-6 pb-6">
                      <p className="text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary-light dark:bg-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
          <p className="max-w-2xl mx-auto text-lg mb-8 opacity-90">
            Let's discuss how we can help your business stand out online. Schedule a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact" className="bg-white text-primary-light dark:text-primary-dark px-6 py-3 rounded-md hover:opacity-90 transition font-medium">
              Get Started Now
            </Link>
            <a href="tel:+15551234567" className="border border-white px-6 py-3 rounded-md hover:bg-white/10 transition font-medium">
              <span className="mr-2">📞</span> Call Us
            </a>
          </div>
        </div>
      </section>

  

      <style jsx global>{`
        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(90deg, #6366f1, #f43f5e);
        }
        
        .dark .gradient-text {
          background-image: linear-gradient(90deg, #818cf8, #fb7185);
        }
        
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .dark .service-card:hover {
          box-shadow: 0 10px 25px -5px rgba(255, 255, 255, 0.05);
        }
        
        .process-step::before {
          content: '';
          position: absolute;
          width: 2px;
          height: 100%;
          background: #e5e7eb;
          left: 24px;
          top: 40px;
          z-index: 0;
        }
        
        .dark .process-step::before {
          background: #4b5563;
        }
        
        @media (max-width: 768px) {
          .process-step::before {
            display: none;
          }
        }
        
        .testimonial-card {
          transition: all 0.3s ease;
        }
        
        .testimonial-card:hover {
          transform: scale(1.02);
        }
        
        .portfolio-item {
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .portfolio-item:hover .portfolio-overlay {
          opacity: 1;
        }
        
        .portfolio-overlay {
          transition: all 0.3s ease;
          opacity: 0;
          background: rgba(0, 0, 0, 0.7);
        }
        
        .dark .portfolio-overlay {
          background: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  )
}