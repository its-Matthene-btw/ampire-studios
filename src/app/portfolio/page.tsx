import { getPublishedProjects, getPublishedTestimonials } from "@/lib/data"; // Import the new function
import { PortfolioClientComponent } from "@/components/portfolio-client";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Portfolio | AMpire Studio',
  description: 'Explore a selection of our recent projects and see what our clients have to say.',
};

export default async function PortfolioPage() {
  // Fetch both projects and testimonials on the server
  const allProjects = await getPublishedProjects();
  const allTestimonials = await getPublishedTestimonials();

  return (
    <main>
      <section id="portfolio-gallery" className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">Our Recent Work</h1>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mt-4">
              Explore a selection of our projects. Use the filters to find work relevant to your needs.
            </p>
          </div>
          
          <PortfolioClientComponent projects={allProjects} />
        </div>
      </section>

      {/* Testimonials Section - Now with dynamic data */}
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
            {allTestimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img src={testimonial.imageUrl || ''} alt={testimonial.name} className="w-full h-full object-cover" />
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


      <section className="py-16 md:py-24 bg-primary-light dark:bg-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
            <p className="max-w-2xl mx-auto text-lg mb-8 opacity-90">
                Let's discuss how we can help your business stand out online. Schedule a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="/contact" className="bg-white text-primary-light dark:text-primary-dark px-6 py-3 rounded-md hover:opacity-90 transition font-medium">
                    Get Started Now
                </a>
            </div>
        </div>
      </section>
    </main>
  );
}