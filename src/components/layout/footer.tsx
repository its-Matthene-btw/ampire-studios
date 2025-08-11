import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">AMpire Studio</h3>
            <p className="mb-4">
              We help businesses establish, enhance, and grow their digital presence through strategic design and development solutions.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="hover:text-white transition">Web Design & Development</Link></li>
              <li><Link href="/services" className="hover:text-white transition">E-Commerce Solutions</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Branding & Graphic Design</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Social Media Management</Link></li>
              <li><Link href="/services" className="hover:text-white transition">SEO & Digital Marketing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition">Portfolio</Link></li>
              <li><Link href="/articles" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Our Office</p>
                <p className="text-sm">123 Digital Avenue, Tech City, TC 10001</p>
              </div>
              <div>
                <p className="font-medium">Email Us</p>
                <p className="text-sm">contact@ampirestudio.com</p>
              </div>
              <div>
                <p className="font-medium">Call Us</p>
                <p className="text-sm">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} AMpire Studio. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}