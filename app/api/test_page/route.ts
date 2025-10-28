// app/api/post/route.ts

// Next.js 서버에서 응답(JSON, 리다이렉트 등)을 생성하기 위해 import합니다.
import { NextResponse } from 'next/server';
// '/lib/mongodb.ts' 파일에서 정의한 MongoDB 연결 헬퍼 함수를 가져옵니다.
import { connectToDB } from '../../../lib/mongodb';

// HTTP POST 요청을 처리하는 메인 함수입니다. (app router 방식)
// <form action="/api/post" method="POST"> 요청을 이 함수가 받습니다.
export async function POST(request: Request) {
  
  // 데이터베이스 작업 등 오류가 발생할 수 있는 코드를 try...catch로 감쌉니다.
  try {
    // 클라이언트에서 <form> 태그로 전송된 데이터를 FormData 객체로 파싱합니다.
    const formData = await request.formData();
    
    // FormData를 { key: value } 형태의 일반 JavaScript 객체로 변환합니다.
    // 예: <input name="title">, <input name="content"> -> { title: '입력값', content: '입력값' }
    const newPost = Object.fromEntries(formData.entries());

    // lib/mongodb.ts의 헬퍼 함수를 호출하여 MongoDB에 연결하고, 'db' 인스턴스를 가져옵니다.
    const db = (await connectToDB()).db;
    
    // 'test_db'라는 이름의 컬렉션(테이블)을 선택하여
    // .insertOne() (하나의 문서 삽입) 명령을 실행합니다.
    await db.collection('test_db').insertOne({
      ...newPost, // 폼에서 받은 객체(title, content 등)를 그대로 넣습니다.
      createdAt: new Date(), // 서버 현재 시간을 'createdAt' 필드로 추가합니다.
    });

    // (현재 사용 중인 방식)
    // 작업 성공 시, 클라이언트에 JSON 메시지를 응답합니다.
    // status: 201은 'Created' (새로운 리소스가 성공적으로 생성됨)을 의미하는 HTTP 상태 코드입니다.
    return NextResponse.json({ message: '성공적으로 처리되었습니다' }, { status: 201 });

  } catch (error) {
    // try 블록 내부에서 오류(예: DB 연결 실패, 삽입 실패)가 발생했을 때 실행됩니다.
    
    // 발생한 오류를 서버 콘솔(터미널)에 출력합니다. (디버깅용)
    console.error(error);
    
    // (현재 사용 중인 방식)
    // 실패 시, 클라이언트에 에러 메시지를 JSON으로 응답합니다.
    // status: 500은 'Internal Server Error' (서버 내부 오류)를 의미하는 HTTP 상태 코드입니다.
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