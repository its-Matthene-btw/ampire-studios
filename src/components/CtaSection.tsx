import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-primary-light dark:bg-primary-dark text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
        <p className="max-w-2xl mx-auto text-lg mb-8 opacity-90">
          Let's discuss how we can help your business stand out online. Schedule a free consultation today.
        </p>
        <Link 
          href="/contact" 
          className="bg-white text-primary-light dark:text-primary-dark px-6 py-3 rounded-md hover:opacity-90 transition font-medium"
        >
          Get Started Now
        </Link>
      </div>
    </section>
  );
}
