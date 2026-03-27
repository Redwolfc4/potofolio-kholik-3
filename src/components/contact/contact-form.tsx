"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { emailService } from "@/services/email.service";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

import { ContactDict } from "@/types/i18n";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .min(5, "Subject must be at least 5 characters"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm({ dict }: { dict: ContactDict }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const response = await emailService.sendEmail(data);
      if (response.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("error");
    }
  };

  const handleEnterSubmit = async (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key !== "Enter" || event.shiftKey || event.currentTarget.tagName === "TEXTAREA") {
      return;
    }

    event.preventDefault();

    if (status === "loading") {
      return;
    }

    const isValid = await trigger();
    if (isValid) {
      void handleSubmit(onSubmit)();
    }
  };

  return (
    <section id="contact" className="py-20 w-full px-10">
      <h2 className="text-3xl font-bold mb-10 text-center">{dict.title}</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mx-auto rounded-xl border border-border/80 bg-card/85 p-8 shadow-[0_24px_60px_rgba(95,58,34,0.14)] backdrop-blur-sm dark:shadow-[0_24px_60px_rgba(0,0,0,0.32)]"
      >
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-10">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h3 className="text-xl font-bold">{dict.success.title}</h3>
            <p className="text-muted-foreground text-center">
              {dict.success.message}
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {dict.success.button}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">{dict.name}</label>
              <input
                id="name"
                {...register("name")}
                required
                aria-invalid={errors.name ? "true" : "false"}
                onKeyDown={handleEnterSubmit}
                className={`w-full rounded-lg border bg-background/70 px-4 py-3 shadow-inner transition-all focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? "border-red-500 focus:ring-red-500" : "border-border/80"
                  }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">{dict.email}</label>
              <input
                id="email"
                type="email"
                {...register("email")}
                required
                aria-invalid={errors.email ? "true" : "false"}
                onKeyDown={handleEnterSubmit}
                className={`w-full rounded-lg border bg-background/70 px-4 py-3 shadow-inner transition-all focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? "border-red-500 focus:ring-red-500" : "border-border/80"
                  }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">{dict.subject}</label>
              <input
                id="subject"
                {...register("subject")}
                required
                aria-invalid={errors.subject ? "true" : "false"}
                onKeyDown={handleEnterSubmit}
                className={`w-full rounded-lg border bg-background/70 px-4 py-3 shadow-inner transition-all focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary ${errors.subject ? "border-red-500 focus:ring-red-500" : "border-border/80"
                  }`}
              />
              {errors.subject && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.subject.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">{dict.message}</label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                required
                aria-invalid={errors.message ? "true" : "false"}
                onKeyDown={handleEnterSubmit}
                className={`w-full rounded-lg border bg-background/70 px-4 py-3 shadow-inner transition-all focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary ${errors.message ? "border-red-500 focus:ring-red-500" : "border-border/80"
                  }`}
              />
              {errors.message && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === "loading" ? dict.sending : dict.send}
              <Send className="w-4 h-4" />
            </button>
            {status === "error" && (
              <p className="text-sm text-red-500 text-center">
                {dict.error}
              </p>
            )}
          </form>
        )}
      </motion.div>
    </section>
  );
}
