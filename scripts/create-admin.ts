import { db } from "../src/lib/db"
import bcrypt from "bcryptjs"

async function createAdmin() {
  const email = "admin@example.com"
  const password = "admin123"
  const name = "Admin User"

  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    const admin = await db.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    console.log("Admin created successfully:", {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    })
    console.log("Login credentials:")
    console.log("Email:", email)
    console.log("Password:", password)
  } catch (error) {
    console.error("Error creating admin:", error)
  }
}

createAdmin()