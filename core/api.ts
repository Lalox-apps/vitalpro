
export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};

const BASE_URL = 'http://192.168.1.18:3000'; 

function buildUrl(endpoint: string) {
  if (endpoint.startsWith('/')) return BASE_URL + endpoint;
  return `${BASE_URL}/${endpoint}`;
}

async function request<T>(
  endpoint: string,
  method: FetchMethod,
  data?: any
): Promise<ApiResponse<T>> {
  const url = buildUrl(endpoint);

  console.log('➡️ API REQUEST:', method, url, data ?? '');

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
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

    return {
      success: true,
      data: json,
    };
  } catch (error: any) {
    console.error('❌ API ERROR:', error);
    return {
      success: false,
      message: 'No se pudo conectar con el servidor',
    };
  }
}

export const api = {
  post<T>(endpoint: string, data?: any) {
    return request<T>(endpoint, 'POST', data);
  },

  get<T>(endpoint: string) {
    return request<T>(endpoint, 'GET');
  },
};
