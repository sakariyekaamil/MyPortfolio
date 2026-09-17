import { AdminShell } from "@/components/admin/AdminShell";
import { AdminForm } from "@/components/admin/AdminToast";
import { createSkillAction, deleteSkillAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminShell title="Skills">
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_1.2fr]">
        <AdminForm
          action={createSkillAction}
          successMessage="Skill saved successfully"
          className="space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
        >
          <h3 className="font-medium">Add Skill</h3>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required className="bg-surface" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              placeholder="Frontend / Backend / Mobile / Database / Tools"
              required
              className="bg-surface"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              required
              className="bg-surface"
            />
          </div>
          <Button type="submit">Save Skill</Button>
        </AdminForm>

        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <h3 className="mb-4 font-medium">All Skills ({skills.length})</h3>
          <div className="space-y-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex flex-col gap-3 rounded-xl border border-border p-3 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-medium">{skill.name}</p>
                  <p className="text-xs text-muted">{skill.category}</p>
                  <p className="mt-1 text-sm text-muted">{skill.description}</p>
                </div>
                <AdminForm
                  action={deleteSkillAction}
                  successMessage="Skill deleted"
                  className="shrink-0 self-end sm:self-start"
                >
                  <input type="hidden" name="id" value={skill.id} />
                  <Button type="submit" variant="ghost" size="sm">
                    Delete
                  </Button>
                </AdminForm>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
