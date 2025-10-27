import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';

// POST 요청을 처리하는 함수
export async function POST(request:Request) {
  // 클라이언트가 보낸 데이터를 확인하려면:
//  .formData()를 사용합니다.(이전엔 .json())
const formData = await request.formData();

// formData에서 name 속성값으로 데이터를 꺼냅니다.
const title = formData.get('title');
const content = formData.get('content');

// formData로 전송된 데이터들을 콘솔로그에 출력해봅니다..
console.log(formData)
console.log('제목:', title);
console.log('내용:', content);

const db = (await connectToDB).bind("2022_curriculumn")



// 여기에 데이터베이스에 저장하는 로직 등을 추가하면 됩니다.

  // 클라이언트에게 성공했다는 응답을 보내줍니다.
  return NextResponse.json({ message: '성공적으로 처리되었습니다.' });
}

// GET 요청을 처리하는 함수
export async function GET(request:Request) {
    console.log("GET 요청이 들어왔습니다!");

    return NextResponse.json({ message: 'GET 요청 처리 완료' });
}


