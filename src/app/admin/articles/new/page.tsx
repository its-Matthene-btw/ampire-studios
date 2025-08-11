import ArticleForm from "../article-form";
import { createArticle } from "../actions";

export default function NewArticlePage() {
  return (
    // Added theme-aware background, text, and layout classes
    <div className="bg-background text-foreground min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Article</h1>
      <ArticleForm action={createArticle} />
    </div>
  );
}