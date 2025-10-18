import { NextResponse } from "next/server";

export const revalidate = 60; // ISR/캐시(초). 최신성이 중요하면 0 또는 'no-store' 검토.

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sheet = searchParams.get("sheet") || process.env.NEXT_PUBLIC_SCHOOLCAL_SHEET || "학사일정";
  const gasUrl = process.env.GAS_SCHOOLCAL_URL;
  if (!gasUrl) return NextResponse.json({ success: false, error: "GAS_SCHOOLCAL_URL 미설정" }, { status: 500 });

  const url = `${gasUrl}?sheet=${encodeURIComponent(sheet)}`;

  try {
    const resp = await fetch(url, { cache: "no-store" }); // GAS 쪽은 즉시 최신 응답 권장
    const json = await resp.json();

    // 응답 형식 통일/검증(간단)
    if (!json?.success) {
      return NextResponse.json({ success: false, error: json?.error || "Unknown error from GAS" }, { status: 502 });
    }
    return NextResponse.json(json, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Fetch failed" }, { status: 500 });
  }
}
