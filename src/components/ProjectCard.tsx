import type { Repo } from "@/lib/github";
import { DESCRIPTION_OVERRIDES } from "@/lib/github";

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

function prettifyName(name: string) {
  return name.replace(/[-_]+/g, " ");
}

export default function ProjectCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-emerald-400/40 hover:bg-white/[0.05]"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold capitalize text-zinc-100 group-hover:text-emerald-400">
            {prettifyName(repo.name)}
          </h3>
          {repo.stargazers_count > 0 && (
            <span className="flex shrink-0 items-center gap-1 text-xs text-zinc-500">
              ★ {repo.stargazers_count}
            </span>
          )}
        </div>
        <p className="mt-2 line-clamp-3 text-sm text-zinc-400">
          {repo.description ?? DESCRIPTION_OVERRIDES[repo.name] ?? "No description provided."}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
        {repo.language ? (
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#8b949e" }}
            />
            {repo.language}
          </span>
        ) : (
          <span />
        )}
        <span>Updated {formatDate(repo.pushed_at)}</span>
      </div>
    </a>
  );
}
