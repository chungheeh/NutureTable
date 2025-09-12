import React, { useState } from 'react';
import { MealPeriodCard } from '../features/meals/components/MealPeriodCard';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { useMeals } from '../features/meals/hooks/useMeals';
import { Meal } from '../features/meals/components/MealCard';
import { AddMealModal } from '../features/meals/components/AddMealModal';

type Period = 'today' | 'yesterday' | 'lastWeek';

type DeleteInfo = {
  period: Period;
  meal: Meal;
} | null;

type EditInfo = {
  period: Period;
  meal: Meal;
} | null;

const Meals: React.FC = () => {
  const { today, yesterday, lastWeek, deleteMeal } = useMeals();
  const [expandedSections, setExpandedSections] = useState<Period[]>([]);
  const [deleteInfo, setDeleteInfo] = useState<DeleteInfo>(null);
  const [editInfo, setEditInfo] = useState<EditInfo>(null);

  const handleSectionToggle = (period: Period) => {
    setExpandedSections(current => {
      const isCurrentlyExpanded = current.includes(period);
      
      if (isCurrentlyExpanded) {
        return current.filter(p => p !== period);
      } else {
        if (current.length >= 2) {
          return [period];
        } else {
          return [...current, period];
        }
      }
    });
  };

  const handleDeleteClick = (period: Period, meal: Meal) => {
    setDeleteInfo({ period, meal });
  };

  const handleEditClick = (period: Period, meal: Meal) => {
    setEditInfo({ period, meal });
  };

  const handleConfirmDelete = () => {
    if (deleteInfo) {
      deleteMeal(deleteInfo.period, deleteInfo.meal.id);
      setDeleteInfo(null);
    }
  };

  const getPeriodLabel = (period: Period) => {
    switch (period) {
      case 'today':
        return '오늘';
      case 'yesterday':
        return '어제';
      case 'lastWeek':
        return '지난주';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">식사 기록</h1>
      
      <div className="space-y-4">
        <MealPeriodCard 
          title="오늘의 식사" 
          meals={today}
          accentColor="border-primary-500"
          onDeleteMeal={(meal) => handleDeleteClick('today', meal)}
          onEditMeal={(meal) => handleEditClick('today', meal)}
          isExpanded={expandedSections.includes('today')}
          onToggle={() => handleSectionToggle('today')}
        />
        
        <MealPeriodCard 
          title="어제의 식사" 
          meals={yesterday}
          accentColor="border-indigo-500"
          onDeleteMeal={(meal) => handleDeleteClick('yesterday', meal)}
          onEditMeal={(meal) => handleEditClick('yesterday', meal)}
          isExpanded={expandedSections.includes('yesterday')}
          onToggle={() => handleSectionToggle('yesterday')}
        />
        
        <MealPeriodCard 
          title="지난주 식사" 
          meals={lastWeek}
          accentColor="border-violet-500"
          onDeleteMeal={(meal) => handleDeleteClick('lastWeek', meal)}
          onEditMeal={(meal) => handleEditClick('lastWeek', meal)}
          isExpanded={expandedSections.includes('lastWeek')}
          onToggle={() => handleSectionToggle('lastWeek')}
        />
      </div>

      <ConfirmModal
        isOpen={deleteInfo !== null}
        onClose={() => setDeleteInfo(null)}
        onConfirm={handleConfirmDelete}
        title="식사 기록 삭제"
        message={
          deleteInfo
            ? `${getPeriodLabel(deleteInfo.period)}의 "${deleteInfo.meal.name}" 기록을 삭제하시겠습니까?`
            : ''
        }
      />

      <AddMealModal
        isOpen={editInfo !== null}
        onClose={() => setEditInfo(null)}
        initialData={editInfo?.meal}
        isEditing={true}
      />
    </div>
  );
};

export default Meals;