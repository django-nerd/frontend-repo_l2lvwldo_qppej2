import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function TripCard({ trip }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{trip.title}</h3>
        {trip.budget_estimate != null && (
          <span className="rounded bg-white/10 px-2 py-1 text-xs">${trip.budget_estimate}</span>
        )}
      </div>
      <p className="mt-1 text-sm text-white/80">{trip.destination}</p>
      {trip.tags?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {trip.tags.map((t) => (
            <span key={t} className="rounded-full bg-white/10 px-2 py-0.5 text-xs">#{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

function TripList() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/trips`)
      const data = await res.json()
      setTrips(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <section id="discover" className="mx-auto mt-8 max-w-6xl px-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Open group trips</h2>
        <button onClick={load} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/20 hover:bg-white/15">Refresh</button>
      </div>
      {loading ? (
        <p className="text-white/70">Loading trips...</p>
      ) : trips.length === 0 ? (
        <p className="text-white/70">No trips yet. Be the first to create one!</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {trips.map((t) => (<TripCard key={t.id} trip={t} />))}
        </div>
      )}
    </section>
  )
}

export default TripList
