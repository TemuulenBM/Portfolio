import type { Express } from "express";
import type { Server } from "http";
import { Resend } from "resend";
import { contactMessageSchema } from "@shared/schema";
import { log } from "./index";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Холбоо барих формоос имэйл илгээх endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Оролтыг Zod schema-аар баталгаажуулах
      const result = contactMessageSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Оролтын мэдээлэл буруу байна",
          errors: result.error.flatten().fieldErrors,
        });
      }

      const { name, email, subject, message } = result.data;

      // Resend API түлхүүр шалгах
      const resendApiKey = process.env.RESEND_API_KEY;
      if (!resendApiKey) {
        log("RESEND_API_KEY тохируулаагүй байна", "contact");
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
        log(`Имэйл илгээхэд алдаа гарлаа: ${error.message}`, "contact");
        return res.status(500).json({
          message: "Имэйл илгээхэд алдаа гарлаа",
        });
      }

      log(`Имэйл амжилттай илгээгдлээ: ${email} -> ${subject}`, "contact");
      return res.status(200).json({ message: "Мессеж амжилттай илгээгдлээ" });
    } catch (err: any) {
      log(`Имэйл endpoint алдаа: ${err.message}`, "contact");
      return res.status(500).json({
        message: "Серверийн алдаа гарлаа",
      });
    }
  });

  return httpServer;
}
