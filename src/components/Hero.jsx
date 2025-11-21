import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-[#0b0d12]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability (doesn't block interactions) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0d12]/30 via-[#0b0d12]/60 to-[#0b0d12]" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-medium text-white/80 ring-1 ring-white/15">
          Community-driven • Social • Marketplace
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Plan group adventures together
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
          Connect travelers, local guides, and services in one place. Post trips, find crews, book guides, and split costs with ease.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#create" className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0b0d12] shadow/20 shadow-white/10 hover:shadow-white/20">
            Create a Trip
          </a>
          <a href="#discover" className="rounded-lg bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15">
            Discover Trips
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
