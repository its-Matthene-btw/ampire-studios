import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db }from "@/lib/db";
import { deleteArticle } from "./actions";

export default async function ArticlesPage() {
  const articles = await db.article.findMany({ orderBy: { createdAt: "desc" } });

  return (
    // Add the background and text color classes to this main container
    <div className="bg-background text-foreground min-h-screen p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Button asChild>
          <Link href="/admin/articles/new">Create New Article</Link>
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.published ? "Yes" : "No"}</TableCell>
                <TableCell>{article.createdAt.toLocaleDateString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/articles/edit/${article.id}`}>Edit</Link>
                  </Button>
                  <form action={deleteArticle} className="inline-block">
                    <input type="hidden" name="id" value={article.id} />
                    <Button type="submit" variant="destructive" size="sm">
                      Delete
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}