import React from 'react';
import { SignUpForm } from '../features/auth/components/SignUpForm';

export const SignUp: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Nurture</h1>
          <p className="mt-2 text-sm text-gray-600">
            건강한 식습관과 영양 관리를 위한 서비스
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};
