import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Archive, LayoutDashboard, Users, Settings, UserRound, LogOut, Menu, X } from 'lucide-react';
import { titleCase } from '../api';

export default function Layout({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
    ...(user.role === 'admin' ? [
      { to: '/employees', label: 'Employees', icon: Users },
      { to: '/settings', label: 'Company settings', icon: Settings },
    ] : []),
    { to: '/profile', label: 'My profile', icon: UserRound },
  ];

  return (
    <div className="min-h-screen lg:flex">
      {menuOpen && <button className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close menu" />}
      <aside className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-[#111f39] text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0`}>
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
          <span className="flex items-center gap-3 text-xl font-bold">
            <span className="rounded-lg bg-blue-500 p-2">
              <Archive size={20} />
            </span>
            ArchiveAmd
          </span>

          <button className="lg:hidden" onClick={() => setMenuOpen(false)}><X size={22} /></button>
        </div>

        <div className="px-5 pt-8 pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Workspace</div>
        <nav className="space-y-1 px-3">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-white/10'}`}>
              <Icon size={18} />{label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 px-5 py-5">
          <p className="truncate text-sm font-semibold">{titleCase(user.fullname)}</p>
          <p className="mt-1 text-xs capitalize text-slate-400">{user.role} account</p>
          <button onClick={onLogout} className="mt-5 flex items-center gap-2 text-sm text-slate-300 hover:text-white"><LogOut size={17} /> Log out</button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 lg:px-10">
          <button className="text-slate-700 lg:hidden" onClick={() => setMenuOpen(true)}><Menu size={24} /></button>
          <p className="hidden text-sm text-slate-500 lg:block">Your company workspace</p>
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-blue-100 font-bold text-blue-700">
              {user.fullname?.slice(0, 1)?.toUpperCase()}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">{titleCase(user.fullname)}</p>
              <p className="text-xs capitalize text-slate-500">{user.role}</p>
            </div>
          </div>
        </header>
        
        <main className="mx-auto max-w-6xl p-5 lg:p-10"><Outlet /></main>
      </div>
    </div>
  );
}
