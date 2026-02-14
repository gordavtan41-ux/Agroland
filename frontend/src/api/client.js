const API_URL = 'http://localhost:4000/api';

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || 'Ошибка запроса');
  }

  return response.json();
}
