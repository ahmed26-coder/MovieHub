import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Film, Users, Star, Zap, Globe, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-6">About MovieHub</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Your ultimate destination for discovering, exploring, and enjoying the world of cinema. We bring you the
          latest movies, detailed information, trailers, and much more.
        </p>
      </div>
      <div className="mb-16">
        <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/20 py-5">
          <CardHeader>
            <CardTitle className="text-3xl text-white flex items-center gap-3">
              <Heart className="text-red-500" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-lg leading-relaxed">
              At MovieHub, we believe that great movies have the power to inspire, entertain, and bring people together.
              Our mission is to create the most comprehensive and user-friendly platform for movie enthusiasts to
              discover their next favorite film, explore detailed information, watch trailers, and connect with the
              global cinema community.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 py-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-red-700/30 hover:brightness-110">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Film className="text-purple-400" />
              Vast Movie Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Access thousands of movies from different genres, eras, and countries. From blockbusters to indie gems.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-red-700/30 hover:brightness-110 py-5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Star className="text-yellow-400" />
              Detailed Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Get comprehensive details including cast, crew, ratings, reviews, and behind-the-scenes information.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-red-700/30 hover:brightness-110 py-5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Zap className="text-green-400" />
              Instant Trailers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Watch high-quality trailers instantly to get a preview of what to expect from each movie.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-red-700/30 hover:brightness-110 py-5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Users className="text-blue-400" />
              Community Driven
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Join a community of movie lovers sharing reviews, recommendations, and discussions.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-red-700/30 hover:brightness-110 py-5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Globe className="text-cyan-400" />
              Global Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Discover movies from around the world with support for multiple languages and regions.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-red-700/30 hover:brightness-110 py-5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Film className="text-orange-400" />
              Advanced Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Find exactly what you&#39;re looking for with powerful search and filtering capabilities.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-400 mb-2">500K+</div>
          <div className="text-gray-300">Movies</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-400 mb-2">1M+</div>
          <div className="text-gray-300">Users</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-green-400 mb-2">50+</div>
          <div className="text-gray-300">Countries</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
          <div className="text-gray-300">Support</div>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/20 py-5">
        <CardHeader>
          <CardTitle className="text-3xl text-white">Powered by TMDB</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            MovieHub is powered by The Movie Database (TMDB), one of the most comprehensive and reliable sources of
            movie information available. This ensures that you always have access to the most up-to-date and accurate
            movie data.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Real-time Data</Badge>
            <Badge variant="secondary">High-Quality Images</Badge>
            <Badge variant="secondary">Comprehensive Database</Badge>
            <Badge variant="secondary">Regular Updates</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
