import { db } from "@/lib/db"; // Corrected the import path
import ArticleForm from "../../article-form";
import { updateArticle } from "../../actions";

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const article = await db.article.findUnique({
    where: { id: params.id },
  });

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    // Add theme-aware background, text, and layout classes here
    <div className="bg-background text-foreground min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <ArticleForm article={article} action={updateArticle} />
    </div>
  );
}