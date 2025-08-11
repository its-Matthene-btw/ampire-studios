"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Dynamic data states
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
        setTestimonials(getFallbackTestimonials())
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Fallback data functions
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

  const stats = [
    { value: "50+", label: "Happy Clients" },
    { value: "80+", label: "Projects Delivered" },
    { value: "5k+", label: "Hours of Work" },
    { value: "100%", label: "Client Satisfaction" }
  ]

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
      
      
      {/* About Hero Section */}
      <section className="bg-gray-100 dark:bg-gray-800 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 text-center">
          <span className="font-semibold text-primary-light dark:text-primary-dark">ABOUT US</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">We're The Partner For Your Digital Journey</h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Team collaborating on a project" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission is to Empower Your Vision.</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                AMpire Studio was founded on the belief that every great idea, whether from a solo freelancer or an established enterprise, deserves a world-class digital platform. We exist to close the gap between ambition and reality.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                We provide stunning design and robust development at fair prices to give startups a fighting chance, while also offering the deep expertise and premium quality that larger businesses need to innovate and lead their industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Proven Success, Tangible Results</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mt-2">We are proud of our track record in helping businesses grow and succeed.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                <h3 className="text-5xl font-bold gradient-text">{stat.value}</h3>
                <p className="mt-2 font-semibold text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative bg-fixed bg-cover bg-center py-20 md:py-32" style={{backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80')"}}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a Project in Mind?</h2>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            Let's talk about how we can work together to create something amazing.
          </p>
          <Link href="/contact" className="bg-primary-light text-white px-8 py-3 rounded-md hover:opacity-90 transition font-medium text-lg inline-block">
            Get a Free Consultation
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-light dark:text-primary-dark font-semibold">WHY CHOOSE US</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">The AMpire Studio Advantage</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              We don't just deliver projects - we build partnerships that drive real business results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          
          <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
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
                        <i className="fas fa-check text-primary-light dark:text-primary-dark"></i>
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
                        <i className="fas fa-check text-primary-light dark:text-primary-dark"></i>
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
                        <i className="fas fa-check text-primary-light dark:text-primary-dark"></i>
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
      <section className="py-16 md:py-24">
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
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold z-10" style={{backgroundColor: step.color.replace('bg-', '').replace('dark:', '').replace('light:', '')}}>
                    {step.step}
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

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
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
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 testimonial-card">
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
                    <i key={i} className="fas fa-star text-yellow-400"></i>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
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
            <Link href="/contact" className="bg-white text-primary-light dark:text-primary-dark px-6 py-3 rounded-md hover:opacity-90 transition font-medium inline-block">
              Get Started Now
            </Link>
            <a href="tel:+15551234567" className="border border-white px-6 py-3 rounded-md hover:bg-white/10 transition font-medium inline-block">
              <i className="fas fa-phone-alt mr-2"></i> Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}