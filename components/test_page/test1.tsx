import { stringify } from "querystring";

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
  //const base = process.env.NEXT_PUBLIC_BASE_URL;
  //const url  = `${base}/api/sheets?sheet=${encodeURIComponent(sheet)}`;
  const url = process.env.GAS_BASE_URL;

  const json = await fetchJSON(url, { cache: "no-store" });
  if (!json?.success) throw new Error(json?.error || "불러오기 실패");
  return json.data;
}



export async function Testpage() {
  const rows: Row[] = await getSchedule("학사일정");

  // 👇 데이터를 가공하는 로직을 여기에 추가합니다.
  const cleanedRows = rows.map(row => {
    // 1. 객체를 [key, value] 쌍의 배열로 변환합니다.
    const entries = Object.entries(row);

    // 2. value가 빈 문자열("")이 아닌 항목만 남깁니다.
    const filteredEntries = entries.filter(([key, value]) => value !== "");

    // 3. 필터링된 [key, value] 쌍으로 새로운 객체를 만듭니다.
    return Object.fromEntries(filteredEntries);
  });

  // 이제 key가 비어있던 항목들이 제거된 cleanedRows를 사용하면 됩니다.
  // 예시: <SomeClientComponent data={cleanedRows} />
  
  // 확인을 위해 화면에 출력해봅니다.
  return (
    <pre>
      <code>
        {JSON.stringify(cleanedRows, null, 2)}
      </code>
    </pre>
  );
}