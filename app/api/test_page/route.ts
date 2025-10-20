// app/api/post/route.ts

import { NextResponse } from 'next/server';
import { connectToDB } from '../../../lib/mongodb';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const newPost = Object.fromEntries(formData.entries());

    const db = (await connectToDB()).db;
    await db.collection('test_db').insertOne({
      ...newPost,
      createdAt: new Date(),
    });

    // 성공했다는 JSON 메시지를 리턴 (리다이렉트 대신)
    return NextResponse.json({ message: '성공적으로 처리되었습니다' }, { status: 201 });

  } catch (error) {
    console.error(error);
    // 실패했다는 JSON 메시지를 리턴
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}


// 아래는 과거 방법 입니다.(251021) 필요시 참고하세요.
// app/api/post/route.ts

// import { connect } from 'http2';
// import { NextResponse } from 'next/server';
// import { connectToDB } from '../../../lib/mongodb';

// export async function POST(request: Request) {
  
//     try{
//             // .json() 대신 .formData()를 사용합니다.
//             const formData = await request.formData();
//             const newPost = Object.fromEntries(formData.entries());

//             // formData에서 name 속성값으로 데이터를 꺼냅니다.
//             const title = formData.get('글제목');
//             const content = formData.get('글내용');
//             console.log(formData);
//             console.log(newPost);
//             console.log('제목:', title);
//             console.log('내용:', content);

//             // 여기에 데이터베이스에 저장하는 로직 등을 추가하면 됩니다.

//                 const db = (await connectToDB()).db;
//                 await db.collection('test_db').insertOne({...newPost, createdAt: new Date()});


//                 // 1. 현재 요청된 URL을 기준으로 리다이렉트할 전체 URL을 생성합니다.
//                 const redirectUrl = new URL('/test_page', request.url);

//                 // 2. 생성된 URL로 리다이렉트 응답을 보냅니다.
//             return NextResponse.redirect(redirectUrl);

//             //return NextResponse.json({ message: '성공적으로 처리되었습니다' });
//         }
//      catch (error) {
//     console.error('오류 발생:', error);
//     return NextResponse.json({ message: '오류가 발생했습니다', error: error.message }, { status: 500 });
//         } 
// }


// // GET 요청을 처리하는 함수
// export async function GET(request: Request) {
//     console.log("GET 요청이 들어왔습니다!");

//     return NextResponse.json({ message: 'GET 요청 처리 완료' });
// }