import { useEffect, useState } from 'react';
import { UserPlus, Search } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import { getEmployees, sendForm, titleCase } from '../api';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ fullname: '', age: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  async function load() { try { const result = await getEmployees(); setEmployees(result.users || []); } catch(err) { setError(err.message); } }
  useEffect(() => { load(); }, []);
  async function addEmployee(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      await sendForm('/auth/signup', data);
      setSuccess('Employee added successfully.'); 
      setShowForm(false);
      setForm({ 
        fullname: '', 
        age: '', 
        email: '', 
        password: '' 
      });
      await load();
    } catch(err) { 
      setError(err.message); 
    } finally { 
      setSaving(false); 
    }
  }
  const filtered = employees.filter(person => person.fullname?.toLowerCase().includes(query.toLowerCase()));

  return (  
  <>
    <PageTitle title="Employees" description="View and add members of your company." action={<button className="btn flex items-center gap-2" onClick={() => setShowForm(!showForm)}>
      <UserPlus size={18}/> Add employee</button>}/>

      {error && <p className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {success && <p className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">{success}</p>}
      {showForm && <form onSubmit={addEmployee} className="card mb-6">
        <h2 className="mb-5 text-lg font-semibold">New employee</h2>
        <div className="grid gap-4 md:grid-cols-2">{[['fullname','Full name'],['email','Email'],['age','Age (optional)'],['password','Temporary password']].map(([name,label]) => <div key={name}>
            <label className="label">{label}</label>
            
            <input className="field" type={name === 'password' ? 'password' : name === 'email' ? 'email' : 'text'} value={form[name]} required={name !== 'age'} onChange={e => setForm({ ...form, [name]: e.target.value })}/>
          </div>)}
        </div>
        <div className="mt-5 flex gap-3">
          <button className="btn" disabled={saving}>{saving ? 'Adding…' : 'Save employee'}</button>
          <button type="button" className="btn-light" onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      </form>}

      <div className="card !p-0 overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-5">
          <p className="font-semibold">Team members ({employees.length})</p>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3">
            <Search size={17} className="text-slate-400"/>
            <input className="w-40 py-2 text-sm outline-none sm:w-56" placeholder="Search employees" value={query} onChange={e => setQuery(e.target.value)}/>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(person => <tr key={person._id} className="border-t border-slate-100">
                <td className="px-6 py-4 font-semibold">{titleCase(person.fullname)}</td>
                <td className="px-6 py-4 capitalize"><span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{titleCase(person.role)}</span></td>
                <td className="px-6 py-4">{person.age || '—'}</td>
                <td className="px-6 py-4 text-slate-500">{person.createdAt ? new Date(person.createdAt).toLocaleDateString() : '—'}</td>
              </tr>)}
            </tbody>
          </table>
              
          {filtered.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No employees found.</p>}
        </div>
      </div></>);
}
