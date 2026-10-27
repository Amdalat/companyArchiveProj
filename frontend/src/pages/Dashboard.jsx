import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, ShieldCheck, ArrowRight, Archive } from 'lucide-react';
import { getCompany, getEmployees, titleCase } from '../api';
import PageTitle from '../components/PageTitle';

export default function Dashboard({ user }) {
  const [company, setCompany] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getCompany().then(setCompany).catch(err => setError(err.message));
    if (user.role === 'admin') getEmployees().then(data => setEmployees(data.users || [])).catch(err => setError(err.message));
  }, [user.role]);

  return (
    <>
      <PageTitle title={`Good to see you, ${titleCase(user.fullname?.split(' ')[0])}!`} description="Here's an overview of your company workspace." />

      {error && <p className="mb-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">{error}</p>}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="card">
          <Building2 className="mb-5 text-blue-600" />
          <p className="text-sm text-slate-500">Company</p>
          <h2 className="mt-2 text-xl font-bold">{titleCase(company?.companyname) || '—'}</h2>
        </div>

        <div className="card">
          <Users className="mb-5 text-blue-600" />
          <p className="text-sm text-slate-500">Team members</p>
          <h2 className="mt-2 text-3xl font-bold">{user.role === 'admin' ? employees.length : '—'}</h2>
        </div>

        <div className="card"><ShieldCheck className="mb-5 text-blue-600" />
          <p className="text-sm text-slate-500">Your role</p>
          <h2 className="mt-2 text-xl font-bold capitalize">{user.role}</h2>
        </div>

        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="card">
            <h2 className="mb-5 text-lg font-bold">Company information</h2>
            <div className="space-y-4 text-sm">
              <p><span className="text-slate-500">Name</span><br/><strong>{company?.companyname || '—'}</strong></p>
              <p><span className="text-slate-500">Email</span><br/><strong>{company?.email || '—'}</strong></p>
            </div>
          </section>

          <section className="card">
            <h2 className="mb-4 text-lg font-bold">Quick links</h2>
            <div className="space-y-3">
              {(user.role === 'admin' ? [['Manage employees','/employees'],['Company settings','/settings'],['My profile','/profile']] : [['My profile','/profile']]).map(([name,url]) => <Link to={url} key={url} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium hover:bg-slate-50">{name}<ArrowRight size={16}/></Link>)}
            </div>
          </section>
        </div>
        
        {/* <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900"><Archive size={20} className="shrink-0"/>
          <p>Document storage isn't connected yet because the current backend does not have document endpoints. This dashboard only shows real account and company information.</p>
        </div> */}
    </>);
}
