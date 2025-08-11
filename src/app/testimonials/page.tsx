"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, Quote } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  role?: string
  company?: string
  content: string
  imageUrl?: string
  featured: boolean
  published: boolean
  createdAt: string
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchTestimonials()
  }, [])

  useEffect(() => {
    let filtered = testimonials

    if (searchTerm) {
      filtered = filtered.filter(testimonial =>
        testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (testimonial.company && testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (filter === "featured") {
      filtered = filtered.filter(testimonial => testimonial.featured)
    }

    setFilteredTestimonials(filtered)
  }, [testimonials, searchTerm, filter])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials")
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0">
          <img 
            src="/images/headers/testimonials-header.jpg" 
            alt="Testimonials Header" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Client Testimonials
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl">
            Hear what our clients have to say about their experience working with us.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter testimonials" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Testimonials</SelectItem>
              <SelectItem value="featured">Featured Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredTestimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="relative hover:shadow-lg transition-shadow">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-gray-300" />
                <CardHeader className="pt-8">
                  <CardContent className="p-0">
                    <p className="text-gray-600 italic mb-6 text-sm leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      {testimonial.imageUrl && (
                        <img
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        {testimonial.role && (
                          <p className="text-sm text-gray-600">
                            {testimonial.role}
                            {testimonial.company && (
                              <span> • {testimonial.company}</span>
                            )}
                          </p>
                        )}
                      </div>
                      {testimonial.featured && (
                        <Badge variant="secondary">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {testimonials.length === 0 
                ? "No testimonials available yet. Be the first to share your experience!" 
                : "No testimonials match your search criteria."
              }
            </p>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">About Testimonials</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Learn more about our client feedback and review process.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Are all testimonials from real clients?",
                answer: "Yes! Every testimonial on our website is from a genuine client who has worked with us. We value authenticity and only share feedback from real projects and experiences."
              },
              {
                question: "Can I contact previous clients for references?",
                answer: "Absolutely! We're happy to provide references from past clients. During our consultation process, we can connect you with clients who have similar projects or are in your industry."
              },
              {
                question: "How do you collect testimonials?",
                answer: "We collect testimonials at the completion of each project through a structured feedback process. We ask clients about their experience working with us, the results achieved, and their overall satisfaction."
              },
              {
                question: "Can I leave a testimonial after working with you?",
                answer: "We'd love to hear your feedback! After completing your project, we'll send you a feedback form and may reach out to discuss your experience in more detail for a potential testimonial."
              },
              {
                question: "Do you edit testimonials?",
                answer: "We may make minor edits for clarity, grammar, or length, but we never change the meaning or sentiment of the original feedback. All clients review and approve their testimonials before publication."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white dark:bg-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}