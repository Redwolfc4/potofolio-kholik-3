import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

  try {
    const data = await req.json();
    const { name, email, subject, message } = data ?? {};
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!name || !email || !subject || !message) {
      return buildResponse(req, requestId, 400, "Contact form validation failed", {
        error: "Missing required fields",
      });
    }

    if (!contactEmail) {
      return buildResponse(req, requestId, 500, "Contact service is not configured", {
        error: "Missing contact configuration",
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: contactEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return buildResponse(req, requestId, 200, "Email sent successfully");
  } catch (error) {
    console.error("Contact API error:", { requestId, error });
    return buildResponse(req, requestId, 500, "Failed to send email", {
      error: "Internal server error",
    });
  }
}
