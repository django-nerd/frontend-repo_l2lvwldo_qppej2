import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Guides() {
  const [guides, setGuides] = useState([])
  const [location, setLocation] = useState('')
  const [expertise, setExpertise] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (expertise) params.set('expertise', expertise)
    const res = await fetch(`${API_BASE}/api/guides?${params.toString()}`)
    const data = await res.json()
    setGuides(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  return (
    <div className="min-h-screen bg-[#0b0d12] text-white">
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
        <h1 className="text-2xl font-semibold">Local Guides</h1>
        <div className="grid gap-3 md:grid-cols-3">
          <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" className="rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/50"/>
          <input value={expertise} onChange={e=>setExpertise(e.target.value)} placeholder="Expertise (e.g. hiking)" className="rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/50"/>
          <button onClick={load} className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium">Search</button>
        </div>
        {loading ? <p className="text-white/70">Loading...</p> : (
          <div className="grid gap-4 md:grid-cols-3">
            {guides.map(g => (
              <div key={g.id} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{g.name}</h3>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-xs">{(g.rating ?? 0).toFixed(1)}</span>
                </div>
                <p className="text-sm text-white/70">{g.location}</p>
                <p className="mt-2 text-sm">{Array.isArray(g.expertise) ? g.expertise.join(', ') : ''}</p>
                {g.price_per_day && <p className="mt-2 text-sm text-white/80">${g.price_per_day}/day</p>}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
