import { MovieDetails, MovieTrailer, SimilarMovies } from "@/components/layouts/movies/moviesid.client"
import { MovieCast } from "@/lib/movie-cast"

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