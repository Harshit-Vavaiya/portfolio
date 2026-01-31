import fs from "node:fs";
import path from "node:path";

export type BlogFrontmatter = {
  title?: string;
  date?: string;
  description?: string;
  tags?: string[];
  draft?: boolean;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  draft: boolean;
  readingTimeMinutes: number;
  content: string;
};

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");

function safeParseYamlValue(raw: string): any {
  const v = raw.trim();
  // boolean
  if (v === "true") return true;
  if (v === "false") return false;
  // array: ["a", "b"] or [a, b]
  if (v.startsWith("[") && v.endsWith("]")) {
    const inner = v.slice(1, -1).trim();
    if (!inner) return [];
    return inner
      .split(",")
      .map((s) => s.trim())
      .map((s) => s.replace(/^['\"]|['\"]$/g, ""));
  }
  // quoted string
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    return v.slice(1, -1);
  }
  return v;
}

function parseFrontmatter(md: string): {
  frontmatter: BlogFrontmatter;
  body: string;
} {
  // Minimal frontmatter parser: ---\n...\n---\n
  if (!md.startsWith("---")) return { frontmatter: {}, body: md };

  const end = md.indexOf("\n---", 3);
  if (end === -1) return { frontmatter: {}, body: md };

  const raw = md.slice(3, end).trim();
  const body = md.slice(end + "\n---".length).replace(/^\s*\n/, "");

  const fm: BlogFrontmatter = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const idx = trimmed.indexOf(":");
    if (idx === -1) continue;

    const key = trimmed.slice(0, idx).trim();
    const valueRaw = trimmed.slice(idx + 1);
    const value = safeParseYamlValue(valueRaw);

    (fm as any)[key] = value;
  }

  return { frontmatter: fm, body };
}

function stripMarkdown(text: string): string {
  return (
    text
      // images
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      // links
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      // inline code
      .replace(/`([^`]+)`/g, "$1")
      // emphasis
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/__([^_]+)__/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      // headings markers
      .replace(/^#+\s+/gm, "")
      .trim()
  );
}

function countWords(text: string): number {
  return text
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean).length;
}

export function estimateReadingTimeMinutes(markdownBody: string): number {
  // Very small heuristic: 200 words/min
  // Strip some markdown so code fences/markup don't inflate too much.
  const plain = stripMarkdown(
    markdownBody
      // drop fenced code blocks entirely
      .replace(/```[\s\S]*?```/g, " ")
      // drop inline code ticks
      .replace(/`[^`]*`/g, " "),
  );
  const words = countWords(plain);
  return Math.max(1, Math.ceil(words / 200));
}

export function clipWords(text: string, maxWords = 50): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return words.join(" ");
  return words.slice(0, maxWords).join(" ") + "…";
}

export function extractDescription(body: string, maxWords = 50): string {
  // Find first paragraph (roughly: first block of text separated by blank lines)
  const blocks = body
    .split(/\n\s*\n/g)
    .map((b) => b.trim())
    .filter(Boolean);

  for (const block of blocks) {
    // Skip headings, lists, blockquotes, code fences
    if (/^#{1,6}\s+/.test(block)) continue;
    if (/^```/.test(block)) continue;
    if (/^>\s+/.test(block)) continue;
    if (/^(-|\*|\d+\.)\s+/.test(block)) continue;

    const plain = stripMarkdown(block);
    if (!plain) continue;
    return clipWords(plain, maxWords);
  }

  return "";
}

function getSlugDirs(): string[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  return (
    fs
      .readdirSync(BLOGS_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      // ignore hidden/system folders
      .filter((name) => !name.startsWith("."))
  );
}

export function getAllBlogSlugs(): string[] {
  return getSlugDirs();
}

export function readBlogPost(slug: string): BlogPost {
  const filePath = path.join(BLOGS_DIR, slug, "index.md");
  const raw = fs.readFileSync(filePath, "utf8");

  const { frontmatter, body } = parseFrontmatter(raw);

  const title = frontmatter.title ?? slug.replace(/-/g, " ");
  const date = frontmatter.date ?? "1970-01-01";
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
  const draft = Boolean(frontmatter.draft);

  const description =
    (typeof frontmatter.description === "string" &&
    frontmatter.description.trim()
      ? frontmatter.description.trim()
      : "") || extractDescription(body, 50);

  const readingTimeMinutes = estimateReadingTimeMinutes(body);

  return {
    slug,
    title,
    date,
    description,
    tags,
    draft,
    readingTimeMinutes,
    content: body,
  };
}

export function getAllBlogPosts(options?: {
  includeDrafts?: boolean;
}): BlogPost[] {
  const includeDrafts = Boolean(options?.includeDrafts);

  const posts = getAllBlogSlugs()
    .map((slug) => {
      try {
        return readBlogPost(slug);
      } catch {
        return null;
      }
    })
    .filter((p): p is BlogPost => Boolean(p));

  const filtered = includeDrafts ? posts : posts.filter((p) => !p.draft);

  // Treat only posts tagged with "blog" as publishable blog entries.
  // If tags are omitted, we still include the post (keeps the pipeline simple).
  const blogOnly = filtered.filter(
    (p) => p.tags.length === 0 || p.tags.includes("blog"),
  );

  // Sort newest first (ISO date recommended)
  blogOnly.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return blogOnly;
}
