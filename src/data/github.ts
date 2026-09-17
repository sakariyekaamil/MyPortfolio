import type { GitHubStats } from "@/types/portfolio";

export const GITHUB_USERNAME = "soojeed";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

const fallbackLanguages = [
  "TypeScript",
  "JavaScript",
  "HTML",
  "C#",
  "React",
  "Next.js",
  "Node.js",
];

/** Static fallback if the GitHub API is unavailable. */
export const githubStats: GitHubStats = {
  username: GITHUB_USERNAME,
  profileUrl: GITHUB_PROFILE_URL,
  repositories: 16,
  contributions: 7,
  stars: 0,
  languages: fallbackLanguages,
  recentActivity: [
    {
      id: "1",
      type: "repo",
      repo: "Ramada",
      description: "Recently updated TypeScript project",
    },
    {
      id: "2",
      type: "repo",
      repo: "WaranAbde-Zoo",
      description: "Recently updated TypeScript project",
    },
    {
      id: "3",
      type: "repo",
      repo: "React-Native-App",
      description: "Recently updated JavaScript project",
    },
  ],
};

type GitHubUser = {
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
};

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  fork: boolean;
  updated_at: string;
};

function buildStats(user: GitHubUser, repos: GitHubRepo[]): GitHubStats {
  const ownRepos = repos.filter((repo) => !repo.fork);
  const stars = ownRepos.reduce(
    (sum, repo) => sum + (repo.stargazers_count ?? 0),
    0
  );

  const languageCounts = new Map<string, number>();
  for (const repo of ownRepos) {
    if (!repo.language) continue;
    languageCounts.set(
      repo.language,
      (languageCounts.get(repo.language) ?? 0) + 1
    );
  }

  const languages = [...languageCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([language]) => language);

  const recentActivity = ownRepos
    .slice(0, 3)
    .map((repo) => ({
      id: String(repo.id),
      type: "repo",
      repo: repo.name,
      description:
        repo.description?.trim() ||
        (repo.language
          ? `Recently updated ${repo.language} project`
          : "Recently updated repository"),
    }));

  return {
    username: user.login,
    profileUrl: user.html_url,
    repositories: user.public_repos,
    contributions: user.followers,
    stars,
    languages: languages.length ? languages : fallbackLanguages,
    recentActivity:
      recentActivity.length > 0 ? recentActivity : githubStats.recentActivity,
  };
}

export async function getGitHubStats(): Promise<GitHubStats> {
  try {
    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-website",
    };

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers,
        cache: "force-cache",
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
        {
          headers,
          cache: "force-cache",
        }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return githubStats;
    }

    const user = (await userRes.json()) as GitHubUser;
    const repos = (await reposRes.json()) as GitHubRepo[];
    return buildStats(user, Array.isArray(repos) ? repos : []);
  } catch {
    return githubStats;
  }
}
