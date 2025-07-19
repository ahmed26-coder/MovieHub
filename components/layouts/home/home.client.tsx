"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Info, Star, Users, Zap } from "lucide-react"
import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { Flame } from "lucide-react"
import { MovieCard } from "@/lib/movie-card"
import { Award } from "lucide-react"
import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Marquee } from "@/components/magicui/marquee"

interface Movie {
  id: string
  title: string
  overview: string
  backdrop_path: string
  vote_average: number
  release_date: string
}

export function HeroSection() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null)

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=902448fc43a38ed08a67a10ce457b573&include_adult=false&page=1",
        )
        const data = await response.json()
        if (data.results && data.results.length > 0) {
          setFeaturedMovie(data.results[0])
        }
      } catch (error) {
        console.error("Error fetching featured movie:", error)
      }
    }

    fetchFeaturedMovie()
  }, [])

  if (!featuredMovie) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-r from-slate-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white">Loading featured movie...</p>
        </div>
      </div>
    )
  }

  const backdropUrl = featuredMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`
    : "/placeholder.svg?height=800&width=1200"

  return (
    <div className="relative h-[70vh] overflow-hidden text-center sm:text-start mx-auto">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backdropUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{featuredMovie.title}</h1>

          <div className="flex items-center justify-center sm:justify-start space-x-4 mb-6">
            <div className="flex items-center space-x-1">
              <Star className="text-yellow-400 fill-current" size={20} />
              <span className="text-white font-medium">{featuredMovie.vote_average.toFixed(1)}</span>
            </div>
            <span className="text-gray-300">{new Date(featuredMovie.release_date).getFullYear()}</span>
          </div>

          <p className="text-gray-200 text-lg mb-8 leading-relaxed">{featuredMovie.overview}</p>

          <div className="flex space-x-4 justify-center mx-auto">
            <Link href={`/movies/${featuredMovie.id}`}>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Play className="mr-2" size={20} />
                Watch Trailer
              </Button>
            </Link>
            <Link href={`/movies/${featuredMovie.id}`}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                <Info className="mr-2" size={20} />
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


interface Movie {
  id: string
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
}

export function TrendingMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/week?api_key=902448fc43a38ed08a67a10ce457b573&include_adult=false",
        )
        const data = await response.json()
        setMovies(data.results?.slice(0, 6) || [])
      } catch (error) {
        console.error("Error fetching trending movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingMovies()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        </div>
      </div>
    )
  }

  return (
    <section className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex sm:items-center flex-col sm:flex-row sm:flex-wrap justify-between mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <TrendingUp className="text-purple-400" size={28} />
          <h2 className="text-3xl font-bold text-white">Trending This Week</h2>
        </div>
        <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/20 bg-transparent hover:text-white w-fit">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}


interface Movie {
  id: string
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
}

export function PopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=902448fc43a38ed08a67a10ce457b573&include_adult=false&page=1",
        )
        const data = await response.json()
        setMovies(data.results?.slice(0, 6) || [])
      } catch (error) {
        console.error("Error fetching popular movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularMovies()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        </div>
      </div>
    )
  }

  return (
    <section className="container max-w-7xl mx-auto px-4 py-12">
      <div className="flex sm:items-center flex-col sm:flex-row sm:flex-wrap justify-between mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <Flame className="text-orange-400" size={28} />
          <h2 className="text-3xl font-bold text-white">Popular Movies</h2>
        </div>
        <Button variant="outline" className="border-orange-500 text-orange-300 hover:bg-orange-500/20 bg-transparent hover:text-white w-fit">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}


interface Movie {
  id: string
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
}

export function TopRatedMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=902448fc43a38ed08a67a10ce457b573&include_adult=false&page=1",
        )
        const data = await response.json()
        setMovies(data.results?.slice(0, 6) || [])
      } catch (error) {
        console.error("Error fetching top rated movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopRatedMovies()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        </div>
      </div>
    )
  }

  return (
    <section className="container max-w-7xl mx-auto px-4 py-12">
      <div className="flex sm:items-center flex-col sm:flex-row sm:flex-wrap justify-between mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <Award className="text-yellow-400" size={28} />
          <h2 className="text-3xl font-bold text-white">Top Rated Movies</h2>
        </div>
        <Button variant="outline" className="border-yellow-500 text-yellow-300 hover:bg-yellow-500/20 bg-transparent hover:text-white w-fit">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}


interface Movie {
  id: string
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
}

export function UpcomingMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=902448fc43a38ed08a67a10ce457b573&include_adult=false&page=1",
        )
        const data = await response.json()
        setMovies(data.results?.slice(0, 6) || [])
      } catch (error) {
        console.error("Error fetching upcoming movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUpcomingMovies()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        </div>
      </div>
    )
  }

  return (
    <section className="container max-w-7xl mx-auto px-4 py-12">
      <div className="flex sm:items-center flex-col sm:flex-row sm:flex-wrap justify-between mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <Clock className="text-blue-400" size={28} />
          <h2 className="text-3xl font-bold text-white">Coming Soon</h2>
        </div>
        <Button variant="outline" className="border-blue-500 text-blue-300 hover:bg-blue-500/20 bg-transparent hover:text-white w-fit">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}


interface Genre {
  id: number;
  name: string;
}

const GenreCard = ({ id, name }: { id: number; name: string }) => {
  return (
    <Link href={`/movies?genre=${id}`}>
      <Card className="w-48 cursor-pointer rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-4 hover:scale-105 hover:border-purple-400 transition-all duration-300">
        <CardContent className="text-center p-2">
          <h3 className="text-white font-semibold text-sm">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export function GenreMarqueeSection() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=902448fc43a38ed08a67a10ce457b573&include_adult=false"
        );
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400" />
      </div>
    );
  }

  const half = Math.ceil(genres.length / 2);
  const firstRow = genres.slice(0, half);

  return (
    <section className="relative w-full py-12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Browse by Genre</h2>
        <p className="text-gray-300 text-lg">Discover movies by your favorite genres</p>
      </div>

      <div className="relative overflow-hidden">
        <Marquee pauseOnHover className="[--duration:25s]">
          {firstRow.map((genre) => (
            <GenreCard key={genre.id} {...genre} />
          ))}
        </Marquee>
      </div>
    </section>

  );
}





export function FeaturedSection() {
  return (
    <section className="container max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Why Choose MovieHub?</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Experience the ultimate movie discovery platform with cutting-edge features
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20 py-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-700/30 hover:brightness-110">
          <CardHeader>
            <Play className="text-purple-400 mb-2" size={32} />
            <CardTitle className="text-white">HD Trailers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">Watch high-quality trailers instantly for every movie</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/20 py-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-700/30 hover:brightness-110">
          <CardHeader>
            <Star className="text-yellow-400 mb-2" size={32} />
            <CardTitle className="text-white">Expert Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">Get detailed ratings and reviews from critics and users</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/20 py-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-emerald-700/30 hover:brightness-110">
          <CardHeader>
            <Users className="text-green-400 mb-2" size={32} />
            <CardTitle className="text-white">Community</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">Join millions of movie lovers sharing recommendations</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/20 py-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-red-700/30 hover:brightness-110">
          <CardHeader>
            <Zap className="text-orange-400 mb-2" size={32} />
            <CardTitle className="text-white ">Fast Search</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">Lightning-fast search with advanced filtering options</p>
          </CardContent>
        </Card>
      </div>
      <div className="text-center">
        <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/20 max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Explore?</h3>
            <p className="text-gray-300 mb-6">
              Join thousands of movie enthusiasts and discover your next favorite film
            </p>
            <Link href="/movies">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Start Exploring Movies
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
