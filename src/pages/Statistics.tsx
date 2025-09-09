import React from 'react';
import { WeeklySummary } from '../features/dashboard/components/WeeklySummary';

export const StatisticsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">통계</h1>
      
      {/* 주간 요약 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">주간 영양 섭취 현황</h2>
        <WeeklySummary />
      </div>

      {/* 월간 통계 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">월간 통계</h2>
        <div className="text-center text-gray-500">
          준비 중입니다.
        </div>
      </div>

      {/* 영양소 분석 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">영양소 분석</h2>
        <div className="text-center text-gray-500">
          준비 중입니다.
        </div>
      </div>
    </div>
  );
};
