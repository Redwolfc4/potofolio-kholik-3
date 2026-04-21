import { Queue } from "bullmq";
import { redis } from "../redis";

export interface EmailJobData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  requestId: string;
  locale: string;
}

export const emailQueueName = "email-queue";

const globalForQueue = global as unknown as { emailQueue: Queue };

export const emailQueue =
  globalForQueue.emailQueue ||
  new Queue<EmailJobData>(emailQueueName, {
    connection: redis,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  });

if (process.env.NODE_ENV !== "production") globalForQueue.emailQueue = emailQueue;
