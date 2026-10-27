import { useState } from 'react';
import { sendForm } from '../api';
import PageTitle from '../components/PageTitle';

export default function Profile({ user, onUpdated }) {
  const [fullname, setFullname] = useState(user.fullname || '');
  const [age, setAge] = useState(user.age || '');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  async function save(event) {
    event.preventDefault(); 
    setSaving(true); 
    setError(''); 
    setMessage('');

    try {
      const body = new FormData(); 
      body.append('fullname', fullname); 
      body.append('age', age);

      await sendForm('/users/user', body, 'PUT');

      onUpdated({ ...user, fullname, age }); setMessage('Profile updated successfully.');
    } catch (err) { 
      setError(err.message); 
    }
    finally { 
      setSaving(false); 
    }
  }
  return( 
    <>
      <PageTitle title="My profile" description="Manage your personal information."/>
      
      <form className="card max-w-2xl space-y-5" onSubmit={save}>
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {message && <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">{message}</p>}
        
        <div>
          <label className="label">Full name</label>
          <input className="field" required value={fullname} onChange={e => setFullname(e.target.value)}/>
        </div>
        
        <div>
          <label className="label">Age</label>
          <input className="field" value={age} onChange={e => setAge(e.target.value)}/>
        </div>
        
        <div>
          <label className="label">Role</label>
          <input className="field bg-slate-50 capitalize" value={user.role} readOnly />
        </div>
        
        <button className="btn" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
      </form>
    </>
  );
}
