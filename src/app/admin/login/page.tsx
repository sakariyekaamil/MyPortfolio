"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { loginAction } from "@/app/admin/actions";
import { toast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
        toast.error(result.error, {
          icon: <XCircle className="h-4 w-4 text-red-400" />,
        });
        setLoading(false);
        return;
      }
      toast.success("Signed in successfully", {
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
      });
      router.push("/admin");
      router.refresh();
    } catch (error) {
      const isRedirect =
        typeof error === "object" &&
        error !== null &&
        "digest" in error &&
        String((error as { digest?: string }).digest).startsWith(
          "NEXT_REDIRECT"
        );
      if (isRedirect) {
        toast.success("Signed in successfully", {
          icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
        });
        throw error;
      }
      toast.error("Something went wrong. Please try again.", {
        icon: <XCircle className="h-4 w-4 text-red-400" />,
      });
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[100svh] items-center justify-center px-4 py-8">
      <form
        action={onSubmit}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-6"
      >
        <h1 className="text-xl font-semibold sm:text-2xl">Admin Login</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to manage portfolio content.
        </p>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="admin@xirfadhub.com"
              className="bg-surface"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-surface"
            />
          </div>
        </div>

        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

        <Button type="submit" className="mt-6 w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
