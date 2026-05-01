import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Payload = {
  token: string;
  slug: string;
  title: string;
  date?: string;
  tags?: string[];
  description?: string;
  body: string;
};

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

    const blogsDir = path.join(process.cwd(), "content", "blogs");
    const targetDir = path.join(blogsDir, data.slug);

    if (!fs.existsSync(blogsDir)) fs.mkdirSync(blogsDir, { recursive: true });
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    const frontmatterLines = ["---"];
    frontmatterLines.push(`title: "${data.title.replace(/"/g, '\"')}"`);
    if (data.date) frontmatterLines.push(`date: "${data.date}"`);
    if (data.description)
      frontmatterLines.push(
        `description: "${data.description.replace(/"/g, '\"')}"`,
      );
    if (data.tags && data.tags.length)
      frontmatterLines.push(
        `tags: [${data.tags.map((t) => `\"${t}\"`).join(", ")}]`,
      );
    frontmatterLines.push("---", "", data.body);

    const filePath = path.join(targetDir, "index.md");
    fs.writeFileSync(filePath, frontmatterLines.join("\n"), "utf8");

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
