import { AdminShell } from "@/components/admin/AdminShell";
import { AdminForm } from "@/components/admin/AdminToast";
import { createProjectAction, deleteProjectAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminShell title="Projects">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <AdminForm
          action={createProjectAction}
          successMessage="Project saved successfully"
          className="space-y-4 rounded-2xl border border-border bg-card p-5"
        >
          <h3 className="font-medium">Add Project</h3>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required className="bg-surface" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              required
              className="bg-surface"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma separated)</Label>
            <Input
              id="technologies"
              name="technologies"
              placeholder="Next.js, TypeScript, Prisma"
              className="bg-surface"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image path</Label>
            <Input
              id="image"
              name="image"
              placeholder="/projects/restaurant.png"
              className="bg-surface"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live Demo URL</Label>
            <Input id="liveUrl" name="liveUrl" className="bg-surface" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input id="githubUrl" name="githubUrl" className="bg-surface" />
          </div>
          <Button type="submit">Save Project</Button>
        </AdminForm>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-4 font-medium">All Projects ({projects.length})</h3>
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-border p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">
                      {project.description}
                    </p>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-xs text-primary"
                      >
                        {project.liveUrl}
                      </a>
                    ) : null}
                  </div>
                  <AdminForm
                    action={deleteProjectAction}
                    successMessage="Project deleted"
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
      </div>
    </AdminShell>
  );
}
