import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Notice, { INotice } from '@/models/Notice';

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // 1. ▼▼▼ 검색어(query) 파라미터 받기 ▼▼▼
    const query = searchParams.get("query") || "";

    // 2. ▼▼▼ MongoDB 필터 객체 생성 ▼▼▼
    const filter: any = {};
    if (query) {
      filter.$or = [
        // 'i' 옵션은 대소문자 무시
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },{ author: { $regex: query, $options: "i" } }
      ];
    }

    // 3. ▼▼▼ 필터를 적용하여 총 개수 계산 ▼▼▼
    const totalNotices = await Notice.countDocuments(filter);
    const totalPages = Math.ceil(totalNotices / limit);

    // 4. ▼▼▼ 필터를 적용하여 목록 조회 ▼▼▼
    const notices: INotice[] = await Notice.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: notices,
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalNotices,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// [C] POST: 새 공지사항 생성
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    // 요청 본문(body) 타입을 INotice의 부분집합으로 추론
    const body: Partial<INotice> = await request.json(); 
    const notice: INotice = await Notice.create(body); // body에 title, content, author 포함
    return NextResponse.json({ success: true, data: notice }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}