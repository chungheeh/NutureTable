import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 구현에서는 인증 로직이 들어갑니다
    console.log('로그인:', { email, password });
    window.location.href = '/home';
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="mb-8 text-center">
        <img
          src="/favicon.ico"
          alt="키움밥상 로고"
          className="mx-auto w-48 h-auto mb-6"
        />
        <p className="text-lg text-neutral-600">로그인</p>
      </div>
      
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">이메일</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소를 입력하세요"
              required
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium">비밀번호</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          
          <div className="pt-2">
            <Button type="submit" className="w-full">
              로그인
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            계정이 없으신가요?{' '}
            <a href="/signup" className="font-medium text-primary-500 hover:underline">
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
