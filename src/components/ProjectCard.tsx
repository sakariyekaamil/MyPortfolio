"use client";

import { motion } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
}

export function ProjectCard({
  project,
  index,
  onViewDetails,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group flex h-full flex-col"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors group-hover:border-primary/35">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#e8eaed]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface/80 to-transparent" />
        </div>

        <div className="relative z-10 -mt-10 mx-2.5 mb-2.5 flex flex-1 flex-col rounded-xl border border-border bg-card p-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:-mt-14 sm:mx-4 sm:mb-4 sm:p-6">
          <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg md:text-xl">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3 sm:mt-3">
            {project.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-muted sm:text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row sm:flex-wrap sm:gap-2 sm:pt-6">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "w-full justify-center sm:w-auto"
                )}
              >
                <GithubIcon className="h-3.5 w-3.5" />
                GitHub
              </a>
            ) : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "w-full justify-center sm:w-auto"
                )}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            ) : null}
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => onViewDetails(project)}
              className="w-full justify-center sm:w-auto"
            >
              <Eye className="h-3.5 w-3.5" />
              View Details
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
