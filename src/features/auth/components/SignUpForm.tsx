import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/ui/Card';
import { useAuthStore } from '../../../lib/store';

// 유효성 검사 스키마
const signUpSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요.'),
  password: z.string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 
      '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.'),
  passwordConfirm: z.string(),
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다.'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordConfirm"],
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const signUp = useAuthStore((state) => state.signUp);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      await signUp(data.email, data.password, data.name);
      navigate('/login');
    } catch (err) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              이메일
            </label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              이름
            </label>
            <Input
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name')}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              비밀번호
            </label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password')}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="passwordConfirm" className="block text-sm font-medium">
              비밀번호 확인
            </label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm?.message}
              {...register('passwordConfirm')}
            />
          </div>

          {error && (
            <div className="text-accent-500 text-sm">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            회원가입
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <p className="text-sm text-neutral-500">
          이미 계정이 있으신가요?{' '}
          <a
            href="/login"
            className="text-primary-500 hover:underline"
          >
            로그인
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};
