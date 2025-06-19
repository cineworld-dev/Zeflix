import type { Metadata } from "next"
import LanguagesClientPage from "./LanguagesClientPage"

export const metadata: Metadata = {
  title: "Movies by Language | Global Cinema | Zeflix",
  description:
    "Watch movies and series in different languages. Explore Hindi, Tamil, Korean, Japanese, French, Spanish, German, and other international content.",
  openGraph: {
    title: "Movies by Language | Global Cinema | Zeflix",
    description: "Watch movies and series in different languages. Explore international content from around the world.",
    url: "https://zeflix.com/languages",
  },
}

export default function LanguagesPage() {
  return <LanguagesClientPage />
}
