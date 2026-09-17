export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "whatsapp" | "email";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  category: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  title: string;
  institution: string;
  type: "degree" | "certificate";
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: "web" | "fullstack" | "business" | "uiux";
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface GitHubStats {
  username: string;
  profileUrl: string;
  repositories: number;
  contributions: number;
  stars: number;
  languages: string[];
  recentActivity: {
    id: string;
    type: string;
    repo: string;
    description: string;
  }[];
}
