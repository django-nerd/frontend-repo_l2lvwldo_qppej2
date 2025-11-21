import Hero from './components/Hero'
import TripForm from './components/TripForm'
import TripList from './components/TripList'

function App() {
  return (
    <div className="min-h-screen bg-[#0b0d12]">
      <Hero />
      <main className="relative z-10 mx-auto -mt-16 max-w-6xl space-y-8 px-6 pb-20">
        <TripForm />
        <TripList />
      </main>
    </div>
  )
}

export default App
