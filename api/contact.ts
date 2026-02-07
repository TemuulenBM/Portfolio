import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { z } from "zod";

// Холбоо барих формын баталгаажуулалтын схем
const contactMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Оролтыг баталгаажуулах
    const result = contactMessageSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Оролтын мэдээлэл буруу байна",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { name, email, subject, message } = result.data;

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return res.status(500).json({
        message: "Имэйл илгээх тохиргоо дутуу байна",
      });
    }

    const resend = new Resend(resendApiKey);

    // Resend-ээр имэйл илгээх
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "temuulen.developer@gmail.com",
      subject: `[Portfolio] ${subject}`,
      replyTo: email,
      html: `
        <h2>Портфолиогоос шинэ мессеж</h2>
        <p><strong>Нэр:</strong> ${name}</p>
        <p><strong>Имэйл:</strong> ${email}</p>
        <p><strong>Гарчиг:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      return res.status(500).json({
        message: "Имэйл илгээхэд алдаа гарлаа",
      });
    }

    return res.status(200).json({ message: "Мессеж амжилттай илгээгдлээ" });
  } catch {
    return res.status(500).json({
      message: "Серверийн алдаа гарлаа",
    });
  }
}
