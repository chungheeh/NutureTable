import React from 'react';
import { Button } from '../components/ui/Button';

export const StartPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-primary-500">키움밥상</h1>
        <p className="text-lg text-neutral-600">건강한 식습관을 위한 첫걸음</p>
      </div>
      
      <div className="mb-8 w-full max-w-sm">
        <img
          src="/images/start-illustration.png"
          alt="키움밥상 일러스트"
          className="mx-auto h-64 w-auto"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x300?text=키움밥상';
          }}
        />
      </div>
      
      <div className="w-full max-w-sm space-y-4">
        <Button className="w-full" onClick={() => window.location.href = '/login'}>
          로그인
        </Button>
        <Button className="w-full" variant="outline" onClick={() => window.location.href = '/signup'}>
          회원가입
        </Button>
        <Button className="w-full" variant="ghost" onClick={() => window.location.href = '/home'}>
          둘러보기
        </Button>
      </div>
    </div>
  );
};
