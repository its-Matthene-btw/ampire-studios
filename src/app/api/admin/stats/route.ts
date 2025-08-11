import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [projects, testimonials, articles, media, contactMessages] = await Promise.all([
      db.project.count(),
      db.testimonial.count(),
      db.article.count(),
      db.media.count(),
      db.contactSubmission.count({ where: { read: false } }),
    ])

    return NextResponse.json({
      projects,
      testimonials,
      articles,
      media,
      contactMessages,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}