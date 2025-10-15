'use client'; //fullcalendar를 사용하기 위해 필요.

import dynamic from 'next/dynamic';

// ✅ FullCalendar는 클라이언트에서만, SSR 비활성화
const FullCalendar = dynamic(() => import('@fullcalendar/react'), { ssr: false });

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// ✅ v6 CSS는 클라이언트 파일에서 임포트
import '@fullcalendar/core/index.cjs';
import '@fullcalendar/daygrid/index.cjs';
import '@fullcalendar/timegrid/index.cjs';

type EventInput = {
  title: string;
  start?: string;
  end?: string;
  date?: string;
  color?: string;
};

export default function CalendarClient({ events }: { events: EventInput[] }) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">학사일정</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        editable
        selectable
        selectMirror
        dayMaxEvents
        weekends
        dateClick={(info) => alert('선택한 날짜: ' + info.dateStr)}
        eventClick={(info) => alert('선택한 이벤트: ' + info.event.title)}
      />

      {/* 디버깅용 단순 출력 */}
      <pre className="mt-6">{JSON.stringify(events, null, 2)}</pre>



        {/*테스트용 다른 버전*/}
        <h1 className="text-xl font-semibold mb-4">학사일정</h1>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth" // 초기 뷰 설정 (월 단위)
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={events} // 캘린더에 표시할 이벤트 데이터
              editable={true} // 이벤트 드래그, 리사이즈 가능 여부
              selectable={true} // 날짜 선택 가능 여부
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true} // 주말 표시 여부
              // 다양한 이벤트 핸들러를 추가할 수 있습니다.
              dateClick={(info) => {
                alert('선택한 날짜: ' + info.dateStr);
              }}
              eventClick={(info) => {
                alert('선택한 이벤트: ' + info.event.title);
              }}
            />

            <h1 className="text-xl font-semibold mb-4">행사 요약</h1>
              {events.map((e, i) => (
                <li key={i}>
                  <strong>{e.title}</strong>{' '}
                  {e.start ? `(${e.start} ~ ${e.end || e.start})` : e.date}
                </li>
              ))}


    </div>
  );
}
