import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Services } from "@/components/Services";
import { GitHubSection } from "@/components/GitHubSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getPortfolioContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { skills, projects, site, categories } = await getPortfolioContent();

  return (
    <>
      <Navbar site={site} />
      <main className="flex-1">
        <Hero site={site} />
        <About site={site} />
        <Skills skills={skills} categories={categories} />
        <Projects projects={projects} />
        <Experience />
        <Education />
        <Services />
        <GitHubSection site={site} />
        <Contact site={site} />
      </main>
      <Footer site={site} />
    </>
  );
}
