import type { Metadata } from "next/types"
import SearchClientPage from "./SearchClientPage"

export const metadata: Metadata = {
  title: "Search Movies & TV Series | Zeflix",
  description:
    "Search and discover movies, TV series, anime, and shows from around the world. Find content in multiple languages including Hindi, Tamil, Korean, Japanese, and more.",
  openGraph: {
    title: "Search Movies & TV Series | Zeflix",
    description:
      "Search and discover movies, TV series, anime, and shows from around the world. Find content in multiple languages.",
    url: "https://zeflix.com/search",
  },
}

export default function SearchPage() {
  return <SearchClientPage />
}
