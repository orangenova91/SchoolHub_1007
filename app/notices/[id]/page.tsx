// app/notices/[id]/page.tsx
import { INotice } from "@/models/Notice";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import NoticeActions from "./NoticeActions";
import { headers } from "next/headers"; // ✅ 호스트/프로토콜 파악용

export const dynamic = "force-dynamic";

interface ApiResponse {
  success: boolean;
  data: INotice;
}

// ✅ 실행중 호스트/프로토콜 기반 base URL 계산 (배포/로컬 모두 안전)
async function getBaseUrl() {
  const hdrs = await headers();
  const host = hdrs.get("x-forwarded-host") ?? hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  // 환경변수가 있으면 우선 사용
  return process.env.NEXT_PUBLIC_BASE_URL ?? `${proto}://${host}`;
}

// ✅ 단일 공지사항 fetching (조회수 증가 view=true)
async function getNotice(id: string): Promise<ApiResponse> {
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/notices/${id}?view=true`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch notice");
  return res.json();
}

// ✅ params를 Promise로 받고 await로 풀어쓰기
export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ← 핵심 수정

  try {
    const { data: notice } = await getNotice(id);

    if (!notice) {
      return (
        <DashboardLayout>
          <div className="notice-form-wrapper">
            <h2>공지사항을 찾을 수 없습니다.</h2>
            <Link href="/notices">목록으로 돌아가기</Link>
          </div>
        </DashboardLayout>
      );
    }

    return (
      <DashboardLayout>
        <div className="notice-form-wrapper">
          <h2 className="notice-form-title"><Link href="/notices">
              공지사항
            </Link></h2>
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

          <div className="notice-detail-content">{notice.content}</div>

          <NoticeActions noticeId={id} />
        </div>
      </DashboardLayout>
    );
  } catch (error) {
    console.error(error);
    return (
      <DashboardLayout>
        <div className="notice-form-wrapper">
          <h2>오류 발생</h2>
          <p>공지사항을 불러오는 데 실패했습니다.</p>
          <Link href="/notices">목록으로 돌아가기</Link>
        </div>
      </DashboardLayout>
    );
  }
}
