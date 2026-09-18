import { readFileSync } from "fs"
import { join } from "path"

interface Movie {
  id: string
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
  adult: boolean
}

interface Genre {
  id: number
  name: string
}

// Helper function to read static data from filesystem
function getStaticData<T>(filename: string): T | null {
  try {
    const filePath = join(process.cwd(), 'public', 'data', `${filename}.json`)
    const fileContent = readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent) as T
  } catch (error) {
    console.error(`Error loading ${filename}:`, error)
    return null
  }
}

export function StaticGenres() {
  const data = getStaticData<{ genres: Genre[] }>('genres')
  return data?.genres || []
}

export function StaticMovies() {
  const data = getStaticData<{ results: Movie[] }>('popular')
  const movies = (data?.results || []).filter((movie: Movie) => movie.adult === false)
  return movies
}
