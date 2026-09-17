import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "excellence-restaurant",
    title: "Excellence Restaurant Management System",
    description:
      "A complete restaurant management platform for managing orders, tables, menu items, kitchen operations, inventory, customers, reservations, payments, and reports.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    image: "/projects/restaurant.png",
    githubUrl: "https://github.com",
    liveUrl: "https://exelennce-cleint.vercel.app/",
  },
  {
    id: "guribile-events",
    title: "Guribile Event Management System",
    description:
      "An event and decoration management platform for managing customers, suppliers, inventory, rental items, packages, and event operations.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    image: "/projects/events.png",
    githubUrl: "https://github.com",
  },
  {
    id: "scholarship-ai",
    title: "Smart Scholarship Eligibility & AI Recommendation System",
    description:
      "A smart scholarship platform that helps students manage profiles, documents, eligibility requirements, applications, and AI-powered scholarship recommendations.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "AI",
    ],
    image: "/projects/scholarship.svg",
    githubUrl: "https://github.com",
  },
  {
    id: "blogify",
    title: "Blogify",
    description:
      "A modern blogging platform with authentication, articles, comments, user management, categories, and image support.",
    technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    image: "/projects/blogy.png",
    githubUrl: "https://github.com",
  },
  {
    id: "construction-cms",
    title: "Construction Management System",
    description:
      "A construction management platform designed to manage projects, workers, customers, tasks, and construction operations.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Prisma",
      "PostgreSQL",
    ],
    image: "/projects/construction.png?v=2",
    githubUrl: "https://github.com/soojeed/Smart-construction-system",
    liveUrl: "https://shanfool-construction-management-sy.vercel.app/login",
  },
  {
    id: "zoo-management",
    title: "Zoo Management System",
    description:
      "A zoo operations platform for managing animals, enclosures, staff, visitors, tickets, and daily zoo management workflows.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    image: "/projects/zoo.png",
    githubUrl: "https://github.com/soojeed/WaranAbde-Zoo",
    liveUrl: "https://zoo-management-system-oh9g.vercel.app/login",
  },
  {
    id: "luxury-perfumes",
    title: "Luxury Perfumes ERP",
    description:
      "A business management platform for luxury perfume stores — stock, sales, purchases, payments, and performance reports in one place.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    image: "/projects/luxury-perfumes.png",
    liveUrl: "https://luxury-perfumes-cleint.vercel.app/login",
  },
];
