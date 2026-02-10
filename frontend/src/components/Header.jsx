import { Link, NavLink } from 'react-router-dom'

import { useAuth } from '../context/useAuth.js'

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-20 border-b border-sky-100/70 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <span className="rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-md shadow-sky-400/30 transition group-hover:scale-105">
            PrimeTrade
          </span>
          <span className="text-sm font-semibold text-slate-800">Intern Dashboard</span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4 text-sm">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? 'pill-nav-active' : 'pill-nav-idle')}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/tasks"
                className={({ isActive }) => (isActive ? 'pill-nav-active' : 'pill-nav-idle')}
              >
                Tasks
              </NavLink>
              <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
                <span className="h-6 w-px bg-slate-300" />
                <span className="max-w-[10rem] truncate">{user?.name}</span>
              </div>
              <button type="button" onClick={logout} className="btn-secondary !px-3 !py-1.5 !text-xs">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'pill-nav-active' : 'pill-nav-idle')}
              >
                Login
              </NavLink>
              <NavLink to="/register" className="btn-primary !px-3 !py-1.5 !text-xs">
                Sign up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
