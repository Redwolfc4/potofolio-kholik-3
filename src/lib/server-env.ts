import "server-only";
import { z } from "zod";

const contactEnvSchema = z.object({
  CONTACT_EMAIL: z.string().email(),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive(),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
});

export type ContactEnv = z.infer<typeof contactEnvSchema>;

export function getContactEnv(): ContactEnv {
  return contactEnvSchema.parse({
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT ?? "587",
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
  });
}
