"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Plus, X } from "lucide-react";
import { createProjectAction } from "@/app/admin/actions";
import { toast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function isNextRedirect(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    String((error as { digest?: string }).digest).startsWith("NEXT_REDIRECT")
  );
}

export function AddProjectDialog() {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (preview) URL.revokeObjectURL(preview);
    if (!file) {
      setPreview(null);
      return;
    }
    setPreview(URL.createObjectURL(file));
  }

  async function onSubmit(formData: FormData) {
    setPending(true);
    try {
      const result = await createProjectAction(formData);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Project saved successfully");
      formRef.current?.reset();
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      setOpen(false);
    } catch (error) {
      if (isNextRedirect(error)) throw error;
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Add project"
        title="Add project"
      >
        <Plus className="h-5 w-5" />
      </Button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label="Close dialog"
            onClick={() => setOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-project-title"
            className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-2xl border border-border bg-card p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl sm:max-h-[90vh] sm:rounded-2xl sm:p-5"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 id="add-project-title" className="text-lg font-semibold">
                Add Project
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              ref={formRef}
              action={onSubmit}
              encType="multipart/form-data"
              className="space-y-4"
            >
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
                <Label htmlFor="technologies">
                  Technologies (comma separated)
                </Label>
                <Input
                  id="technologies"
                  name="technologies"
                  placeholder="Next.js, TypeScript, Prisma"
                  className="bg-surface"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Project image</Label>
                <input
                  ref={fileInputRef}
                  id="image"
                  name="image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                  className="sr-only"
                  onChange={onFileChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-4 py-6 text-sm text-muted transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-40 w-full rounded-lg object-contain"
                    />
                  ) : (
                    <>
                      <ImagePlus className="h-8 w-8 text-primary" />
                      <span>Click to upload image</span>
                      <span className="text-xs">PNG, JPG, WEBP, GIF</span>
                    </>
                  )}
                </button>
                {preview ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (preview) URL.revokeObjectURL(preview);
                      setPreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="text-xs text-muted hover:text-foreground"
                  >
                    Remove image
                  </button>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="liveUrl">Live Demo URL</Label>
                <Input id="liveUrl" name="liveUrl" className="bg-surface" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input id="githubUrl" name="githubUrl" className="bg-surface" />
              </div>

              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={pending} className="w-full sm:w-auto">
                  {pending ? "Saving..." : "Save Project"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
