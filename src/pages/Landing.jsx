import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0b0d12] text-white">
      <Navbar />
      <Hero />
      <section className="relative z-10 mx-auto -mt-16 max-w-6xl space-y-12 px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard title="Discover group trips" desc="Find adventures curated by travelers like you."/>
          <FeatureCard title="Hire local guides" desc="Browse rated experts by location and skill."/>
          <FeatureCard title="Social travel feed" desc="Share moments, tips, and itineraries."/>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
          <div>
            <h3 className="text-xl font-semibold">Ready to explore?</h3>
            <p className="text-white/70">Jump into the latest trips and start planning.</p>
          </div>
          <Link to="/explore" className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium">Explore Trips</Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}

function FeatureCard({ title, desc }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <h4 className="mb-1 text-lg font-semibold">{title}</h4>
      <p className="text-sm text-white/70">{desc}</p>
    </div>
  )
}
