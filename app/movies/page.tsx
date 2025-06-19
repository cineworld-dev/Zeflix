"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import MovieCard from "@/components/movie-card"
import { getMovies } from "@/lib/tmdb"
import LoadingSpinner from "@/components/loading-spinner"

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const data = await getMovies("discover/movie", `&sort_by=release_date.desc&page=${page}`)
        if (page === 1) {
          setMovies(data.results || [])
        } else {
          setMovies((prev) => [...prev, ...(data.results || [])])
        }
        setTotalPages(data.total_pages || 1)
      } catch (error) {
        console.error("Error fetching movies:", error)
      }
      setLoading(false)
    }

    fetchMovies()
  }, [page])

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Latest Movies</h1>

        {loading && page === 1 && <LoadingSpinner />}

        {movies.length > 0 && (
          <>
            <div className="movie-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {movies.map((movie: any) => (
                <MovieCard key={`${movie.id}-${page}`} movie={movie} />
              ))}
            </div>

            {page < totalPages && (
              <div className="text-center pb-20">
                <Button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-[#1db954] hover:bg-[#1ed760] text-black px-8 py-2"
                >
                  {loading ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
