"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Star, Calendar, Clock, Globe, ChevronDown, Shield, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MovieCard from "@/components/movie-card"
import { getMovieDetails, getTVDetails, getSimilarMovies, getSimilarTVShows, getTVSeasons } from "@/lib/tmdb"
import Link from "next/link"

const STREAMING_SOURCES = [
  {
    name: "VidSrc",
    getUrl: (id: string, type = "movie", season?: number, episode?: number) => {
      if (type === "tv" && season && episode) {
        return `https://vidsrc.xyz/embed/tv/${id}/${season}/${episode}`
      }
      return `https://vidsrc.xyz/embed/${type}/${id}`
    },
  },
  {
    name: "MultiEmbed",
    getUrl: (id: string, type = "movie", season?: number, episode?: number) => {
      if (type === "tv" && season && episode) {
        return `https://multiembed.mov/?video_id=${id}&s=${season}&e=${episode}`
      }
      return `https://multiembed.mov/?video_id=${id}`
    },
  },
  {
    name: "2Embed",
    getUrl: (id: string, type = "movie", season?: number, episode?: number) => {
      if (type === "tv" && season && episode) {
        return `https://2embed.to/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`
      }
      return `https://2embed.to/embed/tmdb/${type}?id=${id}`
    },
  },
]

export default function WatchPage() {
  const params = useParams()
  const id = params.id as string

  const [content, setContent] = useState<any>(null)
  const [similarContent, setSimilarContent] = useState([])
  const [currentServerIndex, setCurrentServerIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [contentType, setContentType] = useState<"movie" | "tv">("movie")
  const [seasons, setSeasons] = useState([])
  const [selectedSeason, setSelectedSeason] = useState(1)
  const [selectedEpisode, setSelectedEpisode] = useState(1)
  const [episodes, setEpisodes] = useState([])
  const [showPlayer, setShowPlayer] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let contentData
        let similarData
        let isTV = false

        try {
          contentData = await getMovieDetails(id)
          similarData = await getSimilarMovies(id)
        } catch (error) {
          contentData = await getTVDetails(id)
          similarData = await getSimilarTVShows(id)
          isTV = true
        }

        if (!contentData || !contentData.id) {
          if (!isTV) {
            contentData = await getTVDetails(id)
            similarData = await getSimilarTVShows(id)
            isTV = true
          } else {
            contentData = await getMovieDetails(id)
            similarData = await getSimilarMovies(id)
            isTV = false
          }
        }

        setContentType(isTV ? "tv" : "movie")
        setContent(contentData)
        setSimilarContent(similarData.results?.slice(0, 8) || [])

        if (isTV && contentData.seasons) {
          setSeasons(contentData.seasons.filter((season: any) => season.season_number > 0))
          if (contentData.seasons.length > 0) {
            const firstSeason = contentData.seasons.find((s: any) => s.season_number > 0)
            if (firstSeason) {
              const seasonDetails = await getTVSeasons(id, firstSeason.season_number)
              setEpisodes(seasonDetails.episodes || [])
            }
          }
        }
      } catch (error) {
        console.error("Error fetching content data:", error)
      }
      setLoading(false)
    }

    if (id) {
      fetchData()
    }
  }, [id])

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (contentType === "tv" && selectedSeason) {
        try {
          const seasonDetails = await getTVSeasons(id, selectedSeason)
          setEpisodes(seasonDetails.episodes || [])
          setSelectedEpisode(1)
        } catch (error) {
          console.error("Error fetching episodes:", error)
        }
      }
    }

    fetchEpisodes()
  }, [selectedSeason, id, contentType])

  const switchServer = (index: number) => {
    setCurrentServerIndex(index)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1db954]"></div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Content not found</h1>
          <Link href="/">
            <Button className="bg-[#1db954] hover:bg-[#1ed760] text-black">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const title = content.title || content.name
  const backdropUrl = content.backdrop_path
    ? `https://image.tmdb.org/t/p/original${content.backdrop_path}`
    : "/placeholder.svg?height=720&width=1280"

  const currentPlayerUrl = STREAMING_SOURCES[currentServerIndex].getUrl(
    id,
    contentType,
    contentType === "tv" ? selectedSeason : undefined,
    contentType === "tv" ? selectedEpisode : undefined,
  )

  return (
    <div className="min-h-screen bg-[#0b0c10]">
      {/* 1. Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent" />

        <div className="absolute top-20 left-4 md:left-8 z-10">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-black/50 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <div className="relative h-full flex items-center px-4 md:px-8 pt-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">{title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge className="bg-[#1db954] text-black hover:bg-[#1ed760] px-3 py-1">
                <Star className="w-4 h-4 mr-1 fill-current" />
                {content.vote_average?.toFixed(1)}
              </Badge>
              <Badge variant="outline" className="border-gray-400 text-gray-300 px-3 py-1">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(content.release_date || content.first_air_date).getFullYear()}
              </Badge>
              {content.runtime && (
                <Badge variant="outline" className="border-gray-400 text-gray-300 px-3 py-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {content.runtime} min
                </Badge>
              )}
              <Badge variant="outline" className="border-gray-400 text-gray-300 uppercase px-3 py-1">
                <Globe className="w-4 h-4 mr-1" />
                {content.original_language}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {content.genres?.map((genre: any) => (
                <Badge key={genre.id} variant="outline" className="border-gray-600 text-gray-300">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <p className="text-gray-200 text-lg leading-relaxed mb-8 max-w-3xl line-clamp-3">{content.overview}</p>

            <Button
              onClick={() => setShowPlayer(true)}
              size="lg"
              className="bg-[#1db954] hover:bg-[#1ed760] text-black font-semibold px-8"
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Watch Now
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Player Section with Clear Interface */}
      {showPlayer && (
        <div className="px-4 md:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Player Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-green-900/20 border border-green-500/30 rounded-lg px-3 py-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Ad-Block Protected</span>
                </div>

                {contentType === "tv" && seasons.length > 0 && (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
                          Season {selectedSeason}
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-900 border-gray-700 max-h-60 overflow-y-auto">
                        <DropdownMenuRadioGroup
                          value={selectedSeason.toString()}
                          onValueChange={(value) => setSelectedSeason(Number.parseInt(value))}
                        >
                          {seasons.map((season: any) => (
                            <DropdownMenuRadioItem
                              key={season.season_number}
                              value={season.season_number.toString()}
                              className="text-white hover:bg-gray-800"
                            >
                              Season {season.season_number}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {episodes.length > 0 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                          >
                            Episode {selectedEpisode}
                            <ChevronDown className="w-4 h-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-900 border-gray-700 max-h-60 overflow-y-auto">
                          <DropdownMenuRadioGroup
                            value={selectedEpisode.toString()}
                            onValueChange={(value) => setSelectedEpisode(Number.parseInt(value))}
                          >
                            {episodes.map((episode: any) => (
                              <DropdownMenuRadioItem
                                key={episode.episode_number}
                                value={episode.episode_number.toString()}
                                className="text-white hover:bg-gray-800"
                              >
                                <div className="flex flex-col items-start">
                                  <span>Episode {episode.episode_number}</span>
                                  {episode.name && <span className="text-xs text-gray-400">{episode.name}</span>}
                                </div>
                              </DropdownMenuRadioItem>
                            ))}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </>
                )}
              </div>

              {/* Server Selection */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Server:</span>
                {STREAMING_SOURCES.map((server, index) => (
                  <Button
                    key={index}
                    onClick={() => switchServer(index)}
                    size="sm"
                    variant={currentServerIndex === index ? "default" : "outline"}
                    className={
                      currentServerIndex === index
                        ? "bg-[#1db954] hover:bg-[#1ed760] text-black"
                        : "border-gray-600 text-gray-300 hover:bg-gray-800"
                    }
                  >
                    {server.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={currentPlayerUrl}
                className="w-full h-full"
                allowFullScreen
                frameBorder="0"
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>

            {/* Player Info */}
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">
                Currently playing on{" "}
                <span className="text-[#1db954] font-medium">{STREAMING_SOURCES[currentServerIndex].name}</span>
                {contentType === "tv" && ` - Season ${selectedSeason}, Episode ${selectedEpisode}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. You May Also Like - 8 Movies */}
      {similarContent.length > 0 && (
        <div className="px-4 md:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {similarContent.map((item: any) => (
                <MovieCard key={item.id} movie={{ ...item, title: item.title || item.name }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
