// app/api/post/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb'; // 1번에서 만든 DB 연결 헬퍼

export async function POST(request: NextRequest) {
  try {
    // 1. 폼 데이터 파싱
    // <form>의 'name' 속성(title, content)을 기반으로 데이터를 받습니다.
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    // 2. 간단한 유효성 검사
    if (!title || !content) {
      return NextResponse.json(
        { error: '제목과 내용은 필수입니다.' },
        { status: 400 }
      );
    }

    // 3. MongoDB 연결
    const client = await { connectToDB };
    
    // 4. DB 및 Collection 선택
    // .env.local의 MONGODB_URI에 포함된 DB를 사용합니다.
    // 만약 URI에 DB 이름이 없다면 여기서 직접 지정해야 합니다. (예: client.db('schoolhub'))
    const db = client.db(); // URI에 명시된 기본 DB 사용
    
    // ⭐️ 요청하신 'test_db' 컬렉션을 사용합니다.
    const collection = db.collection('test_db');

    // 5. 데이터 삽입
    const newPost = {
      title: title,
      content: content,
      createdAt: new Date(),
    };
    await collection.insertOne(newPost);

    // 6. 성공 시 리다이렉트 (선택)
    // 폼 제출 후 사용자를 다른 페이지로 보냅니다. (예: 홈페이지)
    // request.nextUrl.origin은 'http://localhost:3000' 같은 기본 URL입니다.
    const redirectUrl = new URL('/', request.nextUrl.origin);
    
    return NextResponse.redirect(redirectUrl, { status: 303 });
    
    /* // 또는 JSON 응답을 보낼 수도 있습니다.
    return NextResponse.json(
      { message: '게시글이 성공적으로 등록되었습니다.', data: result },
      { status: 201 }
    );
    */

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}