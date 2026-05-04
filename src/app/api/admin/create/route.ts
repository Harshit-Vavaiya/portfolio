import { NextResponse } from "next/server";

type Payload = {
  token: string;
  slug: string;
  title: string;
  date?: string;
  tags?: string[];
  description?: string;
  draft?: boolean;
  body: string;
};

/** Build the frontmatter + body markdown string */
function buildMarkdown(data: Payload): string {
  const lines = ["---"];
  lines.push(`title: "${data.title.replace(/"/g, '\\"')}"`);
  if (data.date) lines.push(`date: "${data.date}"`);
  if (data.description)
    lines.push(`description: "${data.description.replace(/"/g, '\\"')}"`);
  if (data.tags?.length)
    lines.push(`tags: [${data.tags.map((t) => `"${t}"`).join(", ")}]`);
  if (data.draft) lines.push(`draft: true`);
  lines.push("---", "", data.body);
  return lines.join("\n");
}

/**
 * Commit a file to GitHub via the Contents API.
 * Works in Vercel (or any read-only env) because it never touches disk.
 */
async function commitToGitHub(
  filePath: string,
  content: string,
  message: string,
): Promise<void> {
  const ghToken = process.env.GITHUB_TOKEN;
  const ghRepo = process.env.GITHUB_REPO; // e.g. "Harshit-Vavaiya/portfolio"
  const ghBranch = process.env.GITHUB_BRANCH ?? "main";

  if (!ghToken || !ghRepo) {
    throw new Error(
      "GITHUB_TOKEN and GITHUB_REPO env vars are required in production.",
    );
  }

  const apiBase = `https://api.github.com/repos/${ghRepo}/contents/${filePath}`;
  const headers = {
    Authorization: `Bearer ${ghToken}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Check if file already exists (needed to supply the sha for updates)
  let sha: string | undefined;
  const existing = await fetch(`${apiBase}?ref=${ghBranch}`, { headers });
  if (existing.ok) {
    const j = await existing.json();
    sha = j.sha;
  }

  const body: Record<string, string> = {
    message,
    content: Buffer.from(content, "utf8").toString("base64"),
    branch: ghBranch,
  };
  if (sha) body.sha = sha;

  const res = await fetch(apiBase, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${err}`);
  }
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Payload;
    const serverToken =
      process.env.NEXT_PUBLIC_ADMIN_TOKEN ?? process.env.TOKEN;

    if (!serverToken || data.token !== serverToken) {
      return NextResponse.json({ ok: false }, { status: 403 });
    }

    if (!data.slug || !data.title || !data.body) {
      return NextResponse.json(
        { ok: false, error: "missing fields" },
        { status: 400 },
      );
    }

    const markdown = buildMarkdown(data);
    const repoFilePath = `content/blogs/${data.slug}/index.md`;

    // Production: commit via GitHub API (Vercel filesystem is read-only)
    // Local dev fallback: if GITHUB_TOKEN is absent, write to disk instead
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
      await commitToGitHub(
        repoFilePath,
        markdown,
        `blog: add post "${data.title}"`,
      );
    } else {
      // Local dev only
      const fs = await import("fs");
      const path = await import("path");
      const targetDir = path.join(process.cwd(), "content", "blogs", data.slug);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, "index.md"), markdown, "utf8");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
