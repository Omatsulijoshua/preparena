import { useSession } from 'next-auth/react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'API request failed');
  return data.data as T;
}

export function useApi() {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  const authHeaders = (): HeadersInit => {
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  };

  return {
    // Users
    getUsers: (params?: string) =>
      fetchApi<any>(`/users?${params || ''}`, { headers: authHeaders() }),
    getUser: (id: string) =>
      fetchApi<any>(`/users/${id}`, { headers: authHeaders() }),

    // Questions
    getQuestions: (params?: string) =>
      fetchApi<any>(`/questions?${params || ''}`, { headers: authHeaders() }),
    getQuestion: (id: string) =>
      fetchApi<any>(`/questions/${id}`, { headers: authHeaders() }),
    createQuestion: (data: any) =>
      fetchApi<any>('/questions', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
      }),
    publishQuestion: (id: string) =>
      fetchApi<any>(`/questions/${id}/publish`, {
        method: 'POST',
        headers: authHeaders(),
      }),

    // Schools
    getSchools: (params?: string) =>
      fetchApi<any>(`/schools?${params || ''}`, { headers: authHeaders() }),
    createSchool: (data: any) =>
      fetchApi<any>('/schools', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
      }),

    // Payments
    getPayments: (params?: string) =>
      fetchApi<any>(`/payments?${params || ''}`, { headers: authHeaders() }),

    // Examinations
    getExaminations: (params?: string) =>
      fetchApi<any>(`/examinations?${params || ''}`, { headers: authHeaders() }),

    // Coupons
    getCoupons: (params?: string) =>
      fetchApi<any>(`/coupons?${params || ''}`, { headers: authHeaders() }),
    createCoupon: (data: any) =>
      fetchApi<any>('/coupons', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
      }),

    // AI
    getAIRequests: (params?: string) =>
      fetchApi<any>(`/ai/requests?${params || ''}`, { headers: authHeaders() }),

    // Dashboard
    getDashboardStats: () =>
      fetchApi<any>('/analytics/dashboard', { headers: authHeaders() }),

    // Subjects
    getSubjects: () =>
      fetchApi<any>('/subjects', { headers: authHeaders() }),
  };
}
