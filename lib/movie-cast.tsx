"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface MovieCastProps {
  movieId: string
}

interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export function MovieCast({ movieId }: MovieCastProps) {
  const [cast, setCast] = useState<CastMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=902448fc43a38ed08a67a10ce457b573&include_adult=false`,
        )
        const data = await response.json()
        setCast(data.cast?.slice(0, 12) || [])
      } catch (error) {
        console.error("Error fetching cast:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCast()
  }, [movieId])

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
      </div>
    )
  }

  if (cast.length === 0) {
    return null
  }

  return (
    <div className="py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {cast.map((member) => {
          const profileUrl = member.profile_path
            ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
            : "/placeholder.svg?height=278&width=185"

          return (
            <Card
              key={member.id}
              className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors"
            >
              <CardContent className="p-0">
                <Image
                  src={profileUrl || "/placeholder.svg"}
                  alt={member.name}
                  width={1000}
                  priority
                  height={1000}
                  className="w-full h-75 object-cover rounded-t-lg"
                />
                <div className="p-3">
                  <h3 className="text-white font-medium text-sm line-clamp-1">{member.name}</h3>
                  <p className="text-gray-400 text-xs line-clamp-2">{member.character}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
