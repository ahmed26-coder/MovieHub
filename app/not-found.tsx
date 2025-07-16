import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Film, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Film className="mx-auto text-purple-400 mb-4" size={80} />
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            Oops! The page you&#39;re looking for seems to have gone missing. It might have been moved, deleted, or you
            entered the wrong URL.
          </p>
        </div>

        <div className=" flex flex-col gap-4">
          <Link href="/">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Home className="mr-2" size={16} />
              Back to Home
            </Button>
          </Link>

          <Link href="/movies">
            <Button
              variant="outline"
              className="w-full border-purple-500 hover:text-white text-purple-300 hover:bg-purple-500/20 bg-transparent"
            >
              <Search className="mr-2" size={16} />
              Browse Movies
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
