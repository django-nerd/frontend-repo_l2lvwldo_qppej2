export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0d12] py-10 text-white/70">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-4">
        <div>
          <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded bg-indigo-500 text-sm font-bold text-white">CT</div>
          <p className="text-sm">Community-driven trips, local guides, and travel inspiration.</p>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold text-white">Product</h4>
          <ul className="space-y-1 text-sm">
            <li>Explore</li>
            <li>Guides</li>
            <li>Feed</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold text-white">Company</h4>
          <ul className="space-y-1 text-sm">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold text-white">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li>Terms</li>
            <li>Privacy</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-6 text-xs text-white/40">© {new Date().getFullYear()} Community Travel</div>
    </footer>
  )
}
