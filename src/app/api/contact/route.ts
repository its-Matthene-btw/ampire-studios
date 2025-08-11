import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create contact submission
    const contactSubmission = await db.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: service || null,
        message,
      },
    })

    return NextResponse.json({
      success: true,
      id: contactSubmission.id,
      message: "Contact form submitted successfully"
    })
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}