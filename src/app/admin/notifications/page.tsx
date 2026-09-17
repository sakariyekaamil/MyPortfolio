import { AdminShell } from "@/components/admin/AdminShell";
import { AdminForm } from "@/components/admin/AdminToast";
import {
  createNotificationAction,
  deleteNotificationAction,
  markNotificationReadAction,
} from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminNotificationsPage() {
  const notifications = await prisma.notification.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell title="Notifications">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <AdminForm
          action={createNotificationAction}
          successMessage="Notification sent"
          className="space-y-4 rounded-2xl border border-border bg-card p-5"
        >
          <h3 className="font-medium">Create Notification</h3>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required className="bg-surface" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              required
              className="bg-surface"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              name="type"
              defaultValue="info"
              placeholder="info / success / warning"
              className="bg-surface"
            />
          </div>
          <Button type="submit">Send Notification</Button>
        </AdminForm>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-4 font-medium">
            Inbox ({notifications.length})
          </h3>
          <div className="space-y-3">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-border p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">
                      {item.title}{" "}
                      {!item.read ? (
                        <span className="text-xs text-primary">• unread</span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-sm text-muted">{item.message}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-wide text-muted">
                      {item.type}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {!item.read ? (
                      <AdminForm
                        action={markNotificationReadAction}
                        successMessage="Marked as read"
                      >
                        <input type="hidden" name="id" value={item.id} />
                        <Button type="submit" variant="ghost" size="sm">
                          Mark read
                        </Button>
                      </AdminForm>
                    ) : null}
                    <AdminForm
                      action={deleteNotificationAction}
                      successMessage="Notification deleted"
                    >
                      <input type="hidden" name="id" value={item.id} />
                      <Button type="submit" variant="ghost" size="sm">
                        Delete
                      </Button>
                    </AdminForm>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
