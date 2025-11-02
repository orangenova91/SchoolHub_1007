'use client'; // 👈 클라이언트 컴포넌트 선언

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 이 컴포넌트가 받을 props 타입 정의
interface NoticeActionsProps {
  noticeId: string;
}

export default function NoticeActions({ noticeId }: NoticeActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // 삭제 처리 핸들러
  const handleDelete = async () => {
    // 사용자에게 삭제 여부 확인
    if (!window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      return; // '취소' 시 중단
    }

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/notices/${noticeId}`, {
        method: 'DELETE', // 👈 DELETE 메소드 사용
      });

      if (!res.ok) {
        throw new Error('Failed to delete notice');
      }

      alert('공지사항이 삭제되었습니다.');
      router.push('/notices'); // 삭제 후 목록 페이지로 이동
      router.refresh(); // 목록 페이지의 데이터를 새로고침
    
    } catch (error) {
      console.error(error);
      alert('삭제에 실패했습니다.');
      setIsDeleting(false); // 실패 시 버튼 활성화
    }
  };

  /* 기존 스타일 */
  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
  };

  const listLinkStyle: React.CSSProperties = {
    display: 'inline-block', padding: '8px 16px', border: '1px solid #ccc',
    borderRadius: '5px', textDecoration: 'none', color: '#333',
  };

  const editLinkStyle: React.CSSProperties = {
    display: 'inline-block', padding: '8px 16px', background: '#0070f3',
    color: 'white', borderRadius: '5px', textDecoration: 'none',
    fontWeight: '500',
  };

  /* ▼▼▼ 삭제 버튼 스타일 추가 ▼▼▼ */
  const deleteButtonStyle: React.CSSProperties = {
    display: 'inline-block', padding: '8px 16px', background: '#e00000', // 빨간색
    color: 'white', borderRadius: '5px', textDecoration: 'none',
    fontWeight: '500', border: 'none', cursor: 'pointer',
  };

  return (
    <div style={buttonContainerStyle}>
      {/* 목록으로 버튼 */}
      <Link href="/notices" style={listLinkStyle}>
        목록으로
      </Link>
      
      {/* 수정 및 삭제 버튼 그룹 (우측 정렬) */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* 수정하기 버튼 */}
        <Link href={`/notices/${noticeId}/edit`} style={editLinkStyle}>
          수정하기
        </Link>

        {/* ▼▼▼ 삭제하기 버튼 추가 ▼▼▼ */}
        <button
          onClick={handleDelete}
          disabled={isDeleting} // 삭제 중 비활성화
          style={deleteButtonStyle}
        >
          {isDeleting ? '삭제 중...' : '삭제하기'}
        </button>
      </div>
    </div>
  );
}