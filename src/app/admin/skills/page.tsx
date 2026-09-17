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
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <AdminForm
          action={createSkillAction}
          successMessage="Skill saved successfully"
          className="space-y-4 rounded-2xl border border-border bg-card p-5"
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
              placeholder="Frontend / Backend / Database / Tools"
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

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-4 font-medium">All Skills ({skills.length})</h3>
          <div className="space-y-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-border p-3"
              >
                <div>
                  <p className="font-medium">{skill.name}</p>
                  <p className="text-xs text-muted">{skill.category}</p>
                  <p className="mt-1 text-sm text-muted">{skill.description}</p>
                </div>
                <AdminForm
                  action={deleteSkillAction}
                  successMessage="Skill deleted"
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
