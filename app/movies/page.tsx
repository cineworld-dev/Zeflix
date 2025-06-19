import type { Metadata } from "next"
import MoviesPageClient from "./MoviesPageClient"

export const metadata: Metadata = {
  title: "Latest Movies | Free Movie Streaming | Zeflix",
  description:
    "Watch the latest movies online for free. Discover new releases, popular films, and classic movies from Hollywood, Bollywood, and international cinema.",
  openGraph: {
    title: "Latest Movies | Free Movie Streaming | Zeflix",
    description:
      "Watch the latest movies online for free. Discover new releases, popular films, and classic movies from around the world.",
    url: "https://zeflix.com/movies",
  },
}

export default function MoviesPage() {
  return <MoviesPageClient />
}
