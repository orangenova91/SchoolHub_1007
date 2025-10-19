'use client'; 

import React, { useState } from 'react';
import CreateSubject from './create_class'; 

export default function Testpage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>Test Page</h1>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        수업 만들기 (팝업)
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
          <div className="relative">
            {/* ✨ [핵심] CreateSubject에 onClose라는 이름으로 
              모달을 닫는 함수를 전달합니다. 
            */}
            <CreateSubject onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}