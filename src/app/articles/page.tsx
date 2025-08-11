import { getPublishedArticles } from "@/lib/data";
import { ArticlesClientComponent } from "@/components/articles-client";
import CtaSection from "@/components/CtaSection";
import type { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Articles | AMpire Studio',
  description: 'Explore our latest articles on design trends, development techniques, and digital marketing strategies.',
};

export default async function ArticlesPage() {
  const allArticles = await getPublishedArticles();

  // Find the most recent article to feature. Can be null if no articles exist.
  const featuredArticle = allArticles.length > 0 ? allArticles[0] : null;

  return (
    <main>
      <section id="articles-hero" className="bg-white dark:bg-gray-900 pt-32 pb-16 md:pt-40 md:pb-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Insights & Ideas from Our Studio</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Explore our latest articles on design trends, development techniques, and digital marketing strategies to help you grow.
          </p>
        </div>
      </section>

      {featuredArticle && (
        <section id="featured-article" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="lg:w-1/2">
                <Link href={`/articles/${featuredArticle.slug}`} className="block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img src={featuredArticle.imageUrl || '/placeholder.jpg'} alt={featuredArticle.title} className="w-full h-auto object-cover" />
                </Link>
              </div>
              <div className="lg:w-1/2">
                <span className="inline-block bg-primary-light/10 text-primary-light dark:bg-primary-dark/10 dark:text-primary-dark font-semibold px-3 py-1 rounded-full text-sm mb-4">Featured Article</span>
                <Link href={`/articles/${featuredArticle.slug}`}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:text-primary-light dark:hover:text-primary-dark transition-colors">
                    {featuredArticle.title}
                  </h2>
                </Link>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  {/* Placeholder for author image */}
                  <div className="w-10 h-10 rounded-full mr-3 bg-gray-200"></div>
                  <div>
                    <strong>AMpire Studio</strong>
                    <span className="mx-2">•</span>
                    <time dateTime={featuredArticle.createdAt.toISOString()}>
                      {format(new Date(featuredArticle.createdAt), "MMMM dd, yyyy")}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="all-articles" className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">More To Explore</h2>
          <ArticlesClientComponent articles={allArticles} />
        </div>
      </section>
      <CtaSection />
    </main>
  );
}