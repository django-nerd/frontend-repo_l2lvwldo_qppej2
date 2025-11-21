import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function TripForm({ onCreated }) {
  const [form, setForm] = useState({
    title: '',
    destination: '',
    start_date: '',
    end_date: '',
    budget_estimate: '',
    capacity: '',
    itinerary: '',
    tags: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = {
        title: form.title,
        destination: form.destination,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
        budget_estimate: form.budget_estimate ? Number(form.budget_estimate) : null,
        capacity: form.capacity ? Number(form.capacity) : null,
        needed_members: null,
        itinerary: form.itinerary || null,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : []
      }
      const res = await fetch(`${API_BASE}/api/trips`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create trip')
      const data = await res.json()
      onCreated?.(data.id)
      setForm({ title: '', destination: '', start_date: '', end_date: '', budget_estimate: '', capacity: '', itinerary: '', tags: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="create" className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="text-xl font-semibold">Post a group trip</h2>
      <p className="mt-1 text-sm text-white/70">Share your plan and invite others to join.</p>
      {error && <p className="mt-3 rounded bg-red-500/10 p-2 text-sm text-red-200">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input name="title" value={form.title} onChange={handleChange} required placeholder="Trip title" className="rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder:text-white/50" />
        <input name="destination" value={form.destination} onChange={handleChange} required placeholder="Destination" className="rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder:text-white/50" />
        <label className="text-xs text-white/70">Start date
          <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none" />
        </label>
        <label className="text-xs text-white/70">End date
          <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none" />
        </label>
        <input name="budget_estimate" value={form.budget_estimate} onChange={handleChange} placeholder="Budget per person (USD)" className="rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder:text-white/50" />
        <input name="capacity" value={form.capacity} onChange={handleChange} placeholder="Group size" className="rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder:text-white/50" />
        <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (hiking, eco, island)" className="sm:col-span-2 rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder:text-white/50" />
        <textarea name="itinerary" value={form.itinerary} onChange={handleChange} placeholder="Itinerary notes" rows={4} className="sm:col-span-2 rounded-lg border border-white/10 bg-white/10 p-2 text-sm outline-none placeholder:text-white/50" />
        <button disabled={loading} className="sm:col-span-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#0b0d12] hover:bg-white/90 disabled:opacity-60">
          {loading ? 'Posting...' : 'Post trip'}
        </button>
      </form>
    </section>
  )
}

export default TripForm
