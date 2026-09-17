import type { GitHubStats } from "@/types/portfolio";

/**
 * Mock GitHub activity data.
 * Replace `getGitHubStats` with a real GitHub API fetch when ready.
 */
export const githubStats: GitHubStats = {
  username: "sakariye",
  profileUrl: "https://github.com",
  repositories: 24,
  contributions: 680,
  stars: 42,
  languages: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
  ],
  recentActivity: [
    {
      id: "1",
      type: "commit",
      repo: "excellence-rms",
      description: "Improved kitchen order workflow and reporting modules",
    },
    {
      id: "2",
      type: "commit",
      repo: "guribile-events",
      description: "Added inventory rental tracking and supplier flows",
    },
    {
      id: "3",
      type: "commit",
      repo: "scholarship-ai",
      description: "Refined eligibility rules and recommendation pipeline",
    },
  ],
};

export async function getGitHubStats(): Promise<GitHubStats> {
  // Future: fetch from GitHub REST/GraphQL API
  return githubStats;
}
