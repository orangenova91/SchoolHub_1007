// app/notices/page.tsx
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Suspense } from "react";
import NoticeList from "./NoticeList";
import Loading from "./loading";
import { headers } from "next/headers";

// 1. ▼▼▼ 페이지를 async로 유지 (searchParams를 await 하기 위함) ▼▼▼
// (이전 'sync-dynamic-apis' 오류 해결책 유지)
type SearchParams = Record<string, string | string[] | undefined>;

export default async function NoticeListPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  // 2. ▼▼▼ 'query' 파라미터 읽기 (page와 동일한 방식) ▼▼▼
  const pageParam = params?.page;
  const currentPage = Number(Array.isArray(pageParam) ? pageParam[0] : pageParam ?? "1") || 1;
  
  const queryParam = params?.query;
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam ?? "";

  return (
    <DashboardLayout>
      <div className="notice-form-wrapper">
        <div className="notice-list-header">
          <h2 className="notice-form-title">
            <Link href="/notices">
              공지사항
            </Link>
          </h2>
          <Link href="/notices/new" className="notice-form-button submit">
            새 글 작성
          </Link>
        </div>

        {/* 3. ▼▼▼ 검색 폼 UI 추가 ▼▼▼ */}
        <div className="notice-search-form">
          <form action="/notices" method="GET">
            {/* 페이지네이션을 위해 page=1로 리셋하는 hidden input (선택 사항)
            <input type="hidden" name="page" value="1" />
            */}
            <input
              type="text"
              name="query"
              placeholder="제목 또는 내용 검색"
              defaultValue={query} // 👈 현재 검색어 유지
            />
            <button type="submit" className="notice-form-button submit">
              검색
            </button>
          </form>
        </div>

        {/* 4. ▼▼▼ Suspense에 query prop 전달 ▼▼▼ */}
        <Suspense fallback={<Loading />}>
          <NoticeList currentPage={currentPage} query={query} />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
