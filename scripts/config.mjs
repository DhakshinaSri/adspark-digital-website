// Single source of truth for where the site is hosted.
//
// GitHub Pages "project sites" live at  https://<user>.github.io/<repo-name>/
// so every asset URL and every route must start with "/<repo-name>/".
//
// The base path is picked in this order (first match wins):
//   1. BASE_PATH environment variable     e.g.  BASE_PATH=/my-repo/   or   BASE_PATH=/
//   2. GITHUB_REPOSITORY (GitHub Actions sets this automatically)
//   3. the repo name in your git "origin" remote (works when you build on your own computer)
//   4. the "name" field in package.json
// A repo called "<user>.github.io" is a "user site" and is served from "/".
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

function fromGitRemote() {
  try {
    const url = execSync("git config --get remote.origin.url", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    const m = url.match(/[:/]([^/:]+)\/([^/]+?)(?:\.git)?\/?$/);
    return m ? { owner: m[1], repo: m[2] } : null;
  } catch {
    return null;
  }
}

function detectRepo() {
  if (process.env.GITHUB_REPOSITORY) {
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
    return { owner, repo };
  }
  return fromGitRemote();
}

export function getBase() {
  let base = process.env.BASE_PATH;
  if (!base) {
    const found = detectRepo();
    if (found) {
      base = found.repo.toLowerCase().endsWith(".github.io") ? "/" : "/" + found.repo + "/";
    }
  }
  if (!base) {
    const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
    base = "/" + pkg.name + "/";
  }
  if (!base.startsWith("/")) base = "/" + base;
  if (!base.endsWith("/")) base += "/";
  return base;
}

// Public address of the site, used for canonical links, the sitemap and social cards.
export function getSiteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, "");
  const found = detectRepo();
  const owner = found ? found.owner : "dhakshinasri";
  return `https://${owner}.github.io`;
}
