"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

import { db } from "@/lib/db";

export async function createArticle(formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string),
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    imageUrl: formData.get("imageUrl") as string,
    published: formData.get("published") === "on",
  };

  await db.article.create({ data });

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function updateArticle(formData: FormData) {
  const id = formData.get("id") as string;

  const data = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string),
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    imageUrl: formData.get("imageUrl") as string,
    published: formData.get("published") === "on",
  };

  await db.article.update({ where: { id }, data });

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function deleteArticle(formData: FormData) {
  const id = formData.get("id") as string;

  await db.article.delete({ where: { id } });

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}
