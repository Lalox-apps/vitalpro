import { useLoaderStore } from '@/stores/loaderStorage';

export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};

const BASE_URL = 'http://192.168.1.82:3000'; 
let authToken: string | null = null;

function setToken(token: string | null) {
  authToken = token;
}

function buildUrl(endpoint: string) {
  if (endpoint.startsWith('/')) return BASE_URL + endpoint;
  return `${BASE_URL}/${endpoint}`;
}

async function request<T>(
  endpoint: string,
  method: FetchMethod,
  data?: any,
  showLoader: boolean = true 
): Promise<ApiResponse<T>> {
  const url = buildUrl(endpoint);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const loader = useLoaderStore.getState();
  console.log('➡️ API REQUEST:', method, url, data ?? '');
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  
  try {
    if (showLoader) loader.show();
    const res = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    const text = await res.text(); 
    const json = text ? JSON.parse(text) : null;

    if (!res.ok) {
      return {
        success: false,
        message: json?.message || `HTTP ${res.status}`,
      };
    }

    return json
  } catch (error: any) {
    console.error('❌ API ERROR:', error);
    return {
      success: false,
      message: 'No se pudo conectar con el servidor',
    };
  }finally{
    if (showLoader) loader.hide();
  }
}



export const api = {
  setToken,
  post<T>(endpoint: string, data?: any, showLoader= true) {
    return request<T>(endpoint, 'POST', data, showLoader);
  },

  get<T>(endpoint: string, showLoader = true) {
    return request<T>(endpoint, 'GET', undefined, showLoader);
  },
};
