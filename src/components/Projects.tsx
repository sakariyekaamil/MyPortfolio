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
    <section id="projects" className="relative py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Projects"
          subtitle="Some of the systems and applications I've built."
        />

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
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
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-t-2xl border border-border bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl sm:max-h-[85vh] sm:rounded-2xl sm:p-6"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-details-title"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground sm:right-4 sm:top-4 sm:h-9 sm:w-9"
                aria-label="Close project details"
              >
                <X className="h-4 w-4" />
              </button>

              <h3
                id="project-details-title"
                className="pr-12 text-xl font-semibold text-foreground sm:text-2xl"
              >
                {selected.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
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
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                {selected.githubUrl ? (
                  <a
                    href={selected.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants(), "w-full justify-center sm:w-auto")}
                  >
                    GitHub
                  </a>
                ) : null}
                {selected.liveUrl ? (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "w-full justify-center sm:w-auto"
                    )}
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
