import { PrismaClient } from "@prisma/client";
import { skills } from "../src/data/skills";
import { projects } from "../src/data/projects";
import { siteConfig } from "../src/data/site";

const prisma = new PrismaClient();

async function main() {
  await prisma.notification.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.setting.deleteMany();

  await prisma.skill.createMany({
    data: skills.map((skill, index) => ({
      name: skill.name,
      category: skill.category,
      description: skill.description,
      order: index,
    })),
  });

  for (const [index, project] of projects.entries()) {
    await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        image: project.image,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        featured: true,
        order: index,
      },
    });
  }

  await prisma.setting.createMany({
    data: [
      { key: "siteName", value: siteConfig.name },
      { key: "siteTitle", value: siteConfig.title },
      { key: "email", value: siteConfig.email },
      { key: "phone", value: siteConfig.phone },
      { key: "location", value: siteConfig.location },
      { key: "brand", value: siteConfig.brand },
      { key: "heroDescription", value: siteConfig.heroDescription },
      { key: "shortIntro", value: siteConfig.shortIntro },
      {
        key: "aboutSubtitle",
        value:
          "A software engineer focused on building practical, scalable products.",
      },
      {
        key: "aboutParagraph1",
        value: `I'm ${siteConfig.name}, a Software Engineer and Full-Stack Developer based in ${siteConfig.location}. I specialize in designing and shipping modern web applications, business management systems, and APIs that solve real operational problems.`,
      },
      {
        key: "aboutParagraph2",
        value:
          "My work spans frontend interfaces, backend services, database design, authentication, and UI/UX-aware product development. I care about clean architecture, maintainable TypeScript, and systems that stay reliable as they grow.",
      },
      {
        key: "aboutParagraph3",
        value:
          "Whether it's a restaurant platform, event operations tool, or scholarship recommendation system, I approach each project with a problem-solving mindset and a focus on scalable software that teams can actually use day to day.",
      },
    ],
  });

  await prisma.notification.create({
    data: {
      title: "Welcome to Admin",
      message: "Your Neon database is connected. Manage skills, projects, and settings here.",
      type: "success",
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
