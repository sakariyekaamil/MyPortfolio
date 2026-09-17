"use client";

import { Toaster, toast } from "sonner";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  XCircle,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function AppToaster() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <Toaster
      theme={theme}
      position="top-right"
      richColors
      closeButton
      icons={{
        success: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
        error: <XCircle className="h-4 w-4 text-red-500" />,
        info: <Info className="h-4 w-4 text-sky-500" />,
        warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
        loading: (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ),
      }}
      toastOptions={{
        style: {
          background: isLight ? "#ffffff" : "#0D0D0D",
          border: isLight ? "1px solid #e4e4e7" : "1px solid #27272A",
          color: isLight ? "#0a0a0a" : "#FFFFFF",
        },
        classNames: {
          toast: "font-sans",
          title: "text-sm font-medium",
          description: "text-xs opacity-70",
        },
      }}
    />
  );
}

function isNextRedirect(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    String((error as { digest?: string }).digest).startsWith("NEXT_REDIRECT")
  );
}

type ActionResult = { error?: string; success?: boolean } | void;

export function AdminForm({
  action,
  successMessage,
  children,
  className,
}: {
  action: (formData: FormData) => Promise<ActionResult>;
  successMessage: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <form
      className={className}
      action={async (formData) => {
        try {
          const result = await action(formData);
          if (result?.error) {
            toast.error(result.error);
            return;
          }
          toast.success(successMessage);
        } catch (error) {
          if (isNextRedirect(error)) throw error;
          toast.error("Something went wrong. Please try again.");
        }
      }}
    >
      {children}
    </form>
  );
}

export { toast };
