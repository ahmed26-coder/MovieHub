import { MovieDetails, MovieTrailer, SimilarMovies } from "@/components/layouts/movies/moviesid.server"
import { MovieCast } from "@/lib/movie-cast"
import { readFileSync } from "fs"
import { join } from "path"

// Define PageProps with params as a Promise
type PageProps = {
  params: Promise<{ id: string }>
}

// Make the function async to handle the Promise
export default async function MoviePage({ params }: PageProps) {
  // Await the params to resolve the id
  const { id } = await params

  return (
    <div className="space-y-6">
      <MovieDetails movieId={id} />
      <MovieTrailer movieId={id} />
      <MovieCast movieId={id} />
      <SimilarMovies movieId={id} />
    </div>
  )
}

// Generate static params for popular movies
export function generateStaticParams() {
  try {
    const filePath = join(process.cwd(), 'public', 'data', 'movie-ids.json')
    const fileContent = readFileSync(filePath, 'utf-8')
    const movieIds = JSON.parse(fileContent)
    return movieIds.slice(0, 50).map((id: string) => ({
      id: id
    }))
  } catch (error) {
    console.error('Error loading movie IDs:', error)
    return []
  }
}