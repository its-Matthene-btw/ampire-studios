"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Mail, Phone, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { toast } from "sonner"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          subject: "",
          message: "",
        })
      } else {
        toast.error("Error sending message. Please try again.")
      }
    } catch (error) {
      toast.error("Error sending message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent dark:bg-gray-800"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent dark:bg-gray-800"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent dark:bg-gray-800"
                  />
                </div>
                <div>
                  <Label htmlFor="service" className="block text-sm font-medium mb-1">Service Needed</Label>
                  <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                    <SelectTrigger className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent dark:bg-gray-800">
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
                  <Label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent dark:bg-gray-800"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium mb-1">Project Details</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent dark:bg-gray-800"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary-light dark:bg-primary-dark text-white px-6 py-3 rounded-md hover:opacity-90 transition font-medium" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit Request"}
                </Button>
              </form>
            </div>
            <div className="md:w-1/2 bg-primary-light dark:bg-primary-dark text-white p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <MapPin className="text-xl" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Our Office</h4>
                      <p>123 Digital Avenue, Tech City, TC 10001</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Mail className="text-xl" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Email Us</h4>
                      <p>contact@ampirestudio.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Phone className="text-xl" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Call Us</h4>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Clock className="text-xl" />
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
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}
