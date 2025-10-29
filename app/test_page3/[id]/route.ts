// app/test_page3/[id]/page.tsx
'use client'; // useParams를 사용하기 위해 클라이언트 컴포넌트로 지정

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // URL의 [id] 값을 가져오기 위한 훅

// 목록 페이지에서 사용했던 타입 재사용
interface Curriculum {
  _id: string;
  academicYear: string;
  semester: string;
  subjectArea: string;
  subjectType: string;
  electiveType: string;
  subjectName: string;
  targetGrade: string;
  instructor: string;
  createdAt: string;
}

export default function CurriculumDetailPage() {
  // 1. URL의 파라미터(id) 가져오기
  const params = useParams();
  const id = params.id as string; // URL에서 /test_page3/여기에있는ID

  // 2. 하나의 Curriculum 데이터를 저장할 state
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 3. id 값이 바뀔 때마다 실행 (페이지가 처음 로드될 때)
  useEffect(() => {
    // id가 존재하는지 확인
    if (id) {
      const fetchDetail = async () => {
        try {
          setIsLoading(true);
          // 1단계에서 만든 API를 호출
          const response = await fetch(`/api/test_page2-1/${id}`);

          if (!response.ok) {
            throw new Error('상세 데이터를 불러오지 못했습니다.');
          }

          const data = await response.json();
          setCurriculum(data); // state에 저장
        } catch (error) {
          console.error('상세 데이터 로딩 중 오류:', error);
          alert('데이터 로딩에 실패했습니다.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchDetail();
    }
  }, [id]); // id가 변경될 때마다 이 useEffect를 다시 실행

  // 4. 렌더링
  if (isLoading) {
    return <div>상세 정보를 불러오는 중입니다...</div>;
  }

  if (!curriculum) {
    return <div>해당 데이터를 찾을 수 없습니다.</div>;
  }

  // 데이터 로딩 완료 시 상세 내용 표시
  return (
    <div>
      <h3>{curriculum.subjectName} (상세 정보)</h3>
      <p><strong>강의자:</strong> {curriculum.instructor}</p>
      <p><strong>학년도:</strong> {curriculum.academicYear}</p>
      <p><strong>학기:</strong> {curriculum.semester}</p>
      <p><strong>대상 학년:</strong> {curriculum.targetGrade}</p>
      <p><strong>교과(군):</strong> {curriculum.subjectArea}</p>
      <p><strong>교과 영역:</strong> {curriculum.subjectType}</p>
      <p><strong>선택 영역:</strong> {curriculum.electiveType}</p>
      <p><strong>등록일:</strong> {new Date(curriculum.createdAt).toLocaleString('ko-KR')}</p>
    </div>
  );
}