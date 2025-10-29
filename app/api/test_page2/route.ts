// app/api/post/route.ts

import { NextResponse } from 'next/server';
import { connectToDB } from '../../../lib/mongodb';

// GET 요청: 데이터 목록을 "불러오는" 함수
export async function GET(request: Request) {
  try {
    // 1. DB에 연결합니다.
    const db = (await connectToDB()).db;

    // 2. '2022_curriculum' 컬렉션을 선택합니다.
    const collection = db.collection('2022_curriculum');

    // 3. 컬렉션의 모든 문서를 찾습니다 (find({})).
    //    .sort({ createdAt: -1 }) : createdAt 필드로 내림차순 정렬 (최신 글이 위로)
    //    .toArray() : 찾은 결과를 배열로 변환합니다.
    const posts = await collection.find({}).sort({ createdAt: -1 }).toArray();

    // 4. 성공 시, 찾은 데이터(posts 배열)를 JSON으로 반환합니다.
    //    HTTP 상태 코드 200 (OK)
    return NextResponse.json(posts, { status: 200 });

  } catch (error) {
    // 5. 실패 시, 서버 오류 메시지를 JSON으로 반환합니다.
    console.error(error);
    return NextResponse.json(
      { message: '데이터를 불러오는 중 서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// (참고) POST 요청: 새 데이터를 "생성하는" 함수는
// 이처럼 별도의 함수로 분리해야 합니다.
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const newPost = Object.fromEntries(formData.entries());

    const db = (await connectToDB()).db;
    await db.collection('2022_curriculum').insertOne({
      ...newPost,
      createdAt: new Date(),
    });

    // HTTP 상태 코드 201 (Created)
    return NextResponse.json({ message: '성공적으로 처리되었습니다' }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}