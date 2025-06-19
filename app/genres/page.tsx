"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import MovieCard from "@/components/movie-card"
import { getGenres, getMoviesByGenre } from "@/lib/tmdb"
import LoadingSpinner from "@/components/loading-spinner"

export default function GenresPage() {
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState<any>(null)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres()
        setGenres(data.genres || [])
        if (data.genres?.length > 0) {
          setSelectedGenre(data.genres[0])
        }
      } catch (error) {
        console.error("Error fetching genres:", error)
      }
      setLoading(false)
    }

    fetchGenres()
  }, [])

  useEffect(() => {
    if (selectedGenre) {
      const fetchMoviesByGenre = async () => {
        setLoading(true)
        try {
          const data = await getMoviesByGenre(selectedGenre.id)
          setMovies(data.results || [])
        } catch (error) {
          console.error("Error fetching movies by genre:", error)
        }
        setLoading(false)
      }

      fetchMoviesByGenre()
    }
  }, [selectedGenre])

  return (
    <div className="min-h-screen bg-[#0b0c10] pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Browse by Genre</h1>

        {/* Genre Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {genres.map((genre: any) => (
            <Button
              key={genre.id}
              onClick={() => setSelectedGenre(genre)}
              variant={selectedGenre?.id === genre.id ? "default" : "outline"}
              className={
                selectedGenre?.id === genre.id
                  ? "bg-[#1db954] hover:bg-[#1ed760] text-black"
                  : "border-gray-600 text-gray-300 hover:bg-gray-800"
              }
            >
              {genre.name}
            </Button>
          ))}
        </div>

        {selectedGenre && <h2 className="text-2xl font-semibold text-white mb-6">{selectedGenre.name} Movies</h2>}

        {loading && <LoadingSpinner />}

        {!loading && movies.length > 0 && (
          <div className="movie-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-20">
            {movies.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
