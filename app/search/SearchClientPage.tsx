"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MovieCard from "@/components/movie-card"
import { searchMovies } from "@/lib/tmdb"
import LoadingSpinner from "@/components/loading-spinner"

const languages = [
  { code: "all", name: "All Languages", flag: "🌍" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", flag: "🇮🇳" },
  { code: "te", name: "Telugu", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", flag: "🇮🇳" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "th", name: "Thai", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "ms", name: "Malay", flag: "🇲🇾" },
  { code: "tl", name: "Filipino", flag: "🇵🇭" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "sv", name: "Swedish", flag: "🇸🇪" },
  { code: "no", name: "Norwegian", flag: "🇳🇴" },
  { code: "da", name: "Danish", flag: "🇩🇰" },
  { code: "fi", name: "Finnish", flag: "🇫🇮" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "cs", name: "Czech", flag: "🇨🇿" },
  { code: "hu", name: "Hungarian", flag: "🇭🇺" },
  { code: "ro", name: "Romanian", flag: "🇷🇴" },
  { code: "bg", name: "Bulgarian", flag: "🇧🇬" },
  { code: "hr", name: "Croatian", flag: "🇭🇷" },
  { code: "sr", name: "Serbian", flag: "🇷🇸" },
  { code: "sk", name: "Slovak", flag: "🇸🇰" },
  { code: "sl", name: "Slovenian", flag: "🇸🇮" },
  { code: "et", name: "Estonian", flag: "🇪🇪" },
  { code: "lv", name: "Latvian", flag: "🇱🇻" },
  { code: "lt", name: "Lithuanian", flag: "🇱🇹" },
  { code: "uk", name: "Ukrainian", flag: "🇺🇦" },
  { code: "be", name: "Belarusian", flag: "🇧🇾" },
  { code: "ka", name: "Georgian", flag: "🇬🇪" },
  { code: "am", name: "Armenian", flag: "🇦🇲" },
  { code: "az", name: "Azerbaijani", flag: "🇦🇿" },
  { code: "kk", name: "Kazakh", flag: "🇰🇿" },
  { code: "ky", name: "Kyrgyz", flag: "🇰🇬" },
  { code: "uz", name: "Uzbek", flag: "🇺🇿" },
  { code: "tg", name: "Tajik", flag: "🇹🇯" },
  { code: "mn", name: "Mongolian", flag: "🇲🇳" },
  { code: "he", name: "Hebrew", flag: "🇮🇱" },
  { code: "fa", name: "Persian", flag: "🇮🇷" },
  { code: "ur", name: "Urdu", flag: "🇵🇰" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
  { code: "ne", name: "Nepali", flag: "🇳🇵" },
  { code: "si", name: "Sinhala", flag: "🇱🇰" },
  { code: "my", name: "Burmese", flag: "🇲🇲" },
  { code: "km", name: "Khmer", flag: "🇰🇭" },
  { code: "lo", name: "Lao", flag: "🇱🇦" },
]

const sortOptions = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "release_date.desc", label: "Latest" },
  { value: "vote_average.desc", label: "Highest Rated" },
]

export default function SearchClientPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState("all")
  const [sortBy, setSortBy] = useState("popularity.desc")

  const filteredResults = useMemo(() => {
    let filtered = results

    if (language !== "all") {
      filtered = filtered.filter((movie) => movie.original_language === language)
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "release_date.desc":
          return new Date(b.release_date || 0) - new Date(a.release_date || 0)
        case "vote_average.desc":
          return b.vote_average - a.vote_average
        default:
          return b.popularity - a.popularity
      }
    })
  }, [results, language, sortBy])

  useEffect(() => {
    const searchMoviesDebounced = async () => {
      if (query.trim()) {
        setLoading(true)
        try {
          const data = await searchMovies(query)
          setResults(data.results || [])
        } catch (error) {
          console.error("Search error:", error)
          setResults([])
        }
        setLoading(false)
      } else {
        setResults([])
      }
    }

    const timeoutId = setTimeout(searchMoviesDebounced, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <div className="min-h-screen bg-[#0b0c10] pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Search Movies & Series</h1>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search movies, series, actors from any country..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#1db954]"
              />
            </div>

            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                    <Filter className="w-4 h-4 mr-2" />
                    {languages.find((l) => l.code === language)?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                    {languages.map((lang) => (
                      <DropdownMenuRadioItem key={lang.code} value={lang.code} className="text-white hover:bg-gray-700">
                        {lang.name}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                    Sort: {sortOptions.find((s) => s.value === sortBy)?.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    {sortOptions.map((option) => (
                      <DropdownMenuRadioItem
                        key={option.value}
                        value={option.value}
                        className="text-white hover:bg-gray-700"
                      >
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {loading && <LoadingSpinner />}

        {!loading && filteredResults.length > 0 && (
          <div className="movie-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {!loading && query && filteredResults.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No results found for "{query}"</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {!query && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Start typing to search for movies and series</p>
          </div>
        )}
      </div>
    </div>
  )
}
