import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Calendar, Clock, Play, Clapperboard } from "lucide-react"
import { MovieCard } from "@/lib/movie-card"

interface MovieDetailsProps {
  movieId: string
}

// Helper function to fetch movie data from API with caching
async function fetchMovieData(movieId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=902448fc43a38ed08a67a10ce457b573`,
      { next: { revalidate: 86400 } } // Cache for 24 hours
    )
    if (!response.ok) return null
    return response.json()
  } catch (error) {
    console.error("Error fetching movie details:", error)
    return null
  }
}

export async function MovieDetails({ movieId }: MovieDetailsProps) {
  const movie = await fetchMovieData(movieId)

  if (!movie) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Movie not found</p>
      </div>
    )
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/placeholder.svg?height=800&width=1200"

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg?height=750&width=500"

  return (
    <div className="relative">
      <div className="h-[60vh] bg-cover bg-center relative" style={{ backgroundImage: `url(${backdropUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative -mt-32 z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Image
              src={posterUrl}
              alt={movie.title}
              width={500}
              height={750}
              priority
              className="w-full max-w-sm mx-auto rounded-lg shadow-2xl"
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{movie.title}</h1>
              {movie.tagline && <p className="text-gray-300 text-lg italic mb-4">{movie.tagline}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400 fill-current" size={20} />
                <span className="text-white font-medium text-lg">{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-300">
                <Calendar size={16} />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              {movie.runtime && (
                <div className="flex items-center space-x-1 text-gray-300">
                  <Clock size={16} />
                  <span>{movie.runtime} min</span>
                </div>
              )}
              <Badge className="bg-green-600">{movie.status}</Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre: { id: number; name: string }) => (
                <Badge key={genre.id} variant="outline" className="border-purple-500 text-purple-300">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>

            <div className="grid md:grid-cols-2 gap-6 pt-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-2">Budget</h3>
                  <p className="text-gray-300">
                    {movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : "Not disclosed"}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-2">Revenue</h3>
                  <p className="text-gray-300">
                    {movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : "Not available"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MovieTrailerProps {
  movieId: string
}

interface Video {
  id: string
  key: string
  name: string
  type: string
  site: string
}

async function fetchMovieVideos(movieId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=902448fc43a38ed08a67a10ce457b573`,
      { next: { revalidate: 86400 } }
    )
    if (!response.ok) return []
    const data = await response.json()
    return data.results?.filter((video: Video) => video.type === "Trailer" && video.site === "YouTube") || []
  } catch (error) {
    console.error("Error fetching videos:", error)
    return []
  }
}

export async function MovieTrailer({ movieId }: MovieTrailerProps) {
  const videos = await fetchMovieVideos(movieId)

  if (videos.length === 0) {
    return null
  }

  const mainTrailer = videos[0]

  return (
    <div className="py-8 max-w-7xl mx-auto px-8 ">
      <h2 className="text-2xl font-bold text-white mb-6">Trailers & Videos</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${mainTrailer.key}`}
                  title={mainTrailer.name}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 h-fit ">
          {videos.slice(1, 4).map((video: Video) => (
            <Card
              key={video.id}
              className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative w-16 h-12 bg-slate-700 rounded flex items-center justify-center">
                    <Play className="text-purple-400" size={16} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-sm line-clamp-2">{video.name}</h3>
                    <p className="text-gray-400 text-xs">{video.type}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

interface SimilarMoviesProps {
  movieId: string
}

interface Movie {
  id: string
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
}

async function fetchSimilarMovies(movieId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=902448fc43a38ed08a67a10ce457b573`,
      { next: { revalidate: 86400 } }
    )
    if (!response.ok) return []
    const data = await response.json()
    return data.results?.slice(0, 6) || []
  } catch (error) {
    console.error("Error fetching similar movies:", error)
    return []
  }
}

export async function SimilarMovies({ movieId }: SimilarMoviesProps) {
  const movies = await fetchSimilarMovies(movieId)

  if (movies.length === 0) {
    return null
  }

  return (
    <div className="py-8 px-5 max-w-7xl mx-auto ">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Clapperboard className="text-purple-400 w-8 h-8" />
        Similar Movies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
