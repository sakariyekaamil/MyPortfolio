import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Bell,
  FolderKanban,
  Globe,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  UserRound,
} from "lucide-react";
import { getAdminSession } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/about", label: "About", icon: UserRound },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/", label: "Market Site", icon: Globe },
];

export async function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-6 lg:px-8">
      <aside className="hidden w-64 shrink-0 rounded-2xl border border-border bg-card p-4 lg:block">
        <div className="mb-8 flex items-start justify-between gap-2 px-2">
          <div>
            <p className="text-sm text-muted">Admin Panel</p>
            <h1 className="text-lg font-semibold text-foreground">
              My<span className="text-primary">Portfolio</span>
            </h1>
            <p className="mt-1 truncate text-xs text-muted">{session.email}</p>
          </div>
          <ThemeToggle variant="admin" className="h-9 w-9 shrink-0" />
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <Icon className="h-4 w-4 text-primary" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <form action={logoutAction} className="mt-8">
          <button
            type="submit"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "w-full justify-start"
            )}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </form>
      </aside>

      <main className="flex-1">
        <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle variant="admin" className="h-9 w-9" />
            <form action={logoutAction}>
              <button
                type="submit"
                className={cn(
                  buttonVariants({ size: "sm", variant: "secondary" })
                )}
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        <div className="mb-4 hidden items-center justify-between lg:flex">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {children}
      </main>
    </div>
  );
}
