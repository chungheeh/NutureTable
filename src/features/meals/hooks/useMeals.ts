import { useState, useMemo } from 'react';
import { Meal } from '../components/MealCard';

// 임시 데이터 - 나중에 API 연동으로 대체
const MOCK_MEALS: Record<string, Meal[]> = {
  today: [
    {
      id: '1',
      name: '닭가슴살 샐러드',
      calories: 350,
      protein: 40,
      carbs: 10,
      fat: 15,
      time: '08:30',
      sodium: 85,
      cholesterol: 4,
      saturatedFat: 0.7,
      transFat: 0
    },
    {
      id: '2',
      name: '현미밥과 불고기',
      calories: 650,
      protein: 35,
      carbs: 85,
      fat: 20,
      time: '12:30',
      sodium: 120,
      cholesterol: 8,
      saturatedFat: 1.2,
      transFat: 0
    }
  ],
  yesterday: [
    {
      id: '3',
      name: '연어스테이크',
      calories: 450,
      protein: 45,
      carbs: 5,
      fat: 25,
      time: '18:30',
      sodium: 95,
      cholesterol: 6,
      saturatedFat: 0.9,
      transFat: 0
    }
  ],
  lastWeek: [
    {
      id: '4',
      name: '오트밀',
      calories: 280,
      protein: 12,
      carbs: 48,
      fat: 6,
      time: '08:00',
      sodium: 45,
      cholesterol: 2,
      saturatedFat: 0.3,
      transFat: 0
    }
  ]
};

export const useMeals = () => {
  const [meals, setMeals] = useState<Record<string, Meal[]>>(MOCK_MEALS);

  const deleteMeal = (period: string, mealId: string) => {
    setMeals(prev => ({
      ...prev,
      [period]: prev[period].filter(meal => meal.id !== mealId)
    }));
  };

  const mealsByPeriod = useMemo(() => {
    return {
      today: meals.today.sort((a, b) => a.time.localeCompare(b.time)),
      yesterday: meals.yesterday.sort((a, b) => a.time.localeCompare(b.time)),
      lastWeek: meals.lastWeek.sort((a, b) => a.time.localeCompare(b.time))
    };
  }, [meals]);

  return {
    ...mealsByPeriod,
    deleteMeal
  };
};