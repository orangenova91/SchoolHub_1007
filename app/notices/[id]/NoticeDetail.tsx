import Link from 'next/link';
import { INotice } from '@/models/Notice';
import NoticeActions from './NoticeActions'; // 버튼 컴포넌트

// API 응답 타입 정의
interface ApiResponse {
  success: boolean;
  data: INotice;
}

// 데이터 fetching 함수
async function getNotice(id: string): Promise<ApiResponse> {
  const res = await fetch(`http://localhost:3000/api/notices/${id}?view=true`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch notice');
  }
  return res.json();
}

// NoticeDetail 컴포넌트 정의
export default async function NoticeDetail({ id }: { id: string }) {
  
  try {
    const { data: notice } = await getNotice(id);

    if (!notice) {
      return (
        <div>
          <h2>공지사항을 찾을 수 없습니다.</h2>
          <Link href="/notices">목록으로 돌아가기</Link>
        </div>
      );
    }

    return (
      <>
        <h2 className="notice-form-title">공지사항</h2>
            
        <table className="notice-form-table">
          <tbody>
            <tr>
              <th>제목</th>
              <td>{notice.title}</td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>{notice.author}</td>
            </tr>
            <tr>
              <th>작성일</th>
              <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
            </tr>
            <tr>
              <th>조회수</th>
              <td>{notice.views}</td>
            </tr>
          </tbody>
        </table>

        <div className="notice-detail-content">
          {notice.content}
        </div>
            
        <NoticeActions noticeId={id} />
      </>
    );

  } catch (error) {
    // fetch 실패 또는 404 에러 처리
    console.error(error);
    return (
      <div>
        <h2>오류 발생</h2>
        <p>공지사항을 불러오는 데 실패했습니다.</p>
        <Link href="/notices">목록으로 돌아가기</Link>
      </div>
    );
  }
}