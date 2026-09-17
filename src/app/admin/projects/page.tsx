import { AdminShell } from "@/components/admin/AdminShell";
import { AdminForm } from "@/components/admin/AdminToast";
import { AddProjectDialog } from "@/components/admin/AddProjectDialog";
import { deleteProjectAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminShell title="Projects">
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-sm font-medium sm:text-base">
            All Projects ({projects.length})
          </h3>
          <AddProjectDialog />
        </div>

        <div className="space-y-3">
          {projects.length === 0 ? (
            <p className="text-sm text-muted">
              No projects yet. Click + to add one.
            </p>
          ) : null}

          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-border p-3"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-1 gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-16 w-20 shrink-0 rounded-lg border border-border bg-surface object-cover sm:w-24"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium sm:text-base">
                      {project.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted sm:text-sm">
                      {project.description}
                    </p>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block break-all text-xs text-primary"
                      >
                        {project.liveUrl}
                      </a>
                    ) : null}
                  </div>
                </div>
                <AdminForm
                  action={deleteProjectAction}
                  successMessage="Project deleted"
                  className="self-end sm:self-start"
                >
                  <input type="hidden" name="id" value={project.id} />
                  <Button type="submit" variant="ghost" size="sm">
                    Delete
                  </Button>
                </AdminForm>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
