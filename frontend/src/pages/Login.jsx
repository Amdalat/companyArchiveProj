import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Archive } from 'lucide-react';
import { getUser, post } from '../api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true); setError('');
    try {
      await post('/auth/signin', { email, password });
      const user = await getUser();
      onLogin(user);
    } catch (err) { 
      setError(err.message); 
    }
    finally { 
      setBusy(false); 
    }
  }

  return <div className="grid min-h-screen place-items-center bg-[#f5f7fc] p-5"><div className="w-full max-w-md"><div className="mb-9 flex items-center justify-center gap-3 text-2xl font-bold"><span className="rounded-xl bg-blue-600 p-3 text-white"><Archive /></span>ArchivePro</div><form onSubmit={handleSubmit} className="card space-y-5 shadow-sm"><div><h1 className="text-2xl font-bold">Welcome back</h1><p className="mt-1 text-sm text-slate-500">Sign in to your company workspace.</p></div>{error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<div><label className="label">Email address</label><input className="field" type="email" required value={email} onChange={e => setEmail(e.target.value)} /></div><div><label className="label">Password</label><input className="field" type="password" required value={password} onChange={e => setPassword(e.target.value)} /></div><button className="btn w-full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button><p className="text-center text-sm text-slate-500">New company? <Link className="font-semibold text-blue-600" to="/register">Create an account</Link></p></form></div></div>;
}
