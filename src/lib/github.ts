const GITHUB_USERNAME = "Dev-Muller";

export type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  homepage: string | null;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

// Curated set of repos to surface as "Featured" on the homepage, in display order.
export const FEATURED_REPO_NAMES = [
  "AIProjectVend",
  "FirstReactNativeProject",
  "APITX",
  "GoOneBillionRowChallenge",
  "QuizGo",
  "Trybe_Futebol_Clube",
  "Trybesmith",
  "TrybeWallet",
  "node-job-finder",
  "Recipies_App",
];

// Fallback blurbs for featured repos that have no GitHub description.
export const DESCRIPTION_OVERRIDES: Record<string, string> = {
  AIProjectVend: "AI-driven vending machine simulation project.",
  FirstReactNativeProject: "First mobile app built with React Native.",
  APITX: "RESTful API built with JavaScript and Express.",
  GoOneBillionRowChallenge: "Performance challenge processing a billion rows in Go.",
  QuizGo: "Terminal-based quiz game written in Go.",
  Trybe_Futebol_Clube: "Full-stack soccer match tracking app (TypeScript, React, Node).",
  Trybesmith: "REST API for crafting and managing items, built with TypeScript.",
  TrybeWallet: "Currency converter and expense tracker React app.",
  "node-job-finder": "Job listing application built with Node.js and Express.",
  Recipies_App: "Recipe browsing and favoriting app built with React.",
};

export async function getPublicRepos(): Promise<Repo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": `${GITHUB_USERNAME}-portfolio`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const repos: Repo[] = await res.json();

  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
}

export const PROFILE = {
  username: GITHUB_USERNAME,
  name: "Pedro Müller",
  title: "Software Developer",
  location: "Tulsa, OK — United States",
  githubUrl: `https://github.com/${GITHUB_USERNAME}`,
};
