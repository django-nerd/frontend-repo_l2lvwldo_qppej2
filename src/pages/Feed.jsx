import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')

  const load = async () => {
    const params = new URLSearchParams()
    if (tag) params.set('tag', tag)
    const res = await fetch(`${API_BASE}/api/feed?${params.toString()}`)
    const data = await res.json()
    setPosts(data)
  }

  const submit = async e => {
    e.preventDefault()
    const body = { content, tags: tag ? [tag] : [] }
    await fetch(`${API_BASE}/api/feed`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    setContent('')
    load()
  }

  useEffect(() => { load() }, [])

  return (
    <div className="min-h-screen bg-[#0b0d12] text-white">
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
        <h1 className="text-2xl font-semibold">Community Feed</h1>

        <form onSubmit={submit} className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Share your travel tip or moment..." className="h-24 w-full rounded-md border border-white/10 bg-transparent p-3 outline-none placeholder:text-white/50" />
          <div className="flex items-center gap-2">
            <input value={tag} onChange={e=>setTag(e.target.value)} placeholder="Tag (optional)" className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/50"/>
            <button className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium">Post</button>
          </div>
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          {posts.map(p => (
            <div key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-1 text-xs text-white/50">{new Date(p.created_at || Date.now()).toLocaleString()}</div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{p.content}</p>
              {Array.isArray(p.tags) && p.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tags.map(t => <span key={t} className="rounded bg-white/10 px-2 py-0.5 text-xs">#{t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
