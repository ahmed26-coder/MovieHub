"use client"

import type React from "react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Film, Menu, Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { navLinks } from "@/constent"

interface Movie {
  id: string
  title: string
  poster_path: string | null
}
interface movie {
    id: string
    title: string
    poster_path: string | null
    vote_average: number
    release_date: string
    genre_ids?: number[]
    genres?: { id: number; name: string }[]
    popularity?: number
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [hasShadow, setHasShadow] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const fetchSearchResults = async (query: string) => {
    if (query.trim() === "") {
      setSearchResults([])
      setIsDropdownOpen(false)
      return
    }
    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "902448fc43a38ed08a67a10ce457b573"
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query.trim())}&api_key=${apiKey}`
      )
      if (!response.ok) {
        console.error(`TMDB API error: ${response.status} ${response.statusText}`)
        const mockResults = [
          { id: "1", title: "The Matrix", poster_path: "/images/matrix.jpg" },
          { id: "2", title: "Inception", poster_path: "/images/inception.jpg" },
          { id: "3", title: "Interstellar", poster_path: "/images/interstellar.jpg" },
        ].filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
        setSearchResults(mockResults)
        setIsDropdownOpen(true)
        return
      }
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        console.error("TMDB response is not JSON")
        setSearchResults([])
        setIsDropdownOpen(false)
        return
      }
      const data = await response.json()
      const results = data.results
        ? data.results.map((movie: movie) => ({
            id: movie.id.toString(),
            title: movie.title,
            poster_path: movie.poster_path
              ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
              : null,
          }))
        : []
      setSearchResults(results)
      setIsDropdownOpen(true)
    } catch (error) {
      console.error("Error fetching TMDB search results:", error)
      const mockResults = [
        { id: "1", title: "The Matrix", poster_path: "/images/matrix.jpg" },
        { id: "2", title: "Inception", poster_path: "/images/inception.jpg" },
        { id: "3", title: "Interstellar", poster_path: "/images/interstellar.jpg" },
      ].filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
      setSearchResults(mockResults)
      setIsDropdownOpen(true)
    }
  }

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }
    debounceTimeoutRef.current = setTimeout(() => {
      fetchSearchResults(searchQuery)
    }, 300)
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50)
      setPrevScrollPos(currentScrollPos)
      setHasShadow(currentScrollPos > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  const handleMovieSelect = (movieId: string) => {
    setSearchQuery("")
    setSearchResults([])
    setIsDropdownOpen(false)
    setIsMenuOpen(false)
    router.push(`/movies/${movieId}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchSearchResults(searchQuery)
  }
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${hasShadow ? "shadow-md" : ""} bg-slate-900/95 backdrop-blur-sm border-b border-slate-800`}
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Film className="text-purple-400" size={28} />
            <span className="text-xl font-bold text-white">MovieHub</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="hidden lg:flex items-center space-x-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-slate-800 border-slate-700 text-white pl-10"
                  aria-autocomplete="list"
                  aria-controls="search-results"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <Button type="submit" size="sm" className="bg-purple-600 hover:bg-purple-700">
                Search
              </Button>
            </form>
            {isDropdownOpen && searchResults.length > 0 && (
              <div
                id="search-results"
                className="absolute hidden lg:block top-full left-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-[100] max-h-80 overflow-y-auto"
              >
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white cursor-pointer"
                    onClick={() => handleMovieSelect(movie.id)}
                    role="option"
                    aria-selected="false"
                  >
                    {movie.poster_path ? (
                      <Image
                        src={movie.poster_path}
                        alt={`${movie.title} poster`}
                        height={1000}
                        width={1000}
                        priority
                        className="w-12 h-18 object-cover rounded mr-3"
                      />
                    ) : (
                      <div className="w-12 h-18 bg-slate-700 rounded mr-3 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                    <span className="truncate">{movie.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden border p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800">
            <div className="space-y-4 mx-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="relative" ref={searchRef}>
                <form onSubmit={handleSearch} className="flex items-center space-x-2 pt-4">
                  <Input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-slate-800 border-slate-700 text-white"
                    aria-autocomplete="list"
                    aria-controls="search-results-mobile"
                  />
                  <Button type="submit" size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Search size={16} />
                  </Button>
                </form>
                {isDropdownOpen && searchResults.length > 0 && (
                  <div
                    id="search-results-mobile"
                    className="absolute lg:hidden top-full left-0 mt-2 w-full bg-slate-800 border border-slate-700 rounded-md shadow-lg z-[100] max-h-80 overflow-y-auto"
                  >
                    {searchResults.map((movie) => (
                      <div
                        key={movie.id}
                        className="flex items-center px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white cursor-pointer"
                        onClick={() => handleMovieSelect(movie.id)}
                        role="option"
                        aria-selected="false"
                      >
                        {movie.poster_path ? (
                          <Image
                            src={movie.poster_path}
                            alt={`${movie.title} poster`}
                            height={1000}
                            width={1000}
                            priority
                            className="w-12 h-18 object-cover rounded mr-3"
                          />
                        ) : (
                          <div className="w-12 h-18 bg-slate-700 rounded mr-3 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                          </div>
                        )}
                        <span className="truncate">{movie.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}