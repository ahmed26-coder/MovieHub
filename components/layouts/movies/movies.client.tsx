"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import { MovieCard } from "@/lib/movie-card"

interface Genre {
  id: number
  name: string
}

export function SearchAndFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get("genre") || "all")
  const [selectedYear, setSelectedYear] = useState(searchParams.get("year") || "all")
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "popularity.desc")
  const [genres, setGenres] = useState<Genre[]>([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=902448fc43a38ed08a67a10ce457b573"
        )
        const data = await res.json()
        setGenres(data.genres || [])
      } catch (err) {
        console.error("Error fetching genres:", err)
      }
    }
    fetchGenres()
  }, [])

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    if (selectedGenre !== "all") params.set("genre", selectedGenre)
    if (selectedYear !== "all") params.set("year", selectedYear)
    if (sortBy !== "popularity.desc") params.set("sortBy", sortBy)
    router.push("/movies?" + params.toString())
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedGenre("all")
    setSelectedYear("all")
    setSortBy("popularity.desc")
    router.push("/movies")
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString())

  return (
    <div className="relative space-y-6 container max-w-7xl mx-auto mb-10">
      <Card className="bg-slate-800/50 border-slate-700 shadow-lg rounded-xl">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 relative min-w-[200px]">
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                className="bg-slate-700 border-slate-600 text-white pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <Button onClick={applyFilters} className="bg-purple-600 hover:bg-purple-700 text-white hover:text-white">
              Search
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-slate-600 text-black hover:text-white hover:bg-slate-700"
            >
              <Filter className="mr-2" size={16} /> Filters
            </Button>
          </div>
        </CardContent>
      </Card>
      {showFilters && (
        <div className="absolute top-full right-0 w-[330px] z-50 mt-4">
          <Card className="bg-slate-800/90 border border-slate-700 rounded-xl shadow-xl animate-fade-in">
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm text-gray-300 block mb-2">Genre</label>
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="All Genres" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600 text-white">
                      <SelectItem value="all">All Genres</SelectItem>
                      {genres.map((g) => (
                        <SelectItem key={g.id} value={g.id.toString()}>
                          {g.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-300 block mb-2">Year</label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600 text-white">
                      <SelectItem value="all">All Years</SelectItem>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-300 block mb-2">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600 text-white">
                      <SelectItem value="popularity.desc">Most Popular</SelectItem>
                      <SelectItem value="vote_average.desc">Highest Rated</SelectItem>
                      <SelectItem value="release_date.desc">Newest First</SelectItem>
                      <SelectItem value="release_date.asc">Oldest First</SelectItem>
                      <SelectItem value="title.asc">Title A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end gap-2">
                  <Button onClick={applyFilters} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Apply
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="border-slate-600 text-black hover:text-white hover:bg-slate-700"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>

  )
}


interface Movie {
  id: string
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
  adult: boolean
}

export function MoviesGrid() {
  const searchParams = useSearchParams()
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchMovies = useCallback(async (currentPage = 1) => {
    setLoading(true)
    try {
      const query = searchParams.get("search")
      const genre = searchParams.get("genre")
      const year = searchParams.get("year")
      const sort = searchParams.get("sortBy") || "popularity.desc"

      let url = ""

      if (query) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=902448fc43a38ed08a67a10ce457b573&query=${encodeURIComponent(query)}&page=${currentPage}&include_adult=false`
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=902448fc43a38ed08a67a10ce457b573&include_adult=false&page=${currentPage}&sort_by=${sort}`
        if (genre && genre !== "all") url += `&with_genres=${genre}`
        if (year && year !== "all") url += `&primary_release_year=${year}`
      }

      const res = await fetch(url)
      const data = await res.json()
      const filtered = (data.results || []).filter((movie: Movie) => movie.adult === false)

      if (currentPage === 1) setMovies(filtered)
      else setMovies((prev) => [...prev, ...filtered])

      setTotalPages(data.total_pages || 1)
    } catch (error) {
      console.error("Failed to fetch movies:", error)
    } finally {
      setLoading(false)
    }
  }, [searchParams])

  useEffect(() => {
    setPage(1)
    fetchMovies(1)
  }, [fetchMovies])

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchMovies(nextPage)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {movies.map((movie) =>
          movie.poster_path ? <MovieCard key={movie.id} movie={movie} /> : null
        )}
      </div>

      {loading && page === 1 && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
        </div>
      )}

      {!loading && movies.length === 0 && (
        <div className="text-center py-12 text-gray-300">No movies found.</div>
      )}

      {page < totalPages && (
        <div className="text-center">
          <Button onClick={loadMore} disabled={loading} className="bg-purple-600 hover:bg-purple-700 mt-8">
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  )
}