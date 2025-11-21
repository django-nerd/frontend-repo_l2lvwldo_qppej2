import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TripForm from '../components/TripForm'
import TripList from '../components/TripList'

export default function Explore() {
  return (
    <div className="min-h-screen bg-[#0b0d12] text-white">
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        <h1 className="text-2xl font-semibold">Explore Trips</h1>
        <TripForm />
        <TripList />
      </main>
      <Footer />
    </div>
  )
}
