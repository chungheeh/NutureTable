import React, { useState } from 'react';
import { Meal } from './MealCard';

export interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Meal;
  isEditing?: boolean;
}

export const AddMealModal: React.FC<AddMealModalProps> = ({
  isOpen,
  onClose,
  initialData,
  isEditing = false
}) => {
  const [mealData, setMealData] = useState<Partial<Meal>>(() => {
    if (initialData) {
      return { ...initialData };
    }
    return {
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      time: new Date().toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })
    };
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 식사 데이터 저장 또는 수정 로직 구현
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {isEditing ? '식사 정보 수정' : '식사 추가'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                음식명
              </label>
              <input
                type="text"
                id="name"
                value={mealData.name}
                onChange={(e) => setMealData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                시간
              </label>
              <input
                type="time"
                id="time"
                value={mealData.time}
                onChange={(e) => setMealData(prev => ({ ...prev, time: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
                칼로리 (kcal)
              </label>
              <input
                type="number"
                id="calories"
                value={mealData.calories}
                onChange={(e) => setMealData(prev => ({ ...prev, calories: Number(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                min="0"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="protein" className="block text-sm font-medium text-gray-700">
                  단백질 (g)
                </label>
                <input
                  type="number"
                  id="protein"
                  value={mealData.protein}
                  onChange={(e) => setMealData(prev => ({ ...prev, protein: Number(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  min="0"
                  required
                />
              </div>

              <div>
                <label htmlFor="carbs" className="block text-sm font-medium text-gray-700">
                  탄수화물 (g)
                </label>
                <input
                  type="number"
                  id="carbs"
                  value={mealData.carbs}
                  onChange={(e) => setMealData(prev => ({ ...prev, carbs: Number(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  min="0"
                  required
                />
              </div>

              <div>
                <label htmlFor="fat" className="block text-sm font-medium text-gray-700">
                  지방 (g)
                </label>
                <input
                  type="number"
                  id="fat"
                  value={mealData.fat}
                  onChange={(e) => setMealData(prev => ({ ...prev, fat: Number(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {isEditing ? '수정' : '추가'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};