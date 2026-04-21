import { NextResponse } from "next/server";
import { getContactEnv } from "@/lib/server-env";
import { getDictionary } from "@/lib/i18n";
import { Locale } from "@/types/i18n";
import { rateLimit } from "@/lib/rate-limit";
import nodemailer from "nodemailer";
import { buildContactEmailHtml, buildContactEmailText } from "@/lib/email-template";

type ContactApiResponse = {
  success: boolean;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  requestId: string;
  message: string;
  error?: string;
};

function buildResponse(
  req: Request,
  requestId: string,
  statusCode: number,
  message: string,
  options?: { error?: string },
) {
  const body: ContactApiResponse = {
    success: statusCode >= 200 && statusCode < 300,
    statusCode,
    timestamp: new Date().toISOString(),
    path: new URL(req.url).pathname,
    method: req.method,
    requestId,
    message,
    ...(options?.error ? { error: options.error } : {}),
  };

  return NextResponse.json(body, { status: statusCode });
}

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  const locale = (req.headers.get("x-locale") as Locale) || "en";
  const timestamp = new Date().toISOString();

  try {
    const common = await getDictionary(locale, "common");
    const data = await req.json();
    const { name, email, subject, message } = data ?? {};
    
    if (!name || !email || !subject || !message) {
      return buildResponse(req, requestId, 400, common.errors.validation, {
        error: "Invalid contact payload",
      });
    }

    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const rateLimitResult = await rateLimit(ip, { limit: 10, windowMs: 60 * 1000 });
    
    if (!rateLimitResult.success) {
      return buildResponse(req, requestId, 429, "Too Many Requests", {
        error: "Rate limit exceeded. Please try again later.",
      });
    }

    const emailParams = { name, email, subject, message, timestamp, requestId, locale };

    // Direct email sending for Serverless compatibility (Netlify/Vercel)
    const contactEnv = getContactEnv();
    const transporter = nodemailer.createTransport({
      host: contactEnv.SMTP_HOST,
      port: contactEnv.SMTP_PORT,
      secure: contactEnv.SMTP_PORT === 465,
      auth: {
        user: contactEnv.SMTP_USER,
        pass: contactEnv.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${contactEnv.SMTP_USER}>`,
      to: contactEnv.CONTACT_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: buildContactEmailText(emailParams),
      html: buildContactEmailHtml(emailParams),
    });

    return buildResponse(req, requestId, 200, common.contact.success.title);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Contact API error:", { requestId, error: errorMessage });
    
    // Attempt to get dictionary for error response
    const common = await getDictionary(locale, "common").catch(() => null);
    const fallbackMessage = common?.errors?.server || "Contact service unavailable";

    return buildResponse(req, requestId, 500, fallbackMessage, {
      error: "Contact service unavailable",
    });
  }
}
