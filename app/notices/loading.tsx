// loading.tsx는 자동으로 Suspense Fallback으로 작동합니다.
export default function Loading() {
  // CSS로 만든 간단한 스피너 또는 "로딩 중..." 텍스트
  return (
    <div className="pagination-controls" style={{ marginTop: '50px' }}>
      <p>공지사항을 불러오는 중입니다...</p>
    </div>
  );
}