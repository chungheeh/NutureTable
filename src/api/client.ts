import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 설정
// 실제 프로젝트에서는 환경 변수를 사용하세요
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// API 요청 함수들
export const api = {
  // 인증 관련
  auth: {
    login: async (email: string, password: string) => {
      return supabase.auth.signInWithPassword({ email, password });
    },
    register: async (email: string, password: string) => {
      return supabase.auth.signUp({ email, password });
    },
    logout: async () => {
      return supabase.auth.signOut();
    },
    getUser: async () => {
      return supabase.auth.getUser();
    },
  },
  
  // 식사 관련
  meals: {
    getMeals: async () => {
      return supabase.from('meals').select('*');
    },
    addMeal: async (meal: any) => {
      return supabase.from('meals').insert(meal);
    },
    updateMeal: async (id: string, meal: any) => {
      return supabase.from('meals').update(meal).eq('id', id);
    },
    deleteMeal: async (id: string) => {
      return supabase.from('meals').delete().eq('id', id);
    },
  },
  
  // 영양 정보 관련
  nutrition: {
    getNutritionData: async (userId: string) => {
      return supabase.from('nutrition').select('*').eq('user_id', userId);
    },
  },
  
  // 상점 관련
  stores: {
    getStores: async () => {
      return supabase.from('stores').select('*');
    },
    getStoreById: async (id: string) => {
      return supabase.from('stores').select('*').eq('id', id).single();
    },
  },
};

