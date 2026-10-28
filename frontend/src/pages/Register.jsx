import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post, sendForm } from '../api';

export default function Register() {
  const [values, setValues] = useState({ companyname: '', companyemail: '', fullname: '', useremail: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();
  function change(event) { setValues({ ...values, [event.target.name]: event.target.value }); }
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      // const form = new FormData();
      // Object.entries(values).forEach(([key, value]) => form.append(key, value));
      // await sendForm('/auth/create', form);

      await post('/auth/create', values);
      setMessage('Company created. You can now sign in.');

      setTimeout(() => {
        navigate("/login" )
      }, 2000);
      
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  const fields = [['companyname','Company name'],['companyemail','Company email'],['fullname','Your full name'],['useremail','Your email'],['password','Password']];
  return <div className="grid min-h-screen place-items-center p-5"><form onSubmit={submit} className="card w-full max-w-lg space-y-4 shadow-sm"><h1 className="text-2xl font-bold">Create your company</h1><p className="text-sm text-slate-500">Set up your administrator account.</p>{error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
  {message && <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">{message} 
    <Link to="/login" className="underline">Sign in</Link></p>}{fields.map(([name,label]) => <div key={name}><label className="label">{label}</label><input className="field" name={name} type={name.includes('email') ? 'email' : name === 'password' ? 'password' : 'text'} value={values[name]} onChange={change} required /></div>)}<button className="btn w-full" disabled={busy}>{busy ? 'Creating…' : 'Create company'}</button><p className="text-center text-sm">Already registered? <Link className="text-blue-600" to="/login">Sign in</Link></p></form></div>;
}
