"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import MovieCard from "./movie-card"
import { getMovies } from "@/lib/tmdb"

interface MovieRowProps {
  title: string
  endpoint: string
  params?: string
}

export default function MovieRow({ title, endpoint, params = "" }: MovieRowProps) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies(endpoint, params)
        // Handle both movies and TV shows
        const results =
          data.results?.slice(0, 20).map((item: any) => ({
            ...item,
            title: item.title || item.name, // Normalize title for TV shows
          })) || []
        setMovies(results)
      } catch (error) {
        console.error(`Error fetching ${title}:`, error)
      }
      setLoading(false)
    }

    fetchMovies()
  }, [endpoint, params, title])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="min-w-[200px] h-[300px] bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (movies.length === 0) return null

  return (
    <div className="mb-8 group">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

      <div className="relative">
        {/* Scroll Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Movies Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie: any) => (
            <div key={movie.id} className="min-w-[200px]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
