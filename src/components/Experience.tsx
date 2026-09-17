"use client";

import { Reveal, SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative border-y border-border/60 bg-transparent py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience"
          subtitle="Building software products and supporting clients in real business environments."
        />

        <div className="relative ml-2 space-y-8 border-l border-border pl-6 sm:pl-8">
          {experience.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <div className="relative">
                <span className="absolute -left-[1.9rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background sm:-left-[2.4rem]" />
                <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {item.company}
                      </h3>
                      <p className="mt-1 font-medium text-primary">{item.role}</p>
                    </div>
                    <span className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted">
                      {item.period}
                    </span>
                  </div>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {item.responsibilities.map((responsibility) => (
                      <li
                        key={responsibility}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
