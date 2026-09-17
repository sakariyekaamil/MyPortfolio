import type { EducationItem, ExperienceItem, Service } from "@/types/portfolio";

export const experience: ExperienceItem[] = [
  {
    id: "horn-solution",
    company: "Horn Solution",
    role: "Software Developer & Marketing",
    period: "Present",
    responsibilities: [
      "Developing web applications",
      "Developing business systems",
      "Building APIs",
      "Database development",
      "Website development",
      "Mobile application development",
      "Digital marketing",
      "Client technical support",
    ],
  },
];

export const education: EducationItem[] = [
  {
    id: "golis",
    title: "Bachelor's Degree in Software Engineering",
    institution: "Golis University",
    type: "degree",
  },
  {
    id: "tisqaad-cs",
    title: "Computer Science",
    institution: "Tisqaad",
    type: "certificate",
  },
  {
    id: "tisqaad-ict",
    title: "ICT Diploma",
    institution: "Tisqaad",
    type: "certificate",
  },
  {
    id: "dugsiye",
    title: "Full-Stack Development",
    institution: "Dugsiye",
    type: "certificate",
  },
];

export const services: Service[] = [
  {
    id: "web",
    title: "Web Development",
    description: "Modern responsive websites and web applications.",
    icon: "web",
  },
  {
    id: "fullstack",
    title: "Full-Stack Development",
    description:
      "Complete frontend, backend, API, authentication, and database solutions.",
    icon: "fullstack",
  },
  {
    id: "business",
    title: "Business Systems",
    description:
      "Custom management systems for businesses and organizations.",
    icon: "business",
  },
  {
    id: "uiux",
    title: "UI/UX Development",
    description:
      "Clean and responsive interfaces focused on usability and modern design.",
    icon: "uiux",
  },
];
