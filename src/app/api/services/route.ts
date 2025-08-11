import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const services = await db.service.findMany({
      where: {
        published: true
      },
      orderBy: {
        order: 'asc'
      },
      select: {
        id: true,
        title: true,
        description: true,
        icon: true,
        features: true
      }
    })

    // Transform the data to match the expected format
    const transformedServices = services.map(service => ({
      icon: service.icon || "fas fa-code",
      title: service.title,
      color: "text-primary-light dark:text-primary-dark", // Default color
      bgColor: "bg-primary-light/10 dark:bg-primary-dark/10", // Default background
      features: service.features ? JSON.parse(service.features) : []
    }))

    return NextResponse.json(transformedServices)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}