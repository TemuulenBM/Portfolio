"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type ContactForm = {
  name: string
  email: string
  message: string
}

export async function sendContactEmail(form: ContactForm) {
  const { name, email, message } = form

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." }
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "temuulen.developer@gmail.com",
      replyTo: email,
      subject: `Portfolio: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return { success: true }
  } catch {
    return { success: false, error: "Failed to send message. Please try again." }
  }
}
