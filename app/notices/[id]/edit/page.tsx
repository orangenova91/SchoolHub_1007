'use client'; // 👈 1. 폼을 다루기 위해 'use client' 선언

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // 👈 2. 'useParams'로 id를 가져옴
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { INotice } from '@/models/Notice'; 
import Link from "next/link";

export default function EditNoticePage() { // 👈 3. async가 아닌 일반 컴포넌트
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const router = useRouter();
  const params = useParams(); // 👈 4. Promise가 아닌 hook으로 params를 동기적으로 가져옴
  const id = params.id as string; // 👈 5. id 추출

  // 6. useEffect를 사용해 클라이언트에서 데이터 fetch
  useEffect(() => {
    if (!id) return; 

    const fetchNoticeData = async () => {
      try {
        // (API는 view=true가 없어야 조회수가 오르지 않습니다)
        const res = await fetch(`/api/notices/${id}`); 
        if (!res.ok) {
          throw new Error('Failed to fetch notice data');
        }
        const { data }: { data: INotice } = await res.json();
        
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
      } catch (error) {
        console.error(error);
        alert('게시글 정보를 불러오는 데 실패했습니다.');
        router.push('/notices'); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchNoticeData();
  }, [id, router]); // id가 변경될 때만 실행

  // 7. 폼 제출 핸들러 (PUT 요청)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/notices/${id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author }), 
      });

      if (!res.ok) throw new Error('Failed to update notice');

      alert('성공적으로 수정되었습니다.');
      router.push(`/notices/${id}`); // 수정 완료 후 상세 페이지로 이동
    } catch (error) {
      console.error(error);
      alert('공지사항 수정에 실패했습니다.');
      setIsSubmitting(false); 
    }
  };

  // 로딩 UI
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="loading-message">  
          <h2>공지사항 수정</h2>
          <p>데이터를 불러오는 중입니다...</p>
        </div>
      </DashboardLayout>
    );
  }

  // 8. 실제 폼 렌더링 (globals.css 클래스 사용)
  return (
    <DashboardLayout>
      <div className="notice-form-wrapper">
        <form onSubmit={handleSubmit} className="notice-form">
          <h2 className="notice-form-title"><Link href="/notices">공지사항 수정</Link></h2>

          <table className="notice-form-table">
            <tbody>
              <tr>
                <th className="notice-form-th">
                  <label htmlFor="author">작성자</label>
                </th>
                <td className="notice-form-td">
                  <input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
                    required
                    className="notice-form-input"
                  />
                </td>
              </tr>
              <tr>
                <th className="notice-form-th">
                  <label htmlFor="title">제목</label>
                </th>
                <td className="notice-form-td">
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    required
                    className="notice-form-input"
                  />
                </td>
              </tr>
              <tr>
                <th className="notice-form-th">
                  <label htmlFor="content">내용</label>
                </th>
                <td className="notice-form-td">
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                    required
                    className="notice-form-textarea"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="notice-form-actions">
            <button 
              type="button"
              onClick={() => router.back()}
              className="notice-form-button cancel"
            >
              취소
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="notice-form-button submit"
            >
              {isSubmitting ? '수정 중...' : '수정하기'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}