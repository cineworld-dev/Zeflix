"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import MovieCard from "@/components/movie-card"
import { getMovies } from "@/lib/tmdb"
import LoadingSpinner from "@/components/loading-spinner"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", flag: "🇮🇳" },
  { code: "te", name: "Telugu", flag: "🇮🇳" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
]

export default function LanguagesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMoviesByLanguage = async () => {
      setLoading(true)
      try {
        const data = await getMovies(
          "discover/movie",
          `&with_original_language=${selectedLanguage.code}&sort_by=popularity.desc`,
        )
        setMovies(data.results || [])
      } catch (error) {
        console.error("Error fetching movies by language:", error)
      }
      setLoading(false)
    }

    fetchMoviesByLanguage()
  }, [selectedLanguage])

  return (
    <div className="min-h-screen bg-[#0b0c10] pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Browse by Language</h1>

        {/* Language Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {languages.map((language) => (
            <Button
              key={language.code}
              onClick={() => setSelectedLanguage(language)}
              variant={selectedLanguage.code === language.code ? "default" : "outline"}
              className={
                selectedLanguage.code === language.code
                  ? "bg-[#1db954] hover:bg-[#1ed760] text-black"
                  : "border-gray-600 text-gray-300 hover:bg-gray-800"
              }
            >
              {language.flag} {language.name}
            </Button>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-white mb-6">
          {selectedLanguage.flag} {selectedLanguage.name} Movies
        </h2>

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
