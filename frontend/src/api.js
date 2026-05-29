const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function getToken() {
  return localStorage.getItem('code_arr_token');
}

export function setToken(token) {
  localStorage.setItem('code_arr_token', token);
}

export function clearToken() {
  localStorage.removeItem('code_arr_token');
}

export async function api(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = getToken();

  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || 'Request failed');
  }

  return payload;
}

export { API_BASE_URL };
