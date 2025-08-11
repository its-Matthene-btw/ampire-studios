import { Article } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ArticleFormProps {
  article?: Article;
  action: (formData: FormData) => Promise<void>;
}

export default function ArticleForm({ article, action }: ArticleFormProps) {
  return (
    <form action={action} className="space-y-4">
      {article && <input type="hidden" name="id" value={article.id} />}
      
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={article?.title} required />
      </div>
      
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" defaultValue={article?.slug} required />
      </div>
      
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" name="excerpt" defaultValue={article?.excerpt ?? ''} />
      </div>
      
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" defaultValue={article?.content} required rows={10} />
      </div>
      
      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" name="imageUrl" defaultValue={article?.imageUrl ?? ''} />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="published" name="published" defaultChecked={article?.published} />
        <Label htmlFor="published">Published</Label>
      </div>
      
      <Button type="submit">{article ? 'Update' : 'Create'} Article</Button>
    </form>
  );
}
