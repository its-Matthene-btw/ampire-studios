import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { unlink } from "fs/promises"
import path from "path"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get file info before deleting
    const mediaFile = await db.media.findUnique({
      where: { id: params.id },
    })

    if (!mediaFile) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Delete file from filesystem
    const filePath = path.join(process.cwd(), "public", mediaFile.filePath)
    try {
      await unlink(filePath)
    } catch (error) {
      console.error("Error deleting file from filesystem:", error)
    }

    // Delete from database
    await db.media.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "File deleted successfully" })
  } catch (error) {
    console.error("Error deleting file:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}