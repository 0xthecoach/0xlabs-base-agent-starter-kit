import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-sm py-8 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-pixel mb-4 text-white neon-text">MEMEWARS</h3>
          <p className="text-gray-300 text-sm">
            The ultimate meme battle arena where your favorite internet memes come to life and battle for glory.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-pixel mb-4 text-white">Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link href="/features" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                Features
              </Link>
            </li>
            <li>
              <Link href="/roadmap" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                Roadmap
              </Link>
            </li>
            <li>
              <Link href="/team" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                Team
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-pixel mb-4 text-white">Community</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                Discord
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                Telegram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-pixel mb-4 text-white">Newsletter</h4>
          <p className="text-gray-300 text-sm mb-2">Subscribe to get the latest updates</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="bg-gray-800 text-white px-3 py-2 rounded-l-md focus:outline-none text-sm"
            />
            <button className="bg-pink-600 text-white px-3 py-2 rounded-r-md hover:bg-pink-700 transition-colors text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} MemeWars. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
