import { AdminShell } from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [skills, projects, notifications, unread] = await Promise.all([
    prisma.skill.count(),
    prisma.project.count(),
    prisma.notification.count(),
    prisma.notification.count({ where: { read: false } }),
  ]);

  const cards = [
    { label: "Skills", value: skills },
    { label: "Projects", value: projects },
    { label: "Notifications", value: notifications },
    { label: "Unread", value: unread },
  ];

  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-primary">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <h3 className="font-medium">Neon Database</h3>
        <p className="mt-2 text-sm text-muted">
          Connected to Neon PostgreSQL. Manage Skills, Projects, Notifications,
          and Settings from the sidebar.
        </p>
      </div>
    </AdminShell>
  );
}
