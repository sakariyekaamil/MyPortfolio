"use client";

import { Reveal, SectionHeading } from "@/components/ui/section-heading";
import { education } from "@/data/experience";

export function Education() {
  const degree = education.find((item) => item.type === "degree");
  const certificates = education.filter((item) => item.type === "certificate");

  return (
    <section id="education" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Education"
          subtitle="Formal education and practical certifications that shaped my engineering foundation."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {degree ? (
            <Reveal>
              <div className="h-full rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.16em] text-primary">
                  Degree
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">
                  {degree.title}
                </h3>
                <p className="mt-2 text-muted">{degree.institution}</p>
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={0.08}>
            <div className="relative ml-2 space-y-5 border-l border-border pl-6">
              {certificates.map((item) => (
                <div key={item.id} className="relative">
                  <span className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                  <div className="rounded-xl border border-border bg-card p-4">
                    <h3 className="font-medium text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">{item.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
