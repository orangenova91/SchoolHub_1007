'use client';

import React, { useEffect, useState } from 'react';


export default function Testpage() {
  const [formData, setFormData] = useState({
    academicYear: new Date().getFullYear(),
    semester: '2',
    subjectArea: '',        // 교과(군)
    subjectType: '보통교과',   // 교과 구분
    electiveType: '일반선택', // 선택과목
    targetGrade: '1',         // 대상학년
    subjectName: '',
    instructor: '김민준', // 로그인된 교사 정보로 대체
    introduction: '',
    classroom: '',
    writtenExamRatio: 50,
    performanceExamRatio: 50,
  });

  const handleRatioChange = (e) => {
    const { name, value } = e.target;
    const ratioValue = parseInt(value, 10);

    if (name === 'writtenExamRatio') {
      setFormData({
        ...formData,
        writtenExamRatio: ratioValue,
        performanceExamRatio: 100 - ratioValue,
      });
    } else {
      setFormData({
        ...formData,
        performanceExamRatio: ratioValue,
        writtenExamRatio: 100 - ratioValue,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">새로운 수업 만들기</h2>
      
      {/* --- 변경된 레이아웃 섹션 --- */}
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
              <input type="text" name="subjectArea" id="subjectArea" placeholder="예: 사회" value={formData.subjectArea} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="subjectType" className="block text-sm font-medium text-gray-700">교과 구분</label>
            <select name="subjectType" id="subjectType" value={formData.subjectType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option>보통교과</option>
              <option>전문교과</option>
            </select>
          </div>
          <div>
            <label htmlFor="electiveType" className="block text-sm font-medium text-gray-700">선택과목</label>
            <select name="electiveType" id="electiveType" value={formData.electiveType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option>일반선택</option>
              <option>진로선택</option>
              <option>융합선택</option>
            </select>
          </div>
        </div>

        {/* 세 번째 줄: 과목명, 대상학년 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">과목명</label>
            <input type="text" name="subjectName" id="subjectName" placeholder="예: 세계지리" value={formData.subjectName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="targetGrade" className="block text-sm font-medium text-gray-700">대상학년</label>
            <select name="targetGrade" id="targetGrade" value={formData.targetGrade} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="1">1학년</option>
              <option value="2">2학년</option>
              <option value="3">3학년</option>
              <option value="0">무학년</option>
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
          <input type="text" name="instructor" id="instructor" value={formData.instructor} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"/>
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
    </div>
  );
}