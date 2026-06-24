import { getPublicRepos, PROFILE, FEATURED_REPO_NAMES, type Repo } from "@/lib/github";
import ProjectCard from "@/components/ProjectCard";

export default async function Home() {
  let repos: Repo[] = [];
  let error: string | null = null;

  try {
    repos = await getPublicRepos();
  } catch {
    error = "Couldn't load projects from GitHub right now. Please try again later.";
  }

  const featured = FEATURED_REPO_NAMES
    .map((name) => repos.find((repo) => repo.name === name))
    .filter((repo): repo is Repo => Boolean(repo));

  const featuredIds = new Set(featured.map((repo) => repo.id));
  const others = repos.filter((repo) => !featuredIds.has(repo.id));

  return (
    <div className="flex flex-1 flex-col bg-black">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-20 sm:px-10">
        <header className="mb-20">
          <p className="text-sm font-medium text-emerald-400">{PROFILE.location}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
            {PROFILE.name}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-zinc-400">
            {PROFILE.title} building with JavaScript, TypeScript, Java, Go, and Python.
          </p>
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-emerald-400/50 hover:text-emerald-400"
          >
            View GitHub profile →
          </a>
        </header>

        {error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : (
          <>
            {featured.length > 0 && (
              <section className="mb-16">
                <h2 className="mb-6 text-xl font-semibold text-zinc-50">Featured Projects</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featured.map((repo) => (
                    <ProjectCard key={repo.id} repo={repo} />
                  ))}
                </div>
              </section>
            )}

            {others.length > 0 && (
              <section>
                <h2 className="mb-6 text-xl font-semibold text-zinc-50">Other Projects</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {others.map((repo) => (
                    <ProjectCard key={repo.id} repo={repo} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} {PROFILE.name}. Projects fetched live from GitHub.
      </footer>
    </div>
  );
}
