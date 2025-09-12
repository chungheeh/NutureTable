<<<<<<< HEAD:src/lib/store.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email, password) => {
    // 실제 구현에서는 API 호출을 통해 로그인 처리
    const mockUser = { id: '1', name: '사용자', email };
    set({ user: mockUser, isAuthenticated: true });
  },
  signUp: async (email, password, name) => {
    // 실제 구현에서는 API 호출을 통해 회원가입 처리
    // 회원가입 성공 후 자동 로그인은 하지 않고 로그인 페이지로 리다이렉트
    await new Promise(resolve => setTimeout(resolve, 1000)); // 가상의 API 딜레이
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },
}));

export const useMealsStore = create((set) => ({
  meals: [],
  addMeal: (meal) => {
    const newMeal = { ...meal, id: Math.random().toString(36).substr(2, 9) };
    set((state) => ({ meals: [...state.meals, newMeal] }));
  },
  removeMeal: (id) => {
    set((state) => ({ meals: state.meals.filter((meal) => meal.id !== id) }));
  },
}));
=======
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email, password) => {
    // 실제 구현에서는 API 호출을 통해 로그인 처리
    const mockUser = { id: '1', name: '사용자', email };
    set({ user: mockUser, isAuthenticated: true });
  },
  signUp: async (email, password, name) => {
    // 실제 구현에서는 API 호출을 통해 회원가입 처리
    // 회원가입 성공 후 자동 로그인은 하지 않고 로그인 페이지로 리다이렉트
    await new Promise(resolve => setTimeout(resolve, 1000)); // 가상의 API 딜레이
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },
}));

interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
}

interface MealsState {
  meals: MealItem[];
  addMeal: (meal: Omit<MealItem, 'id'>) => void;
  removeMeal: (id: string) => void;
}

export const useMealsStore = create<MealsState>((set) => ({
  meals: [],
  addMeal: (meal) => {
    const newMeal = { ...meal, id: Math.random().toString(36).substr(2, 9) };
    set((state) => ({ meals: [...state.meals, newMeal] }));
  },
  removeMeal: (id) => {
    set((state) => ({ meals: state.meals.filter((meal) => meal.id !== id) }));
  },
}));

>>>>>>> 2ffbfae (Initial commit: NutureTable project setup):src/lib/store.ts
