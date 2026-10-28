import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getUser, request } from './api';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then(setUser).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);

  async function logout() {
    try { await request('/auth/logout', { method: 'POST' }); }
    finally { setUser(null); }
  }

  if (loading) return <div className="grid min-h-screen place-items-center text-slate-500">Loading ArchiveAmd…</div>;

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={setUser} />} />

      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      
      <Route element={user ? <Layout user={user} onLogout={logout} /> : <Navigate to="/login" />}>
        <Route index element={<Dashboard user={user} />} />
        <Route path="employees" element={user?.role === 'admin' ? <Employees /> : <Navigate to="/" />} />
        <Route path="settings" element={user?.role === 'admin' ? <Settings /> : <Navigate to="/" />} />
        <Route path="profile" element={<Profile user={user} onUpdated={setUser} />} />
      </Route>
      
      <Route path="*" element={<Navigate to={user ? '/' : '/login'} />} />
    </Routes>
  );
}
