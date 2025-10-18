// // app/api/sheets/route.ts
// import { NextResponse } from "next/server";
// export const dynamic = "force-dynamic";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const sheet = searchParams.get("sheet") || "학사일정";
//     const gasUrl = `${process.env.GAS_BASE_URL}?sheet=${encodeURIComponent(sheet)}`;

//     const resp = await fetch(gasUrl, { cache: "no-store" });
//     if (!resp.ok) {
//       return NextResponse.json(
//         { success: false, error: `GAS 요청 실패: ${resp.status}` },
//         { status: 502 }
//       );
//     }
//     const payload = await resp.json(); // GAS는 JSON을 반환해야 함
//     if (!payload?.success) {
//       return NextResponse.json(
//         { success: false, error: payload?.error || "GAS 에러" },
//         { status: 500 }
//       );
//     }
//     return NextResponse.json({ success: true, data: payload.data });
//   } catch (err: any) {
//     return NextResponse.json(
//       { success: false, error: err?.message || String(err) },
//       { status: 500 }
//     );
//   }
// }
