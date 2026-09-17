import { prisma } from "@/lib/prisma";
import { projects as fallbackProjects } from "@/data/projects";
import { skills as fallbackSkills, skillCategories } from "@/data/skills";
import { siteConfig as fallbackSite } from "@/data/site";
import type { Project, Skill } from "@/types/portfolio";

export type SiteContent = {
  name: string;
  brand: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  heroDescription: string;
  shortIntro: string;
  aboutSubtitle: string;
  aboutParagraphs: string[];
};

const defaultAboutSubtitle =
  "A software engineer focused on building practical, scalable products.";

function defaultAboutParagraphs(name: string, location: string) {
  return [
    `I'm ${name}, a Software Engineer and Full-Stack Developer based in ${location}. I specialize in designing and shipping modern web applications, business management systems, and APIs that solve real operational problems.`,
    "My work spans frontend interfaces, backend services, database design, authentication, and UI/UX-aware product development. I care about clean architecture, maintainable TypeScript, and systems that stay reliable as they grow.",
    "Whether it's a restaurant platform, event operations tool, or scholarship recommendation system, I approach each project with a problem-solving mindset and a focus on scalable software that teams can actually use day to day.",
  ];
}

const categoryOrder = [...skillCategories];

function sortCategories(categories: string[]) {
  return [...categories].sort((a, b) => {
    const ai = categoryOrder.indexOf(a as (typeof categoryOrder)[number]);
    const bi = categoryOrder.indexOf(b as (typeof categoryOrder)[number]);
    const av = ai === -1 ? 999 : ai;
    const bv = bi === -1 ? 999 : bi;
    return av - bv || a.localeCompare(b);
  });
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const rows = await prisma.skill.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return fallbackSkills;
    return rows.map((row) => ({
      name: row.name,
      category: row.category as Skill["category"],
      description: row.description,
    }));
  } catch {
    return fallbackSkills;
  }
}

export function getSkillCategoryList(skills: Skill[]) {
  return sortCategories([...new Set(skills.map((skill) => skill.category))]);
}

export async function getProjects(): Promise<Project[]> {
  try {
    const rows = await prisma.project.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return fallbackProjects;
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      technologies: row.technologies,
      image: row.image,
      githubUrl: row.githubUrl ?? undefined,
      liveUrl: row.liveUrl ?? undefined,
    }));
  } catch {
    return fallbackProjects;
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  const fallbackParagraphs = defaultAboutParagraphs(
    fallbackSite.name,
    fallbackSite.location
  );

  try {
    const rows = await prisma.setting.findMany();
    if (rows.length === 0) {
      return {
        ...fallbackSite,
        aboutSubtitle: defaultAboutSubtitle,
        aboutParagraphs: fallbackParagraphs,
      };
    }

    const map = Object.fromEntries(rows.map((row) => [row.key, row.value]));
    const name = map.siteName || fallbackSite.name;
    const location = map.location || fallbackSite.location;
    const defaults = defaultAboutParagraphs(name, location);

    const aboutParagraphs = [
      map.aboutParagraph1 || defaults[0],
      map.aboutParagraph2 || defaults[1],
      map.aboutParagraph3 || defaults[2],
    ].filter((paragraph) => paragraph.trim().length > 0);

    return {
      name,
      brand: map.brand || fallbackSite.brand,
      title: map.siteTitle || fallbackSite.title,
      location,
      email: map.email || fallbackSite.email,
      phone: map.phone || fallbackSite.phone,
      heroDescription: map.heroDescription || fallbackSite.heroDescription,
      shortIntro: map.shortIntro || fallbackSite.shortIntro,
      aboutSubtitle: map.aboutSubtitle || defaultAboutSubtitle,
      aboutParagraphs:
        aboutParagraphs.length > 0 ? aboutParagraphs : fallbackParagraphs,
    };
  } catch {
    return {
      ...fallbackSite,
      aboutSubtitle: defaultAboutSubtitle,
      aboutParagraphs: fallbackParagraphs,
    };
  }
}

export async function getPortfolioContent() {
  const [skills, projects, site] = await Promise.all([
    getSkills(),
    getProjects(),
    getSiteContent(),
  ]);
  const categories = getSkillCategoryList(skills);
  return { skills, projects, site, categories };
}
