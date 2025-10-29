'use client';

import React, { useState, useEffect } from 'react';

// 1. 불러올 데이터의 타입을 실제 필드에 맞게 수정합니다.
// (DB에 저장된 필드 이름과 일치해야 합니다)
interface Curriculum {
  _id: string; // MongoDB가 자동으로 생성하는 ID
  academicYear: string;
  semester: string;
  subjectArea: string;
  subjectType: string;
  electiveType: string;
  subjectName: string;
  targetGrade: string;
  instructor: string;
  createdAt: string; // API에서 추가한 생성 날짜
}

export default function Testpage3() {
  // 2. state의 타입을 'Curriculum[]'으로 변경합니다.
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트가 처음 로드될 때 API(/api/test_page2-1)를 호출합니다.
  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        setIsLoading(true);
        // API의 GET 함수를 호출합니다.
        const response = await fetch('/api/test_page2');

        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        // 3. state에 불러온 데이터를 저장합니다.
        setCurriculums(data);
      } catch (error) {
        console.error('목록 로딩 중 오류:', error);
        alert('목록을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurriculums();
  }, []); // 빈 배열: 최초 1회만 실행

  // --- 4. 렌더링(JSX) 부분을 수정합니다. ---

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div>
        <h4>교육과정 목록</h4>
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  // 로딩 완료 후
  return (
    <div>
      <h4>교육과정 목록</h4>
      
      {curriculums.length === 0 && <p>등록된 교육과정이 없습니다.</p>}

      <ul>
        {/* curriculums 배열을 순회하며 각 항목을 렌더링합니다. */}
        {curriculums.map((curriculum) => (
          <li key={curriculum._id} style={{ borderBottom: '1px solid #ccc', margin: '10px 0', paddingBottom: '10px' }}>
            {/* 가져온 데이터(curriculum 객체)의 필드를 화면에 표시합니다.
              예: curriculum.subjectName, curriculum.instructor 등
            */}
            <strong>{curriculum.subjectName}</strong> (강의자: {curriculum.instructor})
            <div>
              <span>{curriculum.academicYear}학년도</span> | 
              <span> {curriculum.semester}</span> | 
              <span> 대상: {curriculum.targetGrade}</span>
            </div>
            <div>
              <span>{curriculum.subjectArea}</span>
              {curriculum.subjectType && <span> &gt; {curriculum.subjectType}</span>}
              {curriculum.electiveType && <span> &gt; {curriculum.electiveType}</span>}
            </div>
            <small>등록일: {new Date(curriculum.createdAt).toLocaleString('ko-KR')}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}