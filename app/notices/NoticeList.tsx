import Link from "next/link";
import { INotice } from "@/models/Notice";
import { usePagination, DOTS } from "@/lib/pagination";

interface ApiResponse {
  success: boolean;
  data: INotice[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

// 1. ▼▼▼ getNotices가 query도 받도록 수정 ▼▼▼
async function getNotices(
  page: string | number,
  query: string
): Promise<ApiResponse> {
  // 2. ▼▼▼ fetch URL에 query 파라미터 추가 ▼▼▼
  // encodeURIComponent는 한글 검색어가 URL에서 깨지지 않게 보장합니다.
  const queryString = `page=${page}&limit=10&query=${encodeURIComponent(query)}`;
  
  const res = await fetch(`http://localhost:3000/api/notices?${queryString}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notices");
  }
  return res.json();
}

// 3. ▼▼▼ Props로 query를 받도록 수정 ▼▼▼
export default async function NoticeList({
  currentPage,
  query,
}: {
  currentPage: number;
  query: string;
}) {
  // 4. ▼▼▼ getNotices 호출 시 query 전달 ▼▼▼
  const {
    data: notices,
    totalPages,
    totalCount = 0,
  } = await getNotices(currentPage, query);

  const paginationRange = usePagination(currentPage, totalPages);

  return (
    <>
      <table className="notice-list-table">
        {/* ... (테이블 thead 부분) ... */}
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {notices.length === 0 ? (
            <tr>
              <td colSpan={5} className="no-data-cell">
                {query ? "검색 결과가 없습니다." : "등록된 공지사항이 없습니다."}
              </td>
            </tr>
          ) : (
            notices.map((notice, index) => {
              const noticeNumber = totalCount - (currentPage - 1) * 10 - index;
              return (
                <tr key={notice._id as string}>
                  <td>{noticeNumber}</td>
                  <td className="title-cell">
                    <Link
                      href={`/notices/${notice._id}`}
                      className="title-link"
                    >
                      {notice.title}
                    </Link>
                  </td>
                  <td>{notice.author}</td>
                  <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
                  <td>{notice.views}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* 5. ▼▼▼ 페이지네이션 Link에 query 파라미터 추가 ▼▼▼ */}
      <div className="pagination-controls">
        <Link
          href={`/notices?query=${query}&page=${currentPage - 1}`}
          className={currentPage <= 1 ? "disabled" : ""}
        >
          이전
        </Link>
        <div className="pagination-numbers">
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return <span key={index} className="dots">...</span>;
            }
            if (pageNumber === currentPage) {
              return <span key={index} className="page-number active">
                  {pageNumber}
                </span>;
            }
            return (
              <Link
                key={index}
                href={`/notices?query=${query}&page=${pageNumber}`}
                className="page-number"
              >
                {pageNumber}
              </Link>
            );
          })}
        </div>
        <Link
          href={`/notices?query=${query}&page=${currentPage + 1}`}
          className={currentPage >= totalPages ? "disabled" : ""}
        >
          다음
        </Link>
      </div>
    </>
  );
}