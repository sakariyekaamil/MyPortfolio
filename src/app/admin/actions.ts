"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminSession, destroyAdminSession, requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Invalid email or password." };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (
    parsed.data.email !== adminEmail ||
    parsed.data.password !== adminPassword
  ) {
    return { error: "Invalid credentials." };
  }

  await createAdminSession(parsed.data.email);
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function createSkillAction(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name || !category || !description) {
    return { error: "All fields are required." };
  }

  const count = await prisma.skill.count();
  await prisma.skill.create({
    data: { name, category, description, order: count },
  });

  revalidatePath("/admin/skills");
  revalidatePath("/");
  return { success: true };
}

export async function deleteSkillAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing id" };
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/admin/skills");
  revalidatePath("/");
  return { success: true };
}

export async function createProjectAction(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim() || "/projects/events.svg";
  const githubUrl = String(formData.get("githubUrl") ?? "").trim() || null;
  const liveUrl = String(formData.get("liveUrl") ?? "").trim() || null;
  const technologies = String(formData.get("technologies") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!title || !description) {
    return { error: "Title and description are required." };
  }

  const count = await prisma.project.count();
  await prisma.project.create({
    data: {
      title,
      description,
      image,
      githubUrl,
      liveUrl,
      technologies,
      order: count,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing id" };
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}

export async function createNotificationAction(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const type = String(formData.get("type") ?? "info").trim();

  if (!title || !message) {
    return { error: "Title and message are required." };
  }

  await prisma.notification.create({
    data: { title, message, type },
  });

  revalidatePath("/admin/notifications");
  return { success: true };
}

export async function markNotificationReadAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing id" };
  await prisma.notification.update({
    where: { id },
    data: { read: true },
  });
  revalidatePath("/admin/notifications");
  return { success: true };
}

export async function deleteNotificationAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing id" };
  await prisma.notification.delete({ where: { id } });
  revalidatePath("/admin/notifications");
  return { success: true };
}

export async function updateAboutAction(formData: FormData) {
  await requireAdmin();
  const entries = [
    ["siteName", String(formData.get("siteName") ?? "")],
    ["siteTitle", String(formData.get("siteTitle") ?? "")],
    ["email", String(formData.get("email") ?? "")],
    ["location", String(formData.get("location") ?? "")],
    ["phone", String(formData.get("phone") ?? "")],
    ["brand", String(formData.get("brand") ?? "")],
    ["aboutSubtitle", String(formData.get("aboutSubtitle") ?? "")],
    ["heroDescription", String(formData.get("heroDescription") ?? "")],
    ["shortIntro", String(formData.get("shortIntro") ?? "")],
    ["aboutParagraph1", String(formData.get("aboutParagraph1") ?? "")],
    ["aboutParagraph2", String(formData.get("aboutParagraph2") ?? "")],
    ["aboutParagraph3", String(formData.get("aboutParagraph3") ?? "")],
  ] as const;

  for (const [key, value] of entries) {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  revalidatePath("/admin/about");
  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}

export async function updateSettingsAction(formData: FormData) {
  await requireAdmin();
  const entries = [
    ["siteName", String(formData.get("siteName") ?? "")],
    ["siteTitle", String(formData.get("siteTitle") ?? "")],
    ["email", String(formData.get("email") ?? "")],
    ["location", String(formData.get("location") ?? "")],
    ["brand", String(formData.get("brand") ?? "")],
  ] as const;

  for (const [key, value] of entries) {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}
