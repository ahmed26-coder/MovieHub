// app/movies/page.ts
import { Suspense } from "react"
import { SearchAndFilters, MoviesGrid } from "@/components/layouts/movies/movies.client"

export default function MoviesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense
        fallback={
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
          </div>
        }
      >
        <SearchAndFilters />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
          </div>
        }
      >
        <MoviesGrid />
      </Suspense>
    </div>
  )
}