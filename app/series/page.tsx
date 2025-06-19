import type { Metadata } from "next"
import SeriesClientPage from "./SeriesClientPage"

export const metadata: Metadata = {
  title: "TV Series & Anime | Free Streaming | Zeflix",
  description:
    "Stream TV series, anime, K-dramas, and shows online for free. Watch popular series from Netflix, HBO, and international networks without subscription.",
  openGraph: {
    title: "TV Series & Anime | Free Streaming | Zeflix",
    description:
      "Stream TV series, anime, K-dramas, and shows online for free. Watch popular series without subscription.",
    url: "https://zeflix.com/series",
  },
}

export default function SeriesPage() {
  return <SeriesClientPage />
}
