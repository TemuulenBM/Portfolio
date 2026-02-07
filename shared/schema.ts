import { z } from "zod";

// User schema for validation
export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof userSchema>;

// Холбоо барих формын баталгаажуулалтын схем
export const contactMessageSchema = z.object({
  name: z.string().min(1, "Нэрээ оруулна уу"),
  email: z.string().email("Зөв имэйл хаяг оруулна уу"),
  subject: z.string().min(1, "Гарчиг оруулна уу"),
  message: z.string().min(10, "Мессеж хамгийн багадаа 10 тэмдэгт байна"),
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;
