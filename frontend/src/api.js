const API_URL = import.meta.env.VITE_API_URL || '';

export async function request(path, options = {}) {
  const response = await fetch(`${API_URL}/api${path}`, { 
    credentials: 'include', 
    ...options 
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || (typeof data === 'string' ? data : 'Request failed'));
  return data;
}

export function post(path, values) {
  return request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
}

export function sendForm(path, values, method = 'POST') {
  return request(path, { method, body: values });
}

export const getUser = () => request('/users/user');
export const getCompany = () => request('/companies/company');
export const getEmployees = () => request('/users/company');

export function titleCase(st) {
    return st?.toLowerCase().split(" ").reduce((s, c) =>
        s + "" + (c.charAt(0).toUpperCase() + c.slice(1) + " "), '');
}