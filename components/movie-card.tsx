"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MovieCardProps {
  movie: {
    id: number
    title: string
    poster_path?: string
    vote_average?: number
    release_date?: string
    original_language?: string
    overview?: string
  }
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const posterUrl =
    movie.poster_path && !imageError
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/placeholder.svg?height=300&width=200"

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"

  return (
    <Link href={`/watch/${movie.id}`}>
      <div
        className="movie-card relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Poster Image */}
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 shadow-lg">
          <Image
            src={posterUrl || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-[#1db954] rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-6 h-6 text-black fill-current" />
            </div>
          </div>

          {/* Rating Badge */}
          {movie.vote_average && movie.vote_average > 0 && (
            <Badge className="absolute top-2 right-2 bg-black/80 text-white border-0 text-xs">
              <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
              {rating}
            </Badge>
          )}

          {/* Language Badge */}
          {movie.original_language && (
            <Badge className="absolute top-2 left-2 bg-[#1db954] text-black text-xs uppercase font-semibold">
              {movie.original_language}
            </Badge>
          )}
        </div>

        {/* Movie Info */}
        <div className="mt-3 space-y-1 px-1">
          <h3 className="text-white font-semibold text-sm line-clamp-2 leading-tight group-hover:text-[#1db954] transition-colors">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-xs">{year}</p>
        </div>
      </div>
    </Link>
  )
}
