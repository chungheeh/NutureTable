import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AddMealModal } from './features/meals/components/AddMealModal';

// 페이지 컴포넌트 import
import { StartPage } from './pages/Start';
import { DashboardPage } from './pages/Dashboard';
import { LoginPage } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { StatisticsPage } from './pages/Statistics';

// 페이지 컴포넌트 import
import { MyPage } from './pages/MyPage';
import { SettingsPage } from './pages/Settings';

// 아직 구현되지 않은 페이지 컴포넌트
const MealsPage = () => <div className="p-8 text-center">식사 기록</div>;
const StoresPage = () => <div className="p-8 text-center">상점</div>;

// 레이아웃 컴포넌트
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);

  return (
  <div className="min-h-screen flex flex-col bg-white">
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-50">
      <div className="px-4 py-3 flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center">
          <span className="text-lg font-bold text-neutral-900">키움밥상</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-neutral-600 active:text-primary-500 relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
          </button>
          <a href="/settings" className="p-2 text-neutral-600 active:text-primary-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="h-[env(safe-area-inset-top)] bg-white" />
    </header>
    <main className="flex-grow pt-[calc(3.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))]">
      {children}
    </main>
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50">
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto">
        <a href="/home" className="flex flex-col items-center justify-center gap-1 text-neutral-600 active:text-primary-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs font-medium">홈</span>
        </a>
        <a href="/stats" className="flex flex-col items-center justify-center gap-1 text-neutral-600 active:text-primary-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs font-medium">통계</span>
        </a>
        <button 
          onClick={() => setIsMealModalOpen(true)}
          className="flex flex-col items-center justify-center"
        >
          <div className="w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center -mt-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </button>
        <a href="/meals" className="flex flex-col items-center justify-center gap-1 text-neutral-600 active:text-primary-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="text-xs font-medium">식사</span>
        </a>
        <a href="/mypage" className="flex flex-col items-center justify-center gap-1 text-neutral-600 active:text-primary-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs font-medium">내정보</span>
        </a>
      </div>
      <div className="h-[env(safe-area-inset-bottom)] bg-white" />
    </nav>
    <AddMealModal 
      isOpen={isMealModalOpen}
      onClose={() => setIsMealModalOpen(false)}
    />
  </div>
  );
};

// QueryClient 생성
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/home" element={<Layout><DashboardPage /></Layout>} />
          <Route path="/meals" element={<Layout><MealsPage /></Layout>} />
          <Route path="/stats" element={<Layout><StatisticsPage /></Layout>} />
          <Route path="/stores" element={<Layout><StoresPage /></Layout>} />
          <Route path="/mypage" element={<Layout><MyPage /></Layout>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
