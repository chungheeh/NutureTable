import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// 임시 데이터 페칭 함수
const fetchDashboardData = async () => {
  // 실제 구현에서는 API 호출
  return {
    userName: null, // API 연동 시 사용자 이름이 들어갈 자리
    weekly: [
      { day: '월', calories: 1800, protein: 70, carbs: 220, fat: 60 },
      { day: '화', calories: 2000, protein: 75, carbs: 240, fat: 65 },
      { day: '수', calories: 1900, protein: 72, carbs: 230, fat: 62 },
      { day: '목', calories: 2100, protein: 80, carbs: 250, fat: 68 },
      { day: '금', calories: 2200, protein: 85, carbs: 260, fat: 70 },
      { day: '토', calories: 2300, protein: 90, carbs: 270, fat: 75 },
      { day: '일', calories: 1950, protein: 74, carbs: 235, fat: 64 },
    ],
    alerts: [
      { id: '1', type: 'warning', message: '오늘 단백질 섭취량이 목표보다 낮습니다.' },
      { id: '2', type: 'info', message: '물을 더 섭취하는 것이 좋습니다.' },
    ],
  };
};

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
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
      <div className="flex items-center">
        <div>
          {dashboardData?.userName ? (
            <h1 className="text-xl font-bold text-gray-900">{dashboardData.userName}님, 안녕하세요 👋</h1>
          ) : (
            <h1 className="text-xl font-medium text-red-500">네트워크를 확인해주세요.</h1>
          )}
        </div>
      </div>

      {/* 오늘의 섭취 칼로리 */}
      <Card 
        className="cursor-pointer active:bg-gray-50 transition-colors"
        onClick={() => navigate('/meals')}
      >
        <CardHeader className="pb-0">
          <CardTitle className="text-xl font-bold text-center mb-2">오늘의 섭취 칼로리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-2">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-primary-600 tracking-tight">1,850</div>
              <div className="text-base text-gray-500 mt-2">kcal</div>
            </div>
            <div className="w-full max-w-[180px] h-[180px] relative mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: '탄수화물', value: 60, color: '#3B82F6' },
                      { name: '단백질', value: 20, color: '#10B981' },
                      { name: '지방', value: 20, color: '#F59E0B' }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {[
                      { name: '탄수화물', color: '#3B82F6' },
                      { name: '단백질', color: '#10B981' },
                      { name: '지방', color: '#F59E0B' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full max-w-[300px] text-center mt-2">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#3B82F6] mb-1"></div>
                <div className="text-xs">
                  <div className="font-medium">탄수화물</div>
                  <div className="text-gray-500">60%</div>
                  <div className="text-[10px] text-gray-400">(276g)</div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#10B981] mb-1"></div>
                <div className="text-xs">
                  <div className="font-medium">단백질</div>
                  <div className="text-gray-500">20%</div>
                  <div className="text-[10px] text-gray-400">(92g)</div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#F59E0B] mb-1"></div>
                <div className="text-xs">
                  <div className="font-medium">지방</div>
                  <div className="text-gray-500">20%</div>
                  <div className="text-[10px] text-gray-400">(41g)</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 근처 가맹점 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">내 근처 가맹점</CardTitle>
            <span className="text-sm text-gray-500">서울 서대문구</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {[
              {
                id: 1,
                name: '건강한 샐러드',
                distance: '0.3km',
                rating: 4.5,
                category: '샐러드',
                address: '서대문구 연희동 123-45',
                isOpen: true
              },
              {
                id: 2,
                name: '채소 다이닝',
                distance: '0.5km',
                rating: 4.8,
                category: '한식',
                address: '서대문구 창천동 56-78',
                isOpen: true
              },
              {
                id: 3,
                name: '단백질 스토어',
                distance: '0.7km',
                rating: 4.3,
                category: '도시락',
                address: '서대문구 대현동 90-12',
                isOpen: false
              }
            ].map((store) => (
              <div key={store.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {store.category === '샐러드' && '🥗'}
                  {store.category === '한식' && '🍚'}
                  {store.category === '도시락' && '🍱'}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{store.name}</h3>
                      <p className="text-sm text-gray-500">{store.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-primary-600">{store.distance}</div>
                      <div className="flex items-center text-sm text-yellow-500">
                        ★ {store.rating}
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-xs text-gray-500">{store.address}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      store.isOpen 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {store.isOpen ? '영업중' : '영업종료'}
                    </span>
                  </div>
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

