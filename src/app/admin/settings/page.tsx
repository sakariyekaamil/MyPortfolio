import { AdminShell } from "@/components/admin/AdminShell";
import { AdminForm } from "@/components/admin/AdminToast";
import { updateSettingsAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function AdminSettingsPage() {
  const settings = await prisma.setting.findMany();
  const map = Object.fromEntries(settings.map((item) => [item.key, item.value]));

  return (
    <AdminShell title="Settings">
      <AdminForm
        action={updateSettingsAction}
        successMessage="Settings saved successfully"
        className="max-w-2xl space-y-4 rounded-2xl border border-border bg-card p-5"
      >
        <div className="space-y-2">
          <Label htmlFor="siteName">Site Name</Label>
          <Input
            id="siteName"
            name="siteName"
            defaultValue={map.siteName ?? ""}
            className="bg-surface"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="siteTitle">Professional Title</Label>
          <Input
            id="siteTitle"
            name="siteTitle"
            defaultValue={map.siteTitle ?? ""}
            className="bg-surface"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            name="brand"
            defaultValue={map.brand ?? ""}
            className="bg-surface"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={map.email ?? ""}
            className="bg-surface"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            defaultValue={map.location ?? ""}
            className="bg-surface"
          />
        </div>
        <Button type="submit">Save Settings</Button>
      </AdminForm>
    </AdminShell>
  );
}
