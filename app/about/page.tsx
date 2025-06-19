import { MessageCircle, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Zeflix | Free Streaming Platform",
  description:
    "Learn about Zeflix, the free streaming platform bringing global entertainment to your screen. No ads, no signup, just unlimited streaming of movies and TV series.",
  openGraph: {
    title: "About Zeflix | Free Streaming Platform",
    description:
      "Learn about Zeflix, the free streaming platform bringing global entertainment to your screen without ads or signup.",
    url: "https://zeflix.com/about",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0b0c10] pt-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Zeflix</h1>
          <p className="text-xl text-gray-300 mb-8">Stream the World. Anytime. Anywhere. Limitlessly.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              Zeflix brings high-quality entertainment from across the world — Bollywood, Tamil cinema, K-dramas, anime,
              and Hollywood — to your screen with speed, simplicity, and style. We believe in making global content
              accessible to everyone.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Zero Hassle</h2>
            <p className="text-gray-300 leading-relaxed">
              No signups required. No ads interrupting your experience. No geographical restrictions. Just pure,
              uninterrupted streaming of your favorite movies and series from around the globe.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Zap className="w-12 h-12 text-[#1db954] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Optimized streaming with multiple player fallbacks</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-[#1db954] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Global Content</h3>
              <p className="text-gray-400">Movies and series from every corner of the world</p>
            </div>
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-[#1db954] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
              <p className="text-gray-400">Join our growing community of movie enthusiasts</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Join Our Community</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#0088cc] hover:bg-[#0077b3] text-white">
              <Link href="https://t.me/zerocreations" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Telegram
              </Link>
            </Button>
            <Button asChild className="bg-[#25d366] hover:bg-[#20c157] text-white">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Users className="w-4 h-4 mr-2" />
                WhatsApp Community
              </Link>
            </Button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Built by Zero Creations</h2>
          <p className="text-gray-300 mb-4">
            Zeflix is proudly developed by Zero Creations, a team passionate about bringing the best streaming
            experience to users worldwide. We're constantly working to improve and add new features to make your viewing
            experience even better.
          </p>
          <p className="text-[#1db954] font-semibold">Powered by Zero ⚡</p>
        </div>

        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-red-400 mb-3">Important Disclaimer</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Zeflix does not host or store any files on our servers. All content is embedded from publicly available
            sources on the internet. We are not responsible for the content hosted on third-party websites. If you
            believe any content violates copyright, please contact the respective hosting providers directly.
          </p>
        </div>

        <div className="text-center pb-20">
          <p className="text-gray-400">© 2024 Zeflix by Zero Creations. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
