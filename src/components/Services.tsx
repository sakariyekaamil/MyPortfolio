"use client";

import {
  BriefcaseBusiness,
  Code2,
  Layers3,
  PenTool,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/experience";
import type { Service } from "@/types/portfolio";

const icons = {
  web: Code2,
  fullstack: Layers3,
  business: BriefcaseBusiness,
  uiux: PenTool,
} as const;

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = icons[service.icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {service.description}
      </p>
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="services" className="relative border-y border-border/60 bg-transparent py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Services"
          subtitle="How I help teams and businesses ship reliable digital products."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
