import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getContactEnv } from "@/lib/server-env";
import { getDictionary } from "@/lib/i18n";
import { Locale } from "@/types/i18n";

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
  
  try {
    const common = await getDictionary(locale, "common");
    const data = await req.json();
    const { name, email, subject, message } = data ?? {};
    
    if (!name || !email || !subject || !message) {
      return buildResponse(req, requestId, 400, common.errors.validation, {
        error: "Invalid contact payload",
      });
    }

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
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
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
