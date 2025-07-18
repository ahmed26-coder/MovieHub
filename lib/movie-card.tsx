import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, Users } from "lucide-react"

interface MovieCardProps {
  movie: {
    id: string
    title: string
    poster_path: string | null
    vote_average: number
    release_date: string
    genre_ids?: number[]
    genres?: { id: number; name: string }[]
    popularity?: number
  }
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg?height=750&width=500"

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Unknown"

  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.03] group rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={posterUrl}
              alt={movie.title}
              width={500}
              height={750}
              className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="absolute top-2 right-2 space-y-2 space-x-1">
              <Badge className="bg-black/70 text-white text-xs">
                <Star className="w-3 h-3 mr-1 text-yellow-400 fill-yellow-400" />
                {movie.vote_average.toFixed(1)}
              </Badge>
              <Badge className="bg-black/70 text-white text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {year}
              </Badge>
            </div>
          </div>

          <div className="p-4 space-y-2">
            <h3 className="text-white font-semibold text-base line-clamp-1 group-hover:text-purple-300 transition-colors">
              {movie.title}
            </h3>

            {movie.genres && (
              <div className="flex flex-wrap gap-1">
                {movie.genres.slice(0, 3).map((genre) => (
                  <Badge
                    key={genre.id}
                    className="bg-purple-900/40 text-purple-100 text-[10px] px-2 py-1 rounded-full"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            {movie.popularity && (
              <div className="flex items-center text-gray-400 text-xs mt-1">
                <Users className="w-3 h-3 mr-1" />
                {Math.floor(movie.popularity).toLocaleString()} members
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
