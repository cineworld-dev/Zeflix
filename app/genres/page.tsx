import GenresPageClient from "./GenresPageClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Browse Movies by Genre | Zeflix",
  description:
    "Explore movies and TV series by genre. Find action, comedy, drama, horror, romance, sci-fi, thriller, and more. Discover your favorite genre content.",
  openGraph: {
    title: "Browse Movies by Genre | Zeflix",
    description:
      "Explore movies and TV series by genre. Find action, comedy, drama, horror, romance, sci-fi, thriller, and more.",
    url: "https://zeflix.com/genres",
  },
}

export default function GenresPage() {
  return <GenresPageClient />
}
