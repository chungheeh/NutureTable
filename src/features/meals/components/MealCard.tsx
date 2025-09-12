import React, { useState } from 'react';

export type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  sodium?: number;
  cholesterol?: number;
  saturatedFat?: number;
  transFat?: number;
};

type MealCardProps = {
  meal: Meal;
  accentColor: string;
  onDelete: () => void;
  onEdit: (meal: Meal) => void;
};

export const MealCard: React.FC<MealCardProps> = ({ 
  meal, 
  accentColor, 
  onDelete,
  onEdit 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(meal);
  };

  return (
    <div 
      className="border-b border-gray-200 last:border-b-0"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 transition-colors px-2">
        <div className="flex items-center gap-3">
          <span className={`text-sm ${accentColor}`}>{meal.time}</span>
          <h3 className="font-medium text-gray-900">{meal.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">{meal.calories}kcal</span>
          <button
            onClick={handleEdit}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            title="식사 정보 수정"
          >
            <svg 
              className={`w-4 h-4 ${accentColor}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
              />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 hover:bg-red-50 rounded-full transition-colors"
            title="식사 기록 삭제"
          >
            <svg 
              className="w-4 h-4 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <svg 
            className={`w-5 h-5 text-gray-500 transition-transform duration-500 ease-in-out ${
              isExpanded ? 'transform rotate-180' : ''
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {isExpanded && (
        <div className="pb-4 px-4 bg-white">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* 영양정보 헤더 */}
            <div className="bg-black text-white p-3">
              <div className="text-sm">영양정보</div>
              <div className="flex justify-between items-baseline mt-1">
                <div>1회 제공량당</div>
                <div className="text-lg font-bold">{meal.calories}kcal</div>
              </div>
            </div>

            {/* 영양성분 테이블 */}
            <div className="divide-y divide-gray-200">
              <NutrientRow 
                label="탄수화물" 
                amount={`${meal.carbs}g`} 
                percentage="4%"
              />
              <NutrientRow 
                label="단백질" 
                amount={`${meal.protein}g`}
                percentage="4%" 
              />
              <NutrientRow 
                label="지방" 
                amount={`${meal.fat}g`}
                percentage="5%" 
              />
              {meal.saturatedFat !== undefined && (
                <NutrientRow 
                  label="포화지방" 
                  amount={`${meal.saturatedFat}g`}
                  percentage="5%"
                  indent
                />
              )}
              {meal.transFat !== undefined && (
                <NutrientRow 
                  label="트랜스지방" 
                  amount={`${meal.transFat}g`}
                  indent
                />
              )}
              {meal.cholesterol !== undefined && (
                <NutrientRow 
                  label="콜레스테롤" 
                  amount={`${meal.cholesterol}mg`}
                  percentage="1%"
                />
              )}
              {meal.sodium !== undefined && (
                <NutrientRow 
                  label="나트륨" 
                  amount={`${meal.sodium}mg`}
                  percentage="4%"
                />
              )}
            </div>

            {/* 기준치 설명 */}
            <div className="p-3 text-xs text-gray-500 border-t border-gray-200">
              * 1일 영양성분 기준치에 대한 비율(%)은 2,000kcal 기준이므로 개인의 필요 열량에 따라 다를 수 있습니다.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

type NutrientRowProps = {
  label: string;
  amount: string;
  percentage?: string;
  indent?: boolean;
};

const NutrientRow: React.FC<NutrientRowProps> = ({ 
  label, 
  amount, 
  percentage, 
  indent = false 
}) => (
  <div className={`flex items-center justify-between p-2 ${indent ? 'pl-6' : ''}`}>
    <span className="text-sm">{label}</span>
    <div className="flex gap-8">
      <span className="text-sm font-medium">{amount}</span>
      {percentage && (
        <span className="text-sm font-bold w-12 text-right">{percentage}</span>
      )}
    </div>
  </div>
);