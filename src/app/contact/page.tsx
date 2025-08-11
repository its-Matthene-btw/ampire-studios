import ContactSection from "@/components/ContactSection"

export default function ContactPage() {

  return (
    <div className="min-h-screen">
      {/* Contact Hero */}
      <section className="bg-white dark:bg-gray-900 pt-32 pb-16 md:pt-40 md:pb-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We’d love to hear from you! Whether you have a question about our services, need assistance, or just want to say hello, feel free to reach out.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Map Section */}
      <section className="bg-white dark:bg-gray-800 pb-16 md:pb-20">
        <div className="container mx-auto p-4 md:p-0">
          <div className="w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019598263532!2d144.9537353159042!3d-37.81720974201383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1628000000000!5m2!1sen!2sau" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </div>
        </div>
      </section>
    </div>
  )
}