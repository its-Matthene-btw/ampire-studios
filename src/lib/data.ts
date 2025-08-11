import { db } from "@/lib/db"; // Make sure this path to your db setup file is correct
import { cache } from "react";

// Function to get all published projects for the main portfolio page
export const getPublishedProjects = cache(async () => {
  try {
    const projects = await db.project.findMany({
      where: { published: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return projects;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects.");
  }
});

// Function to get a single project by its slug for the detail page
export const getProjectBySlug = cache(async (slug: string) => {
  try {
    const project = await db.project.findUnique({
      where: { slug: slug, published: true },
    });
    return project;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch project.");
  }
});

// Function to get all published testimonials
export const getPublishedTestimonials = cache(async () => {
  try {
    const testimonials = await db.testimonial.findMany({
      where: { published: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return testimonials;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch testimonials.");
  }
});

// Function to get all published articles
export const getPublishedArticles = cache(async () => {
  try {
    const articles = await db.article.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    return articles;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch articles.");
  }
});

// Function to get a single article by its slug
export const getArticleBySlug = cache(async (slug: string) => {
  try {
    const article = await db.article.findUnique({
      where: { slug: slug, published: true },
    });
    return article;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch article.");
  }
});