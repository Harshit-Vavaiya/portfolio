import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const token = data?.token;

    if (!token) return NextResponse.json({ ok: false }, { status: 400 });

    const serverToken =
      process.env.NEXT_PUBLIC_ADMIN_TOKEN ?? process.env.TOKEN;

    if (serverToken && token === serverToken) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false }, { status: 403 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
