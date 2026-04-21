import { Worker, Job } from "bullmq";
import nodemailer from "nodemailer";
import { redis } from "../redis";
import { getContactEnv } from "@/lib/server-env";
import { EmailJobData, emailQueueName } from "./email-queue";
import { buildContactEmailHtml, buildContactEmailText } from "@/lib/email-template";

export function initEmailWorker() {
  const worker = new Worker<EmailJobData>(
    emailQueueName,
    async (job: Job<EmailJobData>) => {
      const { name, email, subject, message, timestamp, requestId } = job.data;
      
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

      const emailParams = { name, email, subject, message, timestamp, requestId };

      console.log(`[Worker] Processing email job ${job.id} for request ${requestId}`);

      await transporter.sendMail({
        from: `"Portfolio Contact" <${contactEnv.SMTP_USER}>`,
        to: contactEnv.CONTACT_EMAIL,
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        text: buildContactEmailText(emailParams),
        html: buildContactEmailHtml(emailParams),
      });
      
      console.log(`[Worker] Successfully sent email for job ${job.id}`);
    },
    {
      connection: redis,
      // Optional: limit concurrency if needed
      concurrency: 5,
    }
  );

  worker.on("failed", (job, err) => {
    console.error(`[Worker] Email job ${job?.id} failed:`, err);
  });

  return worker;
}
