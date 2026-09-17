"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { socialLinks } from "@/data/site";
import type { SiteContent } from "@/lib/content";
import { getDisplayFirstName, getNameSlug } from "@/lib/name";
import type { SocialLink } from "@/types/portfolio";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  whatsapp: MessageCircle,
  email: Mail,
} as const;

function SocialIcon({ link }: { link: SocialLink }) {
  const Icon = iconMap[link.icon];
  return (
    <a
      href={link.href}
      target={link.icon === "email" ? undefined : "_blank"}
      rel={link.icon === "email" ? undefined : "noopener noreferrer"}
      aria-label={link.label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-all hover:border-primary/50 hover:text-primary hover:bg-primary/5"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

export function Hero({ site }: { site: SiteContent }) {
  const firstName = getDisplayFirstName(site.name);
  const nameSlug = getNameSlug(site.name) || "portfolio";
  const codeName =
    site.name.trim().split(/\s+/).slice(0, 2).join(" ") || site.name;
  const links = socialLinks.map((link) =>
    link.icon === "email"
      ? { ...link, href: `mailto:${site.email}` }
      : link
  );

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden gradient-mesh pt-24 pb-12 sm:pt-28 sm:pb-16 md:pb-24"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-medium text-primary sm:text-xs"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="truncate">Available for opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-5 text-[2rem] font-semibold leading-[1.15] tracking-tight sm:mt-6 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]"
          >
            Hi, I&apos;m {firstName}.
            <br />
            <span className="text-gradient">I Build Digital Experiences.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-3 text-base font-medium text-primary sm:mt-4 sm:text-lg"
          >
            {site.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg"
          >
            {site.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap"
          >
            <a href="#projects" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                View My Work
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#contact" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Contact Me
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex items-center gap-3"
          >
            {links.map((link) => (
              <SocialIcon key={link.label} link={link} />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-4 hidden rounded-3xl bg-primary/10 blur-3xl sm:block" />

          <div className="relative glass rounded-2xl p-4 shadow-2xl shadow-black/40 sm:p-5">
            <div className="mb-4 flex items-center gap-2 border-b border-border/80 pb-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-primary/80" />
              <span className="ml-3 truncate font-mono text-xs text-muted">
                {nameSlug}.dev.tsx
              </span>
            </div>

            <pre className="overflow-x-auto font-mono text-[11px] leading-5 text-muted sm:text-[13px] sm:leading-6">
              <code>
                <span className="text-primary">const</span>{" "}
                <span className="text-foreground">developer</span> = {"{"}
                {"\n"}
                {"  "}name:{" "}
                <span className="text-emerald-300">
                  &quot;{codeName}&quot;
                </span>
                ,{"\n"}
                {"  "}role:{" "}
                <span className="text-emerald-300">
                  &quot;{site.title}&quot;
                </span>
                ,{"\n"}
                {"  "}focus: [{"\n"}
                {"    "}
                <span className="text-emerald-300">
                  &quot;Business Systems&quot;
                </span>
                ,{"\n"}
                {"    "}
                <span className="text-emerald-300">&quot;APIs&quot;</span>,{"\n"}
                {"    "}
                <span className="text-emerald-300">
                  &quot;Scalable Web Apps&quot;
                </span>
                ,{"\n"}
                {"  "}],{"\n"}
                {"  "}stack: [{"\n"}
                {"    "}
                <span className="text-emerald-300">&quot;Next.js&quot;</span>,{" "}
                <span className="text-emerald-300">&quot;TypeScript&quot;</span>
                ,{"\n"}
                {"    "}
                <span className="text-emerald-300">&quot;Node.js&quot;</span>,{" "}
                <span className="text-emerald-300">
                  &quot;PostgreSQL&quot;
                </span>
                ,{"\n"}
                {"  "}],{"\n"}
                {"  "}available: <span className="text-primary">true</span>,
                {"\n"}
                {"}"};
              </code>
            </pre>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3">
              <div className="rounded-xl border border-border bg-surface p-2.5 sm:p-3">
                <p className="text-[11px] text-muted sm:text-xs">Status</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-primary sm:text-sm">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  Open to work
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-2.5 sm:p-3">
                <p className="text-[11px] text-muted sm:text-xs">Based in</p>
                <p className="mt-1 truncate text-xs font-medium text-foreground sm:text-sm">
                  {site.location}
                </p>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 top-14 hidden rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted shadow-lg sm:block md:-left-3 md:top-16"
          >
            Next.js · Prisma
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-1 bottom-20 hidden rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted shadow-lg sm:block md:-right-2 md:bottom-24"
          >
            REST APIs · Auth
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
