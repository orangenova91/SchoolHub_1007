//import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
//import { Button } from "@/components/ui/button"
//import { Badge } from "@/components/ui/badge"
//import { BookOpen, FileText, Clock, Users, Plus } from "lucide-react"
import React from 'react';
import CalendarClient from './schoolcalendar_data';


type Row = Record<string, any>;

async function fetchJSON(url: string, init?: RequestInit) {
  const resp = await fetch(url, init);
  const ct = resp.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    const text = await resp.text();
    throw new Error(`Expected JSON but got ${resp.status} ${ct}. Body: ${text.slice(0,300)}`);
  }
  return resp.json();
}

async function getSchedule(sheet = "학사일정") {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  const url  = `${base}/api/sheets?sheet=${encodeURIComponent(sheet)}`;

  const json = await fetchJSON(url, { cache: "no-store" });
  if (!json?.success) throw new Error(json?.error || "불러오기 실패");
  return json.data;
}

export async function Schoolcalendar() {
  const rows = await getSchedule("학사일정");

  if (!rows.length) {
    return <div className="p-6">학사일정 데이터가 없습니다.</div>;
  }

  // 동적 헤더(시트 1행)를 키로 사용
  const headers = Object.keys(rows[0]);


  const events = [
        { title: '중간고사', start: '2025-10-27', end: '2025-10-31' },
        { title: '가을 소풍', date: '2025-11-05' },
        { title: '학부모 상담 주간', start: '2025-11-10', end: '2025-11-14', color: '#ff9f89' }
      ];

  return (
    <div>

      




      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">학사일정</h1>
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                {headers.map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className="border-t">
                  {headers.map((h) => (
                    <td key={h} className="px-3 py-2">{String(r[h] ?? "")}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <pre className="mt-6">{JSON.stringify(rows, null, 2)}</pre>
      <CalendarClient events={events} />
    </div>
  );
}
