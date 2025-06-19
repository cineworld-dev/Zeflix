const TMDB_API_KEY = "3a08a646f83edac9a48438ac670a78b2"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function getMovies(endpoint: string, params = "") {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}${params}`)
    if (!response.ok) {
      throw new Error("Failed to fetch movies")
    }
    return await response.json()
  } catch (error) {
    console.error("TMDB API Error:", error)
    return { results: [] }
  }
}

export async function getTrendingMovies() {
  return getMovies("trending/movie/day")
}

export async function searchMovies(query: string, language?: string) {
  let searchParams = `&query=${encodeURIComponent(query)}&include_adult=false`

  // Add language filter if specified
  if (language && language !== "all") {
    searchParams += `&language=${language}`
  }

  try {
    // Search both movies and TV shows
    const [movieResults, tvResults] = await Promise.all([
      getMovies("search/movie", searchParams),
      getMovies("search/tv", searchParams),
    ])

    // Combine and format results
    const movies =
      movieResults.results?.map((item: any) => ({
        ...item,
        media_type: "movie",
      })) || []

    const tvShows =
      tvResults.results?.map((item: any) => ({
        ...item,
        title: item.name, // Normalize TV show names to title
        media_type: "tv",
      })) || []

    return {
      results: [...movies, ...tvShows].sort((a, b) => b.popularity - a.popularity),
    }
  } catch (error) {
    console.error("Search error:", error)
    return { results: [] }
  }
}

export async function getMovieDetails(id: string) {
  return getMovies(`movie/${id}`)
}

export async function getTVDetails(id: string) {
  return getMovies(`tv/${id}`)
}

export async function getSimilarMovies(id: string) {
  return getMovies(`movie/${id}/similar`)
}

export async function getSimilarTVShows(id: string) {
  return getMovies(`tv/${id}/similar`)
}

export async function getTVSeasons(id: string, seasonNumber: number) {
  return getMovies(`tv/${id}/season/${seasonNumber}`)
}

export async function getGenres() {
  return getMovies("genre/movie/list")
}

export async function getMoviesByGenre(genreId: number) {
  return getMovies("discover/movie", `&with_genres=${genreId}&sort_by=popularity.desc`)
}

export async function discoverMoviesByCountry(country: string) {
  return getMovies("discover/movie", `&with_origin_country=${country}&sort_by=popularity.desc`)
}

export async function getPopularByLanguage(language: string) {
  return getMovies("discover/movie", `&with_original_language=${language}&sort_by=popularity.desc`)
}
