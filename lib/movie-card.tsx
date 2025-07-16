import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar } from "lucide-react"

interface MovieCardProps {
  movie: {
    id: string
    title: string
    poster_path: string | null
    vote_average: number
    release_date: string
    genre_ids?: number[]
  }
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg?height=750&width=500"

  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <Image
              src={posterUrl || "/placeholder.svg"}
              alt={movie.title}
              width={1000}
              height={1000}
              priority
              className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2">
              <Badge className="bg-black/70 text-white">
                <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
                {movie.vote_average.toFixed(1)}
              </Badge>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-white font-semibold mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors">
              {movie.title}
            </h3>
            <div className="flex items-center text-gray-400 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(movie.release_date).getFullYear()}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
