"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { emailService } from "@/services/email.service";
import { m, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

import { ContactDict } from "@/types/i18n";
import { useMotionEnabled } from "@/hooks/use-motion-enabled";
import { whenMotionEnabled } from "@/lib/motion";

export default function ContactForm({ dict, lang }: { dict: ContactDict; lang: string }) {
  const motionEnabled = useMotionEnabled();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [countdown, setCountdown] = useState(3);

  const contactSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, dict.validation?.name || "Name is required")
      .min(2, dict.validation?.name_min || "Name must be at least 2 characters"),
    email: z
      .string()
      .trim()
      .min(1, dict.validation?.email || "Email is required")
      .email(dict.validation?.email || "Please enter a valid email address"),
    subject: z
      .string()
      .trim()
      .min(1, dict.validation?.subject || "Subject is required")
      .min(5, dict.validation?.subject_min || "Subject must be at least 5 characters"),
    message: z
      .string()
      .trim()
      .min(1, dict.validation?.message || "Message is required")
      .min(10, dict.validation?.message_min || "Message must be at least 10 characters"),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === "success") {
      setCountdown(3);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setStatus("idle");
            clearInterval(timer);
            return 3;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status]);

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const response = await emailService.sendEmail(data, lang);
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
    <section id="contact" className="py-20 w-full px-10 relative overflow-hidden">
      {/* Simplified background for performance */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <m.h2
        {...whenMotionEnabled(motionEnabled, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
        })}
        className="text-3xl font-bold mb-10 text-center"
      >
        {dict.title}
      </m.h2>
      <m.div
        {...whenMotionEnabled(motionEnabled, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
        })}
        className="mx-auto rounded-xl border border-border/80 bg-card/85 p-8 shadow-[0_24px_60px_rgba(95,58,34,0.14)] backdrop-blur-sm dark:shadow-[0_24px_60px_rgba(0,0,0,0.32)] min-h-[400px]"
      >
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <m.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="flex flex-col items-center justify-center space-y-4 py-10"
            >
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h3 className="text-xl font-bold">{dict.success.title}</h3>
              <div className="text-center space-y-2">
                <p className="text-muted-foreground max-w-md">
                  {dict.success.message}
                </p>
                <p className="text-xs text-muted-foreground italic">
                  {dict.success.countdown?.replace("{seconds}", countdown.toString()) || 
                   `Returning to form in ${countdown}s...`}
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
              >
                {dict.success.button}
              </button>
            </m.div>
          ) : (
            <m.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-6"
            >
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">{dict.name}</label>
                <input
                  id="name"
                  {...register("name")}
                  required
                  aria-invalid={errors.name ? "true" : "false"}
                  onKeyDown={handleEnterSubmit}
                  className={`w-full rounded-lg border bg-background/70 px-4 py-3 shadow-inner transition-all focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.name ? "border-red-500 focus:ring-red-500" : "border-border/80"
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
                  className={`w-full rounded-lg border bg-background/70 px-4 py-3 shadow-inner transition-all focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email ? "border-red-500 focus:ring-red-500" : "border-border/80"
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
                  className={`w-full rounded-lg border bg-background/70 px-4 py-3 shadow-inner transition-all focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.subject ? "border-red-500 focus:ring-red-500" : "border-border/80"
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
                  className={`w-full rounded-lg border bg-background/70 px-4 py-3 shadow-inner transition-all focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.message ? "border-red-500 focus:ring-red-500" : "border-border/80"
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
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {status === "loading" ? dict.sending : dict.send}
                <Send className="w-4 h-4" />
              </button>
              {status === "error" && (
                <p className="text-sm text-red-500 text-center">
                  {dict.error}
                </p>
              )}
            </m.form>
          )}
        </AnimatePresence>
      </m.div>
    </section>
  );
}
