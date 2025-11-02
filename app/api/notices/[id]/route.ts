// app/api/notices/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Notice, { INotice } from "@/models/Notice";

export const dynamic = "force-dynamic";

// ✅ 컨텍스트 타입: params를 Promise로 받도록 변경
type RouteContext = {
  params: Promise<{ id: string }>;
};

// [R] GET: 특정 공지사항 상세 조회
export async function GET(request: NextRequest, context: RouteContext) {
  await dbConnect();

  // ✅ params를 await 해서 id를 꺼낸다
  const { id } = await context.params;

  const { searchParams } = new URL(request.url);
  const shouldIncrementView = searchParams.get("view") === "true";

  try {
    let notice: INotice | null;

    if (shouldIncrementView) {
      // view=true일 때만 조회수 +1
      notice = await Notice.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
    } else {
      notice = await Notice.findById(id);
    }

    if (!notice) {
      return NextResponse.json(
        { success: false, error: "Notice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: notice });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}

// [U] PUT: 특정 공지사항 수정
export async function PUT(request: NextRequest, context: RouteContext) {
  await dbConnect();

  // ✅ 동일하게 await
  const { id } = await context.params;

  try {
    const body: Partial<INotice> = await request.json();
    const notice = await Notice.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!notice) {
      return NextResponse.json(
        { success: false, error: "Notice not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: notice });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}

// [D] DELETE: 특정 공지사항 삭제
export async function DELETE(_request: NextRequest, context: RouteContext) {
  await dbConnect();

  // ✅ 동일하게 await
  const { id } = await context.params;

  try {
    const deleted = await Notice.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Notice not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
