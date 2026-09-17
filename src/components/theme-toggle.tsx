"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "navbar" | "admin";
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
        variant === "navbar" &&
          "bg-zinc-200 text-zinc-900 hover:bg-zinc-300",
        variant === "admin" &&
          "border border-border bg-surface text-foreground hover:border-primary/40 hover:text-primary",
        variant === "default" &&
          "border border-border bg-card text-foreground hover:border-primary/40 hover:text-primary",
        className
      )}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
