import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      where: {
        published: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        role: true,
        company: true,
        content: true,
        imageUrl: true
      }
    })

    // Transform the data to match the expected format
    const transformedTestimonials = testimonials.map(testimonial => ({
      name: testimonial.name,
      role: testimonial.role || testimonial.company || "Client",
      image: testimonial.imageUrl || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 70) + 1}.jpg`,
      content: testimonial.content
    }))

    return NextResponse.json(transformedTestimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}