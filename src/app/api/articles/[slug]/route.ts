import { NextResponse } from 'next/server'
import { db } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    const article = await db.article.findUnique({
      where: { slug: slug, published: true },
    })

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}