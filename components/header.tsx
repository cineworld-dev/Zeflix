"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "Series", href: "/series" },
  { name: "Genres", href: "/genres" },
  { name: "Languages", href: "/languages" },
  { name: "Search", href: "/search" },
  { name: "About", href: "/about" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0c10]/95 backdrop-blur-sm border-b border-gray-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Image src="/logo.png" alt="Zeflix" width={32} height={32} className="h-8 w-auto" />
            <span className="text-2xl font-bold text-white">Zeflix</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Desktop navigation - Full navigation bar */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 transition-colors px-3 py-2 rounded-md ${
                pathname === item.href
                  ? "text-[#1db954] bg-[#1db954]/10"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[60]">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

            {/* Menu Panel */}
            <div className="fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-[#0b0c10] border-l border-gray-800 shadow-2xl transform transition-transform duration-300 ease-out">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-[#0b0c10]">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <Image src="/logo.png" alt="Zeflix" width={32} height={32} className="h-8 w-auto" />
                    <span className="text-xl font-bold text-white">Zeflix</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 flex items-center justify-center">
                  <nav className="w-full px-6">
                    <div className="space-y-1">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center rounded-xl px-4 py-4 text-lg font-medium transition-all duration-200 ${
                            pathname === item.href
                              ? "bg-[#1db954]/20 text-[#1db954] border border-[#1db954]/30"
                              : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-800 bg-[#0b0c10]">
                  <p className="text-gray-400 text-sm text-center">Stream the World. Limitlessly.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
