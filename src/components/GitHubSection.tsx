"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, Activity } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/section-heading";
import { GithubIcon } from "@/components/icons";
import { getGitHubStats } from "@/data/github";
import type { GitHubStats } from "@/types/portfolio";
import type { SiteContent } from "@/lib/content";
import { getNameSlug } from "@/lib/name";
import { Button } from "@/components/ui/button";

export function GitHubSection({ site }: { site?: SiteContent }) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const fallbackUsername = site
    ? getNameSlug(site.name) || "developer"
    : "developer";

  useEffect(() => {
    void getGitHubStats().then(setStats);
  }, []);

  return (
    <section id="github" className="relative py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Building, Learning & Creating"
          subtitle="A snapshot of my development activity, stack focus, and ongoing work."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <GithubIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    @{stats?.username ?? fallbackUsername}
                  </h3>
                  <p className="text-sm text-muted">GitHub Profile</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-border bg-surface p-3 text-center">
                  <p className="text-xl font-semibold text-foreground">
                    {stats?.repositories ?? "—"}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">Repos</p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-3 text-center">
                  <p className="text-xl font-semibold text-foreground">
                    {stats?.contributions ?? "—"}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">Contributions</p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-3 text-center">
                  <p className="text-xl font-semibold text-foreground">
                    {stats?.stars ?? "—"}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">Stars</p>
                </div>
              </div>

              <a
                href={stats?.profileUrl ?? "https://github.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block"
              >
                <Button variant="secondary" className="w-full sm:w-auto">
                  <GithubIcon className="h-4 w-4" />
                  View GitHub Profile
                </Button>
              </a>
            </div>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 text-primary">
                  <Star className="h-4 w-4" />
                  <h3 className="font-semibold text-foreground">Technologies</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(stats?.languages ?? []).map((language) => (
                    <span
                      key={language}
                      className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 text-primary">
                  <Activity className="h-4 w-4" />
                  <h3 className="font-semibold text-foreground">
                    Recent Activity
                  </h3>
                </div>
                <ul className="mt-4 space-y-3">
                  {(stats?.recentActivity ?? []).map((item) => (
                    <li
                      key={item.id}
                      className="flex items-start gap-3 rounded-xl border border-border bg-surface p-3"
                    >
                      <GitFork className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {item.repo}
                        </p>
                        <p className="mt-0.5 text-xs text-muted">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
