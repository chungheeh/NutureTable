import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { WeeklySummary } from '../features/dashboard/components/WeeklySummary';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

// 임시 데이터 페칭 함수
const fetchDashboardData = async () => {
  // 실제 구현에서는 API 호출
  return {
    weekly: [
      { day: '월', calories: 1800, protein: 70, carbs: 220, fat: 60 },
      { day: '화', calories: 2000, protein: 75, carbs: 240, fat: 65 },
      { day: '수', calories: 1900, protein: 72, carbs: 230, fat: 62 },
      { day: '목', calories: 2100, protein: 80, carbs: 250, fat: 68 },
      { day: '금', calories: 2200, protein: 85, carbs: 260, fat: 70 },
      { day: '토', calories: 2300, protein: 90, carbs: 270, fat: 75 },
      { day: '일', calories: 1950, protein: 74, carbs: 235, fat: 64 },
    ],
    recentMeals: [
      { id: '1', name: '아침 식사', calories: 450, time: '08:30', date: '2023-09-15' },
      { id: '2', name: '점심 식사', calories: 700, time: '12:30', date: '2023-09-15' },
      { id: '3', name: '저녁 식사', calories: 650, time: '18:30', date: '2023-09-15' },
    ],
    alerts: [
      { id: '1', type: 'warning', message: '오늘 단백질 섭취량이 목표보다 낮습니다.' },
      { id: '2', type: 'info', message: '물을 더 섭취하는 것이 좋습니다.' },
    ],
  };
};

export const DashboardPage: React.FC = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-lg">
      {/* 사용자 환영 메시지 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">안녕하세요 👋</h1>
          <p className="text-sm text-gray-600">오늘도 건강한 하루 보내세요</p>
        </div>
        <div className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
          목표 달성률 85%
        </div>
      </div>

      {/* 오늘의 영양 섭취 현황 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">오늘의 영양 섭취</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-600">1,850</div>
              <div className="text-xs text-gray-500 mt-1">칼로리 (kcal)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">75g</div>
              <div className="text-xs text-gray-500 mt-1">단백질</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">2.5L</div>
              <div className="text-xs text-gray-500 mt-1">수분</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 주간 요약 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">주간 영양 섭취 현황</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <WeeklySummary data={dashboardData?.weekly} />
        </CardContent>
      </Card>

      {/* 최근 식사 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">오늘의 식사</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dashboardData?.recentMeals.map((meal) => (
              <div key={meal.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {meal.name.includes('아침') && '🌅'}
                    {meal.name.includes('점심') && '🌞'}
                    {meal.name.includes('저녁') && '🌙'}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{meal.name}</h4>
                    <p className="text-sm text-gray-500">{meal.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{meal.calories} kcal</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 영양 알림 */}
      <div className="space-y-3">
        {dashboardData?.alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg flex items-center space-x-3 ${
              alert.type === 'warning' 
                ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' 
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}
          >
            <div className="flex-shrink-0">
              {alert.type === 'warning' ? '⚠️' : 'ℹ️'}
            </div>
            <p className="text-sm">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

