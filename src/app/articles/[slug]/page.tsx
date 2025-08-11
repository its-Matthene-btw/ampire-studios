import { notFound } from "next/navigation";
import { getArticleBySlug, getPublishedArticles } from "@/lib/data";
import CtaSection from "@/components/CtaSection";
import type { Metadata } from 'next';
import { format } from 'date-fns';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

// This generates page metadata (like the title in the browser tab) dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return { title: "Article Not Found" };
  }
  return {
    title: `${article.title} | AMpire Studio`,
    description: article.excerpt,
  };
}

// This tells Next.js which article pages to generate at build time
export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function SingleArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound(); // Show a 404 page if no article is found
  }

  // Fetch a few other articles to show in the "Read Next" section
  const otherArticles = (await getPublishedArticles())
    .filter(a => a.slug !== params.slug)
    .slice(0, 3);

  return (
    <main>
      <article className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white dark:bg-gray-900">
        <header className="text-center mb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Optional: Add a category link here if you have categories */}
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">{article.title}</h1>
            <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              <div className="w-10 h-10 rounded-full mr-3 bg-gray-200"></div>
              <div>
                <strong>AMpire Studio</strong>
                <span className="mx-2">•</span>
                <time dateTime={article.createdAt.toISOString()}>
                  {format(new Date(article.createdAt), "MMMM dd, yyyy")}
                </time>
              </div>
            </div>
          </div>
        </header>

        {article.imageUrl && (
          <div className="container mx-auto px-4 max-w-6xl mb-12">
            <img src={article.imageUrl} alt={article.title} className="w-full h-auto rounded-xl shadow-lg" />
          </div>
        )}

        <div className="container mx-auto px-4 max-w-4xl">
          <div
            className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: article.content || "" }}
          />
          {/* Optional: Add share buttons or tags here */}
        </div>
      </article>

      {otherArticles.length > 0 && (
        <aside className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Read Next</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {otherArticles.map((nextArticle) => (
                <Link
                  href={`/articles/${nextArticle.slug}`}
                  key={nextArticle.id}
                  className="article-card group bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
                >
                  <div className="w-full h-48 overflow-hidden">
                    <img src={nextArticle.imageUrl || '/placeholder.jpg'} alt={nextArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 flex-grow group-hover:text-primary-light dark:group-hover:text-primary-dark">
                      {nextArticle.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      )}
      <CtaSection />
    </main>
  );
}