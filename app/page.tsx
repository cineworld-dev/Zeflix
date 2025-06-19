import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import MovieRow from "@/components/movie-row"
import LoadingSpinner from "@/components/loading-spinner"

export default function HomePage() {
  return (
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
  )
}
