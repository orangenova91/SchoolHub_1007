'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

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
      router.refresh(); 
    } catch (error) {
      console.error(error);
      alert('공지사항 등록에 실패했습니다.'); // 사용자에게 피드백
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================================================================ */
  /* ▼▼▼ 일관성 있는 UI를 위한 인라인 스타일 추가 ▼▼▼ */
  /* ================================================================ */
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    borderTop: '2px solid #333',
  };
  const thStyle: React.CSSProperties = {
    background: '#f9f9f9',
    padding: '16px',
    textAlign: 'left',
    width: '150px', // 라벨 너비 고정
    borderBottom: '1px solid #eee',
  };
  const tdStyle: React.CSSProperties = {
    padding: '12px 16px', // 상하 12, 좌우 16
    borderBottom: '1px solid #eee',
  };
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box', // 패딩이 너비에 포함되도록
  };
  const textareaStyle: React.CSSProperties = {
    ...inputStyle, // 기본 input 스타일 상속
    minHeight: '250px',
    resize: 'vertical', // 수직 크기 조절만 허용
  };
  const buttonContainerStyle: React.CSSProperties = {
    marginTop: '20px',
    textAlign: 'right', // 버튼을 우측으로 정렬
  };
  const submitButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    background: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };
  /* ================================================================ */
  /* ▲▲▲ 스타일 추가 완료 ▲▲▲ */
  /* ================================================================ */

  return (
    <DashboardLayout>
      {/* 폼 전체를 감싸는 div 추가 */}
      <div style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <h2>공지사항 작성</h2>

          {/* ================================================================ */}
          {/* ▼▼▼ 이 부분이 <div>에서 <table> 태그로 변경되었습니다. ▼▼▼ */}
          {/* ================================================================ */}
          <table style={tableStyle}>
            <tbody>
              {/* 작성자 행 */}
              <tr>
                <th style={thStyle}>
                  <label htmlFor="author">작성자</label>
                </th>
                <td style={tdStyle}>
                  <input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </td>
              </tr>
              
              {/* 제목 행 */}
              <tr>
                <th style={thStyle}>
                  <label htmlFor="title">제목</label>
                </th>
                <td style={tdStyle}>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </td>
              </tr>
              
              {/* 내용 행 */}
              <tr>
                <th style={thStyle}>
                  <label htmlFor="content">내용</label>
                </th>
                <td style={tdStyle}>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                    required
                    style={textareaStyle}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {/* ================================================================ */}
          {/* ▲▲▲ 테이블로 변경 완료 ▲▲▲ */}
          {/* ================================================================ */}

          {/* 등록하기 버튼 */}
          <div style={buttonContainerStyle}>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              style={submitButtonStyle}
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}