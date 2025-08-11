"use client";

import { useState } from "react";
import Link from "next/link";
import { type Article } from "@prisma/client";
import { format } from "date-fns";

const ARTICLES_PER_PAGE = 6;

interface ArticlesClientProps {
  articles: Article[];
}

export function ArticlesClientComponent({ articles }: ArticlesClientProps) {
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  const articlesToShow = articles.slice(0, visibleCount);
  const hasMoreArticles = visibleCount < articles.length;

  return (
    <>
      <div id="articles-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articlesToShow.map((article) => (
          <Link
            href={`/articles/${article.slug}`}
            key={article.id}
            className="article-card group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <div className="w-full h-48 overflow-hidden">
              <img
                src={article.imageUrl || "/placeholder.jpg"}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              {/* Optional: Add a category badge here if you add it to your schema */}
              <h3 className="text-xl font-bold mb-3 flex-grow group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
                {article.title}
              </h3>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
                <time dateTime={article.createdAt.toISOString()}>
                  {format(new Date(article.createdAt), "MMMM dd, yyyy")}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMoreArticles && (
        <div id="load-more-container" className="text-center mt-16">
          <button
            onClick={() => setVisibleCount((prev) => prev + ARTICLES_PER_PAGE)}
            className="bg-primary-light dark:bg-primary-dark text-white px-6 py-3 rounded-md hover:opacity-90 transition font-medium"
          >
            Load More Articles
          </button>
        </div>
      )}

      <style jsx global>{`
        .article-card {
          /* Add any specific styles for article cards if needed */
        }
      `}</style>
    </>
  );
}