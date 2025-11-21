import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    setError('')
    try {
      const path = mode === 'login' ? '/auth/login' : '/auth/register'
      const body = mode === 'login' ? { email, password } : { name, email, password }
      const res = await fetch(`${API_BASE}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error((await res.json()).detail || 'Request failed')
      const data = await res.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/explore')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0d12] text-white">
      <Navbar />
      <main className="mx-auto max-w-md space-y-6 px-6 py-12">
        <h1 className="text-2xl font-semibold">{mode === 'login' ? 'Login' : 'Create an account'}</h1>
        <form onSubmit={submit} className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-5">
          {mode === 'register' && (
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/50"/>
          )}
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/50"/>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/50"/>
          {error && <div className="rounded-md bg-red-500/20 px-3 py-2 text-sm text-red-200">{error}</div>}
          <button className="w-full rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium">{mode === 'login' ? 'Login' : 'Create account'}</button>
          <div className="text-center text-xs text-white/60">
            {mode === 'login' ? (
              <button type="button" onClick={()=>setMode('register')} className="underline">Create an account</button>
            ) : (
              <button type="button" onClick={()=>setMode('login')} className="underline">Already have an account? Login</button>
            )}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}
