import { MoviesGrid, SearchAndFilters } from "./movies.client";

export default function MoviesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Discover Movies</h1>
        <p className="text-gray-300 text-lg">Explore thousands of movies with advanced search and filtering options</p>
      </div>
      <SearchAndFilters />
      <MoviesGrid />
    </div>
  )
}
