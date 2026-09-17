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
      className="relative min-h-screen overflow-hidden gradient-mesh pt-24 pb-16 md:pt-28 md:pb-24"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]"
          >
            Hi, I&apos;m {firstName}.
            <br />
            <span className="text-gradient">I Build Digital Experiences.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-4 text-lg text-primary font-medium"
          >
            {site.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-muted"
          >
            {site.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#projects">
              <Button size="lg">
                View My Work
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="secondary">
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
          <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-3xl" />

          <div className="relative glass rounded-2xl p-5 shadow-2xl shadow-black/40">
            <div className="mb-4 flex items-center gap-2 border-b border-border/80 pb-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-primary/80" />
              <span className="ml-3 font-mono text-xs text-muted">
                {nameSlug}.dev.tsx
              </span>
            </div>

            <pre className="overflow-x-auto font-mono text-[12px] sm:text-[13px] leading-6 text-muted">
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

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-surface p-3">
                <p className="text-xs text-muted">Status</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Open to work
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-3">
                <p className="text-xs text-muted">Based in</p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {site.location}
                </p>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-3 top-16 rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted shadow-lg"
          >
            Next.js · Prisma
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 bottom-24 rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted shadow-lg"
          >
            REST APIs · Auth
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
