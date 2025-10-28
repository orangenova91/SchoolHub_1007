// app/test_page/page.tsx (또는 해당 페이지 파일)
'use client'; // 클라이언트 컴포넌트로 지정해야 합니다.

import { useRouter } from 'next/navigation';

export default function Testpage2() {
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
        <input name="academicYear" placeholder="학년도" />
        <input name="semester" placeholder="학기를 입력해주세요." />
        <input name="subjectArea" placeholder="교과(군)" />
        <input name="subjectType" placeholder="교과 영역" />
        <input name="electiveType" placeholder="선택 영역" />
        <input name="subjectName" placeholder="교과명을 선택해주세요." />
        <input name="targetGrade" placeholder="교과를 가르칠 대상 학년을 골라주세요." />
        <input name="instructor" placeholder="강의자명 입력" />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}

/*

_id
68f4e16740593f722dec1b60

2025

1

"국어"

"보통교과"

"융합 선택"

"매체 의사소통"

3

"설한결"

*/