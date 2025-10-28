'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// DB에서 가져온 데이터의 타입을 정의합니다. (오타 수정)
type Curriculumn = {
  _id?: string;
  academicYear?: number;
  semester?: number;
  subjectArea?: string;   
  subjectType?: string;
  electiveType?: string;
  subjectName?: string;
  instructor?: string;    
  introduction?: string;  
  classroom?: string;
  writtenExamRatio?: number; 
  performanceExamRatio?: number;
};

export default function CreateSubject({ onClose }: { onClose: () => void }) {  
  const router = useRouter();
  
  // 1. 폼(form) 데이터를 위한 상태 변수 (이름 변경: CurriculumData -> formData)
  const [formData, setFormData] = useState({
    academicYear: new Date().getFullYear(),
    semester: '2',
    subjectArea: '',
    subjectType: '',
    electiveType: '',
    targetGrade: '1',
    subjectName: '',
    instructor: '',
    introduction: '',
    classroom: '',
    writtenExamRatio: 50,
    performanceExamRatio: 50,
  });

  // 2. API에서 받아온 목록 데이터를 위한 상태 변수 (이름 변경: CurriculumData -> curriculumList)
  const [curriculumList, setCurriculumList] = useState<Curriculumn[]>([]);
  const [error, setError] = useState<string | null>(null);

  // ✨ 2. 제출 중인지 상태를 관리할 변수를 추가합니다. (버튼 비활성화용)
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/db/2022_curriculum", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setCurriculumList(json); // 올바른 setter 함수 사용
      } catch (e: any) {
        setError(e?.message ?? "Unknown error");
      }
    })();
  }, []);

  if (error) return <div>에러: {error}</div>;


  // --- ✨ [핵심] 과목명(subjectName) 선택 시 호출될 새 핸들러 ---
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubjectName = e.target.value;

    // 전체 목록(curriculumList)에서 선택된 과목명과 일치하는 과목의 전체 정보를 찾습니다.
    const selectedSubjectData = curriculumList.find(
      (item) => item.subjectName === selectedSubjectName
    );

    if (selectedSubjectData) {
      // 일치하는 과목을 찾았다면, form 상태를 업데이트합니다.
      setFormData(prevFormData => ({
        ...prevFormData, // 학년도, 학기 등 기존의 다른 값들은 그대로 유지
        subjectName: selectedSubjectData.subjectName || '',
        subjectArea: selectedSubjectData.subjectArea || '',
        subjectType: selectedSubjectData.subjectType || '',
        electiveType: selectedSubjectData.electiveType || '',
      }));
    } else {
      // "-- 선택 --"과 같은 빈 옵션을 선택한 경우, 관련 필드를 초기화합니다.
      setFormData(prevFormData => ({
        ...prevFormData,
        subjectName: '',
        subjectArea: '',
        subjectType: '',
        electiveType: '',
      }));
    }
  };




  const handleRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const ratioValue = parseInt(value, 10);

    if (name === 'writtenExamRatio') {
      setFormData({
        ...formData, // 올바른 상태 변수(formData) 사용
        writtenExamRatio: ratioValue,
        performanceExamRatio: 100 - ratioValue,
      });
    } else {
      setFormData({
        ...formData, // 올바른 상태 변수(formData) 사용
        performanceExamRatio: ratioValue,
        writtenExamRatio: 100 - ratioValue,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // 올바른 상태 변수(formData) 사용
  };


// ✨ 3. [핵심] 폼 제출을 처리할 handleSubmit 함수를 만듭니다.
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  try {
    const response = await fetch('/api/create_subject', { // 실제 API 경로로 변경
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      // 서버가 보낸 구체적인 에러 메시지를 JSON 형태로 받음
      const errorData = await response.json(); 
      
      // 서버가 보낸 메시지가 있다면 그것을, 없다면 기본 메시지를 에러로 던짐
      throw new Error(errorData.message || '서버에서 알 수 없는 오류가 발생했습니다.');
    }

    // 성공 로직
    alert('성공적으로 처리되었습니다.');

  } catch (error) {
    console.error('폼 제출 실패:', error);
    // 개선된 에러 메시지를 사용자에게 보여줌
    alert((error as Error).message); 
  }
};

  return (
<form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md max-w-xl mx-auto">      <h2 className="text-2xl font-bold mb-6">새로운 수업 만들기</h2>
      
      {/* --- 모든 value에서 CurriculumData 대신 formData를 사용하도록 수정 --- */}
      <div className="space-y-6 mb-6">
        {/* 첫 번째 줄: 학년도, 학기 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700">학년도</label>
            <input type="number" name="academicYear" id="academicYear" value={formData.academicYear} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700">학기</label>
            <select name="semester" id="semester" value={formData.semester} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="1">1학기</option>
              <option value="2">2학기</option>
            </select>
          </div>
        </div>

        {/* 두 번째 줄: 교과(군), 교과 구분, 선택과목 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
              <label htmlFor="subjectArea" className="block text-sm font-medium text-gray-700">교과(군)</label>
              <input type="text" name="subjectArea" id="subjectArea" value={formData.subjectArea} disabled
                     className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"/>
          </div>
          <div>
            <label htmlFor="subjectType" className="block text-sm font-medium text-gray-700">교과 구분</label>
            <input type="text" name="subjectType" id="subjectType" value={formData.subjectType} disabled
                   className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"/>
          </div>
          <div>
            <label htmlFor="electiveType" className="block text-sm font-medium text-gray-700">선택과목</label>
            <input type="text" name="electiveType" id="electiveType" value={formData.electiveType} disabled
                   className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"/>
          </div>
        </div>
        

        {/* 세 번째 줄: 과목명, 대상학년 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">과목명</label>
            <select
              name="subjectName"
              id="subjectName"
              value={formData.subjectName}
              onChange={handleSubjectChange} // 새로 만든 핸들러를 연결합니다.
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- 과목을 선택하세요 --</option>
              {curriculumList.map((item) => (
                <option key={item._id} value={item.subjectName}>
                  {item.subjectName}
                </option>
              ))}
            </select>
          </div>
          </div>
        
        {/* 수업 소개 */}
        <div>
          <label htmlFor="introduction" className="block text-sm font-medium text-gray-700">수업 소개</label>
          <textarea name="introduction" id="introduction" rows="4" placeholder="수업의 목표, 내용 등을 간략히 소개해주세요." value={formData.introduction} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
      </div>
      {/* ----------------------------- */}


      {/* 상세 정보 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">담당 교사</label>
          <input type="text" name="instructor" id="instructor" value={formData.instructor} onChange={handleChange}  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="classroom" className="block text-sm font-medium text-gray-700">강의실</label>
          <input type="text" name="classroom" id="classroom" placeholder="예: 2-1반 교실 또는 온라인" value={formData.classroom} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
      </div>

      {/* 평가 비율 설정 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">평가 비율 설정</label>
        <div className="flex items-center space-x-4">
          <span className="text-sm">지필평가</span>
          <input type="range" name="writtenExamRatio" min="0" max="100" value={formData.writtenExamRatio} onChange={handleRatioChange} className="w-full"/>
          <span className="w-12 text-center">{formData.writtenExamRatio}%</span>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <span className="text-sm">수행평가</span>
          <input type="range" name="performanceExamRatio" min="0" max="100" value={formData.performanceExamRatio} onChange={handleRatioChange} className="w-full"/>
          <span className="w-12 text-center">{formData.performanceExamRatio}%</span>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-end space-x-4">
        <button type="button" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">취소</button>
        <button type="button" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200">임시 저장</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">수업 만들기</button>
      </div>
    </form>
  );
}