import { useEffect, useState } from 'react';
import { getCompany, sendForm } from '../api';
import PageTitle from '../components/PageTitle';

export default function Settings() {
  const [company, setCompany] = useState(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { getCompany().then(data => { setCompany(data); setName(data.companyname || ''); }).catch(err => setError(err.message)); }, []);
  async function save(event) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      if (name === company.companyname) { setMessage('No changes to save.'); return; }
      const body = new FormData(); body.append('companyname', name);
      await sendForm('/companies/company', body, 'PUT');
      setCompany({ ...company, companyname: name }); setMessage('Company updated.');
    } catch(err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <><PageTitle title="Company settings" description="Manage your company's details."/><form onSubmit={save} className="card max-w-2xl space-y-5">{error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}{message && <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">{message}</p>}<div><label className="label">Company name</label><input className="field" value={name} required onChange={e => setName(e.target.value)}/></div><div><label className="label">Company email</label><input className="field bg-slate-50" readOnly value={company?.email || ''}/><p className="mt-2 text-xs text-slate-500">Your backend doesn't allow changes to company email.</p></div><button className="btn" disabled={!company || busy}>{busy ? 'Saving…' : 'Save changes'}</button></form></>;
}
