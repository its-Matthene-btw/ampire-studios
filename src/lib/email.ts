import nodemailer from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: EmailOptions) {
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: process.env.SMTP_FROM || `"My Company" <${process.env.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text || "",
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error }
  }
}

export async function sendContactNotification(contactData: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}) {
  const subject = `New Contact Form Submission from ${contactData.name}`
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${contactData.name}</p>
    <p><strong>Email:</strong> ${contactData.email}</p>
    ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ""}
    ${contactData.subject ? `<p><strong>Subject:</strong> ${contactData.subject}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${contactData.message.replace(/\n/g, "<br>")}</p>
    <hr>
    <p><em>This email was sent from the contact form on your website.</em></p>
  `

  const text = `
    New Contact Form Submission
    
    Name: ${contactData.name}
    Email: ${contactData.email}
    ${contactData.phone ? `Phone: ${contactData.phone}` : ""}
    ${contactData.subject ? `Subject: ${contactData.subject}` : ""}
    
    Message:
    ${contactData.message}
    
    ---
    This email was sent from the contact form on your website.
  `

  return sendEmail({
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER!,
    subject,
    html,
    text,
  })
}

export async function sendAutoReply(contactData: {
  name: string
  email: string
}) {
  const subject = "Thank you for contacting us"
  const html = `
    <h2>Thank You for Contacting Us</h2>
    <p>Dear ${contactData.name},</p>
    <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
    <p>We typically respond to inquiries within 24-48 hours during business days.</p>
    <p>If you need immediate assistance, please don't hesitate to call us at +1 (555) 123-4567.</p>
    <p>Best regards,<br>The My Company Team</p>
  `

  const text = `
    Thank You for Contacting Us
    
    Dear ${contactData.name},
    
    Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.
    
    We typically respond to inquiries within 24-48 hours during business days.
    
    If you need immediate assistance, please don't hesitate to call us at +1 (555) 123-4567.
    
    Best regards,
    The My Company Team
  `

  return sendEmail({
    to: contactData.email,
    subject,
    html,
    text,
  })
}