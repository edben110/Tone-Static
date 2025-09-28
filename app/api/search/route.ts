// app/api/search/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const clientId = process.env.JAMENDO_CLIENT_ID;

  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=20&search=${encodeURIComponent(q)}`;

  const r = await fetch(url);
  if (!r.ok) return NextResponse.json({ error: "Jamendo error" }, { status: 500 });
  const data = await r.json();
  return NextResponse.json(data);
}
