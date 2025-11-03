'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import Link from "next/link";

export default function NewNoticePage() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [author, setAuthor] = useState<string>(''); // MVP
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, author }),
      });

      if (!res.ok) {
        throw new Error('Failed to create notice');
      }

      router.push('/notices'); 
      // router.refresh(); // 👈 이중 로드를 유발할 수 있으므로 제거 (push로 충분)
    } catch (error) {
      console.error(error);
      alert('공지사항 등록에 실패했습니다.'); // 사용자에게 피드백
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================================================================ */
  /* ▼▼▼ 인라인 스타일 모두 제거됨 ▼▼▼ */
  /* ================================================================ */

  return (
    <DashboardLayout>
      {/* 1. 폼 전체 래퍼 클래스 적용 */}
      <div className="notice-form-wrapper">
        <form onSubmit={handleSubmit}>
          
          {/* 2. 폼 제목 클래스 적용 */}
          <h2 className="notice-form-title"><Link href="/notices">공지사항</Link></h2>

          {/* 3. 폼 테이블 클래스 적용 */}
          <table className="notice-form-table">
            <tbody>
              {/* 작성자 행 */}
              <tr>
                {/* 4. th/td는 table 클래스가 자동 적용 (클래스 불필요) */}
                <th>
                  <label htmlFor="author">작성자</label>
                </th>
                <td>
                  <input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
                    required
                    className="notice-form-input" /* 5. input 클래스 */
                  />
                </td>
              </tr>
              
              {/* 제목 행 */}
              <tr>
                <th>
                  <label htmlFor="title">제목</label>
                </th>
                <td>
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
              
              {/* 내용 행 */}
              <tr>
                <th>
                  <label htmlFor="content">내용</label>
                </th>
                <td>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                    required
                    className="notice-form-textarea" /* 6. textarea 클래스 */
                  />
                </td>
              </tr>
            </tbody>
          </table>
          
          {/* 7. 버튼 컨테이너 클래스 (오른쪽 정렬 helper 추가) */}
          <div className="notice-form-actions right-align">
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="notice-form-button submit" /* 8. 버튼 클래스 */
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}