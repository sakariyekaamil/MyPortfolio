"use client";

import { Reveal, SectionHeading } from "@/components/ui/section-heading";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { stats } from "@/data/site";
import type { SiteContent } from "@/lib/content";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractNameFromText(text: string, fallbackName: string) {
  const match = text.match(/I['’]m\s+(.+?)\s*,/i);
  if (match?.[1]?.trim()) {
    return match[1].trim();
  }
  return fallbackName.trim();
}

function ParagraphWithName({
  text,
  name,
}: {
  text: string;
  name: string;
}) {
  const highlightName = extractNameFromText(text, name);
  if (!highlightName) {
    return <>{text}</>;
  }

  const parts = text.split(
    new RegExp(`(${escapeRegExp(highlightName)})`, "gi")
  );

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlightName.toLowerCase() ? (
                          <span
            key={`${part}-${index}`}
            className="font-bold text-foreground"
            style={{ fontWeight: 700 }}
          >
            {part}
          </span>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        )
      )}
    </>
  );
}

export function About({ site }: { site: SiteContent }) {
  return (
    <section id="about" className="relative py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About Me" subtitle={site.aboutSubtitle} />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <Reveal>
            <div className="space-y-4 text-sm leading-relaxed text-muted sm:space-y-5 sm:text-base md:text-lg">
              {site.aboutParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>
                  <ParagraphWithName text={paragraph} name={site.name} />
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="rounded-2xl border border-border bg-card p-4 sm:p-5 transition-colors hover:border-primary/40"
                >
                  <p className="text-2xl font-semibold text-primary sm:text-3xl">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="mt-2 text-xs leading-snug text-muted sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
