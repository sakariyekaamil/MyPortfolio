"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

export function Projects({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Projects"
          subtitle="Some of the systems and applications I've built."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onViewDetails={setSelected}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-details-title"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground"
                aria-label="Close project details"
              >
                <X className="h-4 w-4" />
              </button>

              <h3
                id="project-details-title"
                className="pr-10 text-2xl font-semibold text-foreground"
              >
                {selected.title}
              </h3>
              <p className="mt-4 text-muted leading-relaxed">
                {selected.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {selected.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {selected.githubUrl ? (
                  <a
                    href={selected.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants())}
                  >
                    GitHub
                  </a>
                ) : null}
                {selected.liveUrl ? (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "secondary" }))}
                  >
                    Live Demo
                  </a>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
