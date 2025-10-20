// app/test_page/page.tsx (또는 해당 페이지 파일)
'use client'; // 클라이언트 컴포넌트로 지정해야 합니다.

import { useRouter } from 'next/navigation';

export default function Testpage() {
  const router = useRouter(); // 페이지 이동을 위한 훅

  // form 제출 이벤트를 처리할 함수
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // form의 기본 새로고침 동작을 막음

    // 폼 데이터를 가져옴
    const formData = new FormData(event.currentTarget);

    try {
      // 서버의 /api/post로 폼 데이터를 POST 요청으로 보냄
      const response = await fetch('/api/test_page', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // 성공 시
        alert('게시글이 성공적으로 등록되었습니다.');
        router.push('/test_page'); // 원하는 다른 페이지로 이동
      } else {
        // 실패 시
        alert('저장에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('폼 제출 중 오류 발생:', error);
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h4>글작성</h4>
      {/* onSubmit 이벤트를 핸들러 함수와 연결 */}
      <form onSubmit={handleSubmit}>
        <input name="글제목" placeholder="글제목을 쓰세요." />
        <input name="글내용" placeholder="글내용을 쓰세요." />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}



// 아래는 과거 방법(251021)입니다. 필요시 참고하세요.

// export async function Testpage() {

//   return (
//   <div className="p20">
//     <h4>글작성</h4>
//     <form action="/api/test_page" method="post" className="flex flex-col gap-4">
//     <input name="글제목" placeholder="글제목"/>
//     <input name="글내용" placeholder="글내용"/>
//     <button type="submit" className="btn btn-primary">버튼</button>
//     </form>

//   </div>
//   )
  
// }