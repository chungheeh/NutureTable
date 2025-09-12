import React, { useState } from 'react';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'meal-reminder',
      label: '식사 시간 알림',
      description: '설정한 식사 시간에 알림을 받습니다',
      enabled: true
    },
    {
      id: 'nutrition-alert',
      label: '영양 섭취 알림',
      description: '일일 영양 섭취 목표 달성 시 알림을 받습니다',
      enabled: true
    },
    {
      id: 'weekly-report',
      label: '주간 리포트',
      description: '매주 식사 기록과 영양 섭취 현황을 받아보세요',
      enabled: true
    },
    {
      id: 'marketing',
      label: '마케팅 알림',
      description: '새로운 기능과 이벤트 소식을 받아보세요',
      enabled: false
    }
  ]);

  const handleToggle = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
    // TODO: API 연동하여 설정 저장
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-6">알림 설정</h2>
      
      <div className="space-y-6">
        {settings.map(setting => (
          <div key={setting.id} className="flex items-start">
            <div className="flex-grow">
              <p className="font-medium">{setting.label}</p>
              <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
            </div>
            <button
              onClick={() => handleToggle(setting.id)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                setting.enabled ? 'bg-primary-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  setting.enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
