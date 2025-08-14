"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ProcessSection from "@/components/ProcessSection" 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function Services() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("web")
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
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

  // Service categories data
  const serviceCategories = {
    strategy: {
      title: "Branding & Strategy",
      services: [
        {
          icon: "fas fa-route",
          title: "Brand Strategy",
          description: "We define your unique place in the market to ensure you connect with your target audience effectively.",
          features: ["Market Positioning", "Audience Research"]
        },
        {
          icon: "fas fa-lightbulb",
          title: "Visual Identity",
          description: "Our designs create a memorable and cohesive look for your brand across all platforms.",
          features: ["Logo & Iconography", "Color & Typography"]
        },
        {
          icon: "fas fa-pen-nib",
          title: "Tone of Voice",
          description: "We establish a unique voice that makes your brand's communication consistent and recognizable.",
          features: ["Brand Messaging", "Communication Style Guides"]
        },
        {
          icon: "fas fa-search",
          title: "Market Research",
          description: "We provide deep insights into your industry landscape to inform strategic decision-making.",
          features: ["Competitor Analysis", "User Surveys & Feedback"]
        }
      ]
    },
    web: {
      title: "Web Design & Dev",
      services: [
        {
          icon: "fas fa-drafting-compass",
          title: "UI/UX Design",
          description: "We design intuitive and engaging user interfaces that prioritize usability and a seamless user journey.",
          features: ["Wireframing & Prototyping", "User Flow Mapping"]
        },
        {
          icon: "fas fa-laptop-code",
          title: "Custom Websites",
          description: "From corporate sites to landing pages, we build fast, secure, and fully responsive websites from the ground up.",
          features: ["Mobile-First Development", "Performance Optimization"]
        },
        {
          icon: "fas fa-cogs",
          title: "CMS Development",
          description: "Manage your own content with ease through powerful Content Management Systems.",
          features: ["WordPress Development", "Headless CMS (e.g., Strapi, Sanity)"]
        },
        {
          icon: "fas fa-project-diagram",
          title: "API Integration",
          description: "We connect your website to essential third-party services to extend its functionality.",
          features: ["Payment & Shipping APIs", "Social Media & CRM APIs"]
        }
      ]
    },
    ecommerce: {
      title: "E-Commerce",
      services: [
        {
          icon: "fas fa-shopping-cart",
          title: "Shopify Development",
          description: "Complete e-commerce solutions built on the powerful Shopify platform.",
          features: ["Custom Theme Development", "Payment Gateway Integration"]
        },
        {
          icon: "fas fa-store",
          title: "WooCommerce Solutions",
          description: "Flexible WordPress-based e-commerce solutions for businesses of all sizes.",
          features: ["Product Catalog Management", "Shipping Configuration"]
        },
        {
          icon: "fas fa-credit-card",
          title: "Payment Integration",
          description: "Secure and seamless payment processing for your online store.",
          features: ["Multiple Payment Methods", "Security & Compliance"]
        },
        {
          icon: "fas fa-box-open",
          title: "Inventory Management",
          description: "Streamlined inventory tracking and management systems.",
          features: ["Real-time Stock Updates", "Order Management"]
        }
      ]
    },
    marketing: {
      title: "Digital Marketing",
      services: [
        {
          icon: "fas fa-search-dollar",
          title: "SEO Optimization",
          description: "Improve your search engine rankings and drive organic traffic to your website.",
          features: ["On-Page SEO", "Technical SEO", "Content Strategy"]
        },
        {
          icon: "fas fa-hashtag",
          title: "Social Media Marketing",
          description: "Comprehensive social media strategies to build your brand presence.",
          features: ["Content Creation", "Community Management", "Paid Advertising"]
        },
        {
          icon: "fas fa-envelope",
          title: "Email Marketing",
          description: "Targeted email campaigns to nurture leads and drive conversions.",
          features: ["Campaign Strategy", "Automation", "Analytics"]
        },
        {
          icon: "fas fa-chart-line",
          title: "Analytics & Reporting",
          description: "Data-driven insights to optimize your marketing performance.",
          features: ["Performance Tracking", "ROI Analysis", "Custom Reports"]
        }
      ]
    },
    content: {
      title: "Content Creation",
      services: [
        {
          icon: "fas fa-pen-fancy",
          title: "Copywriting",
          description: "Compelling content that engages your audience and drives action.",
          features: ["Website Copy", "Blog Posts", "Product Descriptions"]
        },
        {
          icon: "fas fa-camera",
          title: "Photography",
          description: "Professional photography services to showcase your products and brand.",
          features: ["Product Photography", "Brand Photography", "Event Coverage"]
        },
        {
          icon: "fas fa-video",
          title: "Video Production",
          description: "High-quality video content for marketing and brand storytelling.",
          features: ["Promotional Videos", "Testimonials", "Social Media Content"]
        },
        {
          icon: "fas fa-palette",
          title: "Graphic Design",
          description: "Stunning visual content for all your marketing needs.",
          features: ["Social Media Graphics", "Infographics", "Marketing Materials"]
        }
      ]
    },
    support: {
      title: "Support & Maint.",
      services: [
        {
          icon: "fas fa-shield-alt",
          title: "Security Monitoring",
          description: "Continuous security monitoring and protection for your digital assets.",
          features: ["Vulnerability Scanning", "Security Updates", "Backup Solutions"]
        },
        {
          icon: "fas fa-tools",
          title: "Maintenance Plans",
          description: "Ongoing maintenance to keep your website running smoothly.",
          features: ["Regular Updates", "Performance Optimization", "Bug Fixes"]
        },
        {
          icon: "fas fa-headset",
          title: "Technical Support",
          description: "Dedicated technical support when you need it most.",
          features: ["24/7 Support", "Remote Assistance", "Training"]
        },
        {
          icon: "fas fa-chart-bar",
          title: "Performance Monitoring",
          description: "Continuous monitoring and optimization of your website's performance.",
          features: ["Uptime Monitoring", "Speed Optimization", "Analytics"]
        }
      ]
    }
  }

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.')
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: ""
        })
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
      
      
      {/* Tabbed Services Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary-light dark:text-primary-dark font-semibold">OUR EXPERTISE</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">A Complete Digital Toolkit</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Select a category to explore the specialized services we offer to build, launch, and grow your brand.
            </p>
          </div>
          
          <div className="mb-12 flex flex-wrap justify-center gap-2 md:gap-4">
            {Object.entries(serviceCategories).map(([key, category]) => (
              <button
                key={key}
                data-tab={key}
                onClick={() => setActiveTab(key)}
                className={`service-tab font-medium px-4 py-2 rounded-md transition ${
                  activeTab === key 
                    ? 'active-tab bg-primary-light dark:bg-primary-dark text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
          
          <div>
            {Object.entries(serviceCategories).map(([key, category]) => (
              <div
                key={key}
                id={key}
                className={`tab-panel ${activeTab === key ? 'block' : 'hidden'} animate-fadeIn`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.services.map((service, index) => (
                    <Link key={index} href="/service" className="block">
                      <div className="service-card bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md p-8 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className={`w-12 h-12 ${
                          key === 'web' ? 'bg-secondary-light/10 dark:bg-secondary-dark/10' : 'bg-primary-light/10 dark:bg-primary-dark/10'
                        } rounded-lg flex items-center justify-center mb-4`}>
                          <i className={`${service.icon} ${
                            key === 'web' ? 'text-secondary-light dark:text-secondary-dark' : 'text-primary-light dark:text-primary-dark'
                          } text-xl`}></i>
                        </div>
                        <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />
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
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 testimonial-card">
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

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-light dark:text-primary-dark font-semibold">GET IN TOUCH</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Ready to Start Your Project?</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Fill out the form below and we'll get back to you within 24 hours to discuss your project.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Service Needed</Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-design">Web Design & Development</SelectItem>
                        <SelectItem value="ecommerce">E-Commerce Solutions</SelectItem>
                        <SelectItem value="branding">Branding & Graphic Design</SelectItem>
                        <SelectItem value="social">Social Media Management</SelectItem>
                        <SelectItem value="seo">SEO & Digital Marketing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Project Details</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>
              </div>
              <div className="md:w-1/2 bg-primary-light dark:bg-primary-dark text-white p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fas fa-map-marker-alt text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Our Office</h4>
                      <p>123 Digital Avenue, Tech City, TC 10001</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fas fa-envelope text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Email Us</h4>
                      <p>contact@ampirestudio.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fas fa-phone-alt text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Call Us</h4>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fas fa-clock text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Working Hours</h4>
                      <p>Monday - Friday: 9AM - 6PM</p>
                      <p>Saturday: 10AM - 3PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                    <i className={`fas fa-chevron-down transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}></i>
                  </button>
                  <div className={`px-6 pb-6 ${activeFaq === index ? 'block' : 'hidden'}`}>
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
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
            <Link href="#contact" className="bg-white text-primary-light dark:text-primary-dark px-6 py-3 rounded-md hover:opacity-90 transition font-medium inline-block">
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