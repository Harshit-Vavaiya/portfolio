import Navbar from "../../components/navbar";
import { getAllBlogSlugs, readBlogPost } from "../../../lib/blog";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderInline(md: string): string {
  // very small subset: links + inline code + emphasis
  let out = escapeHtml(md);

  // strip images: ![alt](url)
  out = out.replace(/!\[[^\]]*\]\([^)]*\)/g, "");

  // inline code
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");

  // bold
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/__([^_]+)__/g, "<strong>$1</strong>");

  // italics
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  out = out.replace(/_([^_]+)_/g, "<em>$1</em>");

  // links [text](url)
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  return out;
}

function renderMarkdownToHtml(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];

  let paragraph: string[] = [];
  let inCode = false;
  let codeLines: string[] = [];
  let inUl = false;
  let ulItems: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(" ").trim();
    if (!text) return;
    html.push(`<p>${renderInline(text)}</p>`);
    paragraph = [];
  };

  const flushCode = () => {
    const code = escapeHtml(codeLines.join("\n"));
    html.push(`<pre><code>${code}</code></pre>`);
    codeLines = [];
  };

  const flushUl = () => {
    if (!inUl) return;
    html.push(`<ul>${ulItems.join("")}</ul>`);
    ulItems = [];
    inUl = false;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.startsWith("```")) {
      if (inCode) {
        inCode = false;
        flushCode();
      } else {
        flushParagraph();
        flushUl();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(raw);
      continue;
    }

    // headings
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushParagraph();
      flushUl();
      const level = h[1].length;
      const content = renderInline(h[2].trim());
      html.push(`<h${level}>${content}</h${level}>`);
      continue;
    }

    // blank line = paragraph break
    if (!line.trim()) {
      flushParagraph();
      flushUl();
      continue;
    }

    // simple blockquote
    if (line.startsWith("> ")) {
      flushParagraph();
      flushUl();
      html.push(
        `<blockquote>${renderInline(line.slice(2).trim())}</blockquote>`,
      );
      continue;
    }

    // unordered list (single-level)
    const ul = line.match(/^[-*]\s+(.*)$/);
    if (ul) {
      flushParagraph();
      inUl = true;
      ulItems.push(`<li>${renderInline(ul[1].trim())}</li>`);
      continue;
    } else {
      flushUl();
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushUl();
  return html.join("\n");
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = readBlogPost(params.slug);
  const html = renderMarkdownToHtml(post.content);

  const extraTags = post.tags
    .filter((t) => t !== "blog")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <main className="container-page">
      <Navbar />

      <article className="prose" aria-label="blog post">
        <header className="hero">
          <h1 className="hero__title">{post.title}</h1>
          <p className="hero__desc">
            {post.date} · {post.readingTimeMinutes} min read
          </p>
          {extraTags.length ? (
            <p className="hero__tags">{extraTags.join(" · ")}</p>
          ) : null}
        </header>

        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <footer className="footer">
        <div className="footer__links">
          <a href="/blog">← back to blog</a>
        </div>
      </footer>
    </main>
  );
}
