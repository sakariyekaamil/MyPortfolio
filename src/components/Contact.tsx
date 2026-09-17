"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal, SectionHeading } from "@/components/ui/section-heading";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { socialLinks } from "@/data/site";
import type { SiteContent } from "@/lib/content";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact({ site }: { site: SiteContent }) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      console.info("Contact form submission:", values);
      toast.success("Message sent successfully. I'll get back to you soon.");
      reset();
    } catch {
      toast.error(
        "Something went wrong. Please try again or email me directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative border-t border-border/60 bg-transparent py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Let's Build Something Together"
          subtitle="Have a project, business idea, or software challenge? Let's talk."
        />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">Email</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-1 block font-bold text-foreground transition-colors hover:text-primary"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">Location</p>
                    <p className="mt-1 font-bold text-foreground">{site.location}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-primary">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">Phone</p>
                    <a
                      href={`tel:+252${site.phone.replace(/\s+/g, "")}`}
                      className="mt-1 block font-bold text-foreground transition-colors hover:text-primary"
                    >
                      {site.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon =
                    link.icon === "github"
                      ? GithubIcon
                      : link.icon === "linkedin"
                        ? LinkedinIcon
                        : link.icon === "whatsapp"
                          ? MessageCircle
                          : Mail;
                  const href =
                    link.icon === "email" ? `mailto:${site.email}` : link.href;
                  return (
                    <a
                      key={link.label}
                      href={href}
                      target={link.icon === "email" ? undefined : "_blank"}
                      rel={
                        link.icon === "email"
                          ? undefined
                          : "noopener noreferrer"
                      }
                      aria-label={link.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 rounded-2xl border border-border bg-card p-5 sm:p-7"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                  />
                  {errors.name ? (
                    <p className="text-xs text-red-400">{errors.name.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email ? (
                    <p className="text-xs text-red-400">{errors.email.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Project inquiry"
                  aria-invalid={!!errors.subject}
                  {...register("subject")}
                />
                {errors.subject ? (
                  <p className="text-xs text-red-400">
                    {errors.subject.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project or challenge..."
                  aria-invalid={!!errors.message}
                  {...register("message")}
                />
                {errors.message ? (
                  <p className="text-xs text-red-400">
                    {errors.message.message}
                  </p>
                ) : null}
              </div>

              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
