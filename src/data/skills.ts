import type { Skill } from "@/types/portfolio";

export const skills: Skill[] = [
  {
    name: "React",
    category: "Frontend",
    description: "Component-driven UIs",
  },
  {
    name: "Next.js",
    category: "Frontend",
    description: "App Router & SSR",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description: "Type-safe applications",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    description: "Core web language",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description: "Utility-first styling",
  },
  {
    name: "HTML",
    category: "Frontend",
    description: "Semantic markup",
  },
  {
    name: "CSS",
    category: "Frontend",
    description: "Responsive layouts",
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "Server-side runtime",
  },
  {
    name: "Express.js",
    category: "Backend",
    description: "API frameworks",
  },
  {
    name: "REST APIs",
    category: "Backend",
    description: "Resource design",
  },
  {
    name: "Authentication",
    category: "Backend",
    description: "Secure access flows",
  },
  {
    name: "JWT",
    category: "Backend",
    description: "Token-based auth",
  },
  {
    name: "RBAC",
    category: "Backend",
    description: "Role permissions",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description: "Relational data",
  },
  {
    name: "Prisma",
    category: "Database",
    description: "Type-safe ORM",
  },
  {
    name: "Supabase",
    category: "Database",
    description: "Backend platform",
  },
  {
    name: "MongoDB",
    category: "Database",
    description: "Document storage",
  },
  {
    name: "Git",
    category: "Tools",
    description: "Version control",
  },
  {
    name: "GitHub",
    category: "Tools",
    description: "Collaboration",
  },
  {
    name: "VS Code",
    category: "Tools",
    description: "Primary editor",
  },
  {
    name: "Cursor",
    category: "Tools",
    description: "AI-assisted coding",
  },
  {
    name: "Figma",
    category: "Tools",
    description: "UI design systems",
  },
];

export const skillCategories = [
  "Frontend",
  "Backend",
  "Database",
  "Tools",
] as const;
