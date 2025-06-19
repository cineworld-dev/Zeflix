import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Users, Play, Search, Film, Tv, Globe } from "lucide-react"

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/", icon: Play },
    { name: "Movies", href: "/movies", icon: Film },
    { name: "Series", href: "/series", icon: Tv },
    { name: "Search", href: "/search", icon: Search },
    { name: "Genres", href: "/genres", icon: Globe },
    { name: "Languages", href: "/languages", icon: Globe },
  ]

  const socialLinks = [
    {
      name: "Telegram",
      href: "https://t.me/zerocreations",
      icon: MessageCircle,
      color: "hover:text-[#0088cc]",
    },
    {
      name: "WhatsApp",
      href: "#",
      icon: Users,
      color: "hover:text-[#25d366]",
    },
  ]

  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Zeflix" width={40} height={40} className="h-10 w-auto" />
              <span className="text-2xl font-bold text-white">Zeflix</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Stream the World. Anytime. Anywhere. Limitlessly. Your ultimate destination for global entertainment.
            </p>
            <p className="text-[#1db954] font-semibold text-sm">Powered by Zero ⚡</p>
          </div>

          {/* Browse Section */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Browse</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#1db954] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/movies" className="text-gray-400 hover:text-[#1db954] transition-colors text-sm">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/series" className="text-gray-400 hover:text-[#1db954] transition-colors text-sm">
                  TV Series
                </Link>
              </li>
              <li>
                <Link href="/genres" className="text-gray-400 hover:text-[#1db954] transition-colors text-sm">
                  Genres
                </Link>
              </li>
              <li>
                <Link href="/languages" className="text-gray-400 hover:text-[#1db954] transition-colors text-sm">
                  Languages
                </Link>
              </li>
            </ul>
          </div>

          {/* Features Section */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/search" className="text-gray-400 hover:text-[#1db954] transition-colors text-sm">
                  Search
                </Link>
              </li>
              <li>
                <span className="text-gray-400 text-sm">HD Quality</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">No Ads</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">No Signup</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Multi-Language</span>
              </li>
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Community</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://t.me/zerocreations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#0088cc] transition-colors text-sm flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Telegram
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#25d366] transition-colors text-sm flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  WhatsApp
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#1db954] transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">© 2024 Zeflix by Zero Creations. All rights reserved.</p>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="https://t.me/zerocreations"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#0088cc] transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#25d366] transition-colors"
                aria-label="WhatsApp"
              >
                <Users className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-xs text-center leading-relaxed">
              <strong>Disclaimer:</strong> We do not host or store any files. All content is embedded from public
              sources. If you believe any content violates copyright, please contact the respective hosting providers
              directly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
