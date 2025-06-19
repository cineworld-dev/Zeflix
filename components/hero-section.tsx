"use client"

import { useState, useEffect } from "react"
import { Play, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getTrendingMovies } from "@/lib/tmdb"
import Link from "next/link"

export default function HeroSection() {
  const [currentMovie, setCurrentMovie] = useState<any>(null)
  const [trendingMovies, setTrendingMovies] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingMovies()
        const movies = data.results?.slice(0, 5) || []
        setTrendingMovies(movies)
        if (movies.length > 0) {
          setCurrentMovie(movies[0])
        }
      } catch (error) {
        console.error("Error fetching trending movies:", error)
      }
    }

    fetchTrending()
  }, [])

  useEffect(() => {
    if (trendingMovies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % trendingMovies.length
          setCurrentMovie(trendingMovies[nextIndex])
          return nextIndex
        })
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [trendingMovies])

  if (!currentMovie) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1db954]"></div>
      </div>
    )
  }

  const backdropUrl = currentMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
    : "/placeholder.svg?height=720&width=1280"

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center px-4 md:px-8">
        <div className="max-w-2xl">
          <h1 className="hero-title text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {currentMovie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-[#1db954] text-black hover:bg-[#1ed760]">
              ⭐ {currentMovie.vote_average?.toFixed(1)}
            </Badge>
            <Badge variant="outline" className="border-gray-400 text-gray-300">
              {new Date(currentMovie.release_date).getFullYear()}
            </Badge>
            <Badge variant="outline" className="border-gray-400 text-gray-300 uppercase">
              {currentMovie.original_language}
            </Badge>
          </div>

          <p className="hero-description text-gray-200 text-lg mb-8 leading-relaxed line-clamp-3">
            {currentMovie.overview}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-[#1db954] hover:bg-[#1ed760] text-black font-semibold">
              <Link href={`/watch/${currentMovie.id}`}>
                <Play className="w-5 h-5 mr-2 fill-current" />
                Watch Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gray-400 text-white hover:bg-gray-800">
              <Link href={`/watch/${currentMovie.id}`}>
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {trendingMovies.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-[#1db954] w-8" : "bg-gray-500"
            }`}
            onClick={() => {
              setCurrentIndex(index)
              setCurrentMovie(trendingMovies[index])
            }}
          />
        ))}
      </div>
    </div>
  )
}
