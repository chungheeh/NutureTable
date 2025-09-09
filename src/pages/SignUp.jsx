import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    // 실제 구현에서는 회원가입 API 호출 등의 로직이 들어갑니다
    console.log('회원가입:', { name, email, password });
    window.location.href = '/login';
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-primary-500">키움밥상</h1>
        <p className="text-lg text-neutral-600">회원가입</p>
      </div>
      
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">이름</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              required
            />
          </div>
          
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
          
          <div>
            <label className="mb-1 block text-sm font-medium">비밀번호 확인</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              error={!!error}
              helperText={error}
              required
            />
          </div>
          
          <div className="pt-2">
            <Button type="submit" className="w-full">
              회원가입
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            이미 계정이 있으신가요?{' '}
            <a href="/login" className="font-medium text-primary-500 hover:underline">
              로그인
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
