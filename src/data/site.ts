import type {
  EducationItem,
  ExperienceItem,
  GitHubStats,
  NavLink,
  Project,
  Service,
  Skill,
  SocialLink,
  Stat,
} from "@/types/portfolio";

export const siteConfig = {
  name: "Sakariye Qaasim Sh Omer",
  brand: "MyPortfolio",
  title: "Software Engineer & Full-Stack Developer",
  location: "Hargeisa, Somaliland",
  email: "sakariyekaamil11@gmail.com",
  phone: "63 6698569",
  shortIntro:
    "I'm a Software Engineer and Full-Stack Developer passionate about building modern web applications, business management systems, APIs, and scalable digital solutions.",
  heroDescription:
    "I design and build modern, scalable web applications and business systems using modern technologies and clean engineering practices.",
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const footerLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/soojeed",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "linkedin",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/",
    icon: "whatsapp",
  },
  {
    label: "Email",
    href: "mailto:sakariyekaamil11@gmail.com",
    icon: "email",
  },
];

export const stats: Stat[] = [
  { id: "projects", value: 10, suffix: "+", label: "Projects" },
  { id: "technologies", value: 15, suffix: "+", label: "Multiple Technologies" },
  { id: "fullstack", value: 100, suffix: "%", label: "Full-Stack Development" },
  { id: "business", value: 5, suffix: "+", label: "Business Solutions" },
];
