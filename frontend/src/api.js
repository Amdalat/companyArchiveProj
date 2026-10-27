// API calls live here so page components stay small and readable.
// Vite forwards /api requests to your Express server (see vite.config.js).
export async function request(path, options = {}) {
  const response = await fetch(`/api${path}`, { credentials: 'include', ...options });
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