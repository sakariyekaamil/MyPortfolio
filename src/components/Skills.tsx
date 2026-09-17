"use client";

import type { ComponentType, ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Braces,
  Code2,
  Cpu,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  KeyRound,
  Layout,
  Lock,
  Palette,
  Server,
  Shield,
  Smartphone,
  SquareTerminal,
  Wand2,
  Workflow,
} from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/section-heading";
import { GithubIcon } from "@/components/icons";
import type { Skill } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const skillIcons: Record<string, ComponentType<{ className?: string }>> = {
  React: Code2,
  "Next.js": Layout,
  TypeScript: FileCode2,
  JavaScript: Braces,
  "Tailwind CSS": Palette,
  HTML: Globe,
  CSS: Palette,
  "Node.js": Server,
  "C#": FileCode2,
  Python: FileCode2,
  "C++": Cpu,
  "Express.js": Workflow,
  "REST APIs": Workflow,
  Authentication: Lock,
  JWT: KeyRound,
  RBAC: Shield,
  Flutter: Smartphone,
  "React Native": Smartphone,
  PostgreSQL: Database,
  "SQL Server": Database,
  SSMS: Database,
  Prisma: Database,
  Supabase: Database,
  MongoDB: Database,
  Git: GitBranch,
  GitHub: GithubIcon,
  DevOps: Workflow,
  "VS Code": SquareTerminal,
  Cursor: Wand2,
  Figma: Palette,
};

function BrandMark({ children }: { children: ReactNode }) {
  return (
    <span className="text-2xl font-bold tracking-tight text-primary drop-shadow-[0_0_12px_rgba(34,197,94,0.55)]">
      {children}
    </span>
  );
}

function SkillVisual({ name }: { name: string }) {
  const Icon = skillIcons[name] ?? Code2;

  if (name === "TypeScript") {
    return (
      <BrandMark>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-primary/80 text-lg">
          TS
        </span>
      </BrandMark>
    );
  }

  if (name === "JavaScript") {
    return (
      <BrandMark>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-primary/80 text-lg">
          JS
        </span>
      </BrandMark>
    );
  }

  if (name === "Next.js") {
    return (
      <BrandMark>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/80 text-xl">
          N
        </span>
      </BrandMark>
    );
  }

  if (name === "React") {
    return (
      <Icon className="h-10 w-10 text-primary drop-shadow-[0_0_14px_rgba(34,197,94,0.55)]" />
    );
  }

  if (name === "HTML") {
    return <BrandMark>{"</>"}</BrandMark>;
  }

  if (name === "Node.js") {
    return <Icon className="h-10 w-10 text-primary drop-shadow-[0_0_14px_rgba(34,197,94,0.55)]" />;
  }

  return (
    <Icon className="h-10 w-10 text-primary drop-shadow-[0_0_14px_rgba(34,197,94,0.55)]" />
  );
}

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/45"
    >
      <div className="relative z-10 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            {skill.category}
          </p>
          <h3 className="mt-1 text-base font-semibold text-foreground">
            {skill.name}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {skill.description}
          </p>
        </div>

        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full bg-primary/15 blur-xl transition-opacity group-hover:bg-primary/25"
          />
          <div className="relative flex items-center justify-center">
            <SkillVisual name={skill.name} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Skills({
  skills,
  categories,
}: {
  skills: Skill[];
  categories: string[];
}) {
  return (
    <section
      id="skills"
      className="relative border-y border-border/60 bg-transparent py-14 sm:py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills"
          subtitle="Technologies I use to design, build, and ship production software."
        />

        <div className="space-y-8 sm:space-y-10">
          {categories.map((category) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );

            return (
              <Reveal key={category}>
                <div>
                  <h3
                    className={cn(
                      "mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:mb-4 sm:text-sm"
                    )}
                  >
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categorySkills.map((skill, index) => (
                      <SkillCard
                        key={skill.name}
                        skill={skill}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
