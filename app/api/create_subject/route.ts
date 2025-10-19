import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb'; // 방금 만든 DB 연결 유틸리티

export async function POST(request: Request) {
  try {
    // 1. 클라이언트로부터 전송된 데이터를 JSON 형태로 파싱합니다.
    const formData = await request.json();

    // 2. [데이터 유효성 검사] 필수 필드가 있는지 확인합니다.
    const { subjectName, academicYear, semester, instructor } = formData;
    if (!subjectName || !academicYear || !semester || !instructor) {
      // 필수 필드가 하나라도 없으면 400 Bad Request 에러를 반환합니다.
      return NextResponse.json(
        { message: "필수 항목(과목명, 학년도, 학기, 담당교사)이 누락되었습니다." },
        { status: 400 }
      );
    }

    // 3. 데이터베이스에 연결합니다.
    const client = await connectToDB;
    const db = client.db(); // .env.local의 URI에 명시된 데이터베이스를 사용합니다.

    // 4. 'subjects'라는 컬렉션(테이블)에 폼 데이터를 삽입합니다.
    const result = await db.collection('subjects').insertOne(formData);

    // 5. 성공적으로 삽입되면, 클라이언트에 성공 메시지와 생성된 ID를 반환합니다. (상태 코드 201 Created)
    return NextResponse.json(
      { message: "수업이 성공적으로 생성되었습니다.", insertedId: result.insertedId },
      { status: 201 }
    );

  } catch (error) {
    // 6. 서버 내부에서 예기치 않은 오류가 발생했을 경우
    console.error("API Error:", error); // 서버 터미널에 에러 로그를 출력합니다.
    return NextResponse.json(
        { message: "서버 내부 오류가 발생했습니다." },
        { status: 500 }
    );
  }
}