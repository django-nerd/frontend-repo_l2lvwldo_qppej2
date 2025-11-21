import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, LogIn, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Navbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => (r.ok ? r.json() : null))
      .then(u => setUser(u))
      .catch(() => {})
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  const navLink = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition hover:bg-white/5 ${isActive ? 'text-white' : 'text-white/70'}`

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-[#0b0d12]/60 border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-white">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-indigo-500 text-sm font-bold">CT</span>
          <span className="text-sm font-semibold tracking-wide opacity-90">Community Travel</span>
        </Link>

        <nav className="hidden gap-1 md:flex">
          <NavLink to="/explore" className={navLink}>Explore</NavLink>
          <NavLink to="/guides" className={navLink}>Guides</NavLink>
          <NavLink to="/feed" className={navLink}>Feed</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {!user ? (
            <Link to="/login" className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20">
              <LogIn size={16} /> Login
            </Link>
          ) : (
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20">
              <LogOut size={16} /> Logout
            </button>
          )}
          <button className="md:hidden text-white/80" onClick={() => setOpen(o => !o)}>
            <Menu />
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-auto max-w-6xl px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-2">
            <NavLink to="/explore" className={navLink} onClick={() => setOpen(false)}>Explore</NavLink>
            <NavLink to="/guides" className={navLink} onClick={() => setOpen(false)}>Guides</NavLink>
            <NavLink to="/feed" className={navLink} onClick={() => setOpen(false)}>Feed</NavLink>
          </div>
        </div>
      )}
    </header>
  )
}
