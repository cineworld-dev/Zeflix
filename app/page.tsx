import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import MovieRow from "@/components/movie-row"
import LoadingSpinner from "@/components/loading-spinner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Zeflix - Stream the World | Free Movies & TV Series Online",
  description:
    "Watch trending movies, popular TV series, anime, K-dramas, Bollywood and Hollywood content for free. Stream in HD quality without ads or signup required.",
  openGraph: {
    title: "Zeflix - Stream the World | Free Movies & TV Series Online",
    description:
      "Watch trending movies, popular TV series, anime, K-dramas, Bollywood and Hollywood content for free. Stream in HD quality without ads or signup required.",
    url: "https://zeflix.com",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Zeflix Homepage - Stream the World",
      },
    ],
  },
}

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Zeflix - Stream the World",
    description: "Watch trending movies, popular TV series, anime, K-dramas, Bollywood and Hollywood content for free.",
    url: "https://zeflix.com",
    mainEntity: {
      "@type": "ItemList",
      name: "Featured Movies and TV Series",
      description: "Trending and popular movies and TV series available for streaming",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="min-h-screen bg-[#0b0c10]">
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
        </Suspense>

        <div className="sflix-container pb-20 space-y-8">
          <MovieRow title="Trending Now" endpoint="trending/movie/day" />
          <MovieRow title="Popular Picks" endpoint="movie/popular" />
          <MovieRow title="Top Rated" endpoint="movie/top_rated" />
          <MovieRow title="Indian Picks" endpoint="discover/movie" params="&with_original_language=hi|ta|te" />
          <MovieRow title="World Cinema" endpoint="discover/movie" params="&with_original_language=ko|ja|fr|es" />
        </div>
      </main>
    </>
  )
}
