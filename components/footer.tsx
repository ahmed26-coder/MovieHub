import Link from "next/link"
import { Film } from "lucide-react"
import { categories, quickLinks, socials } from "@/constent"



export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Film className="text-purple-400" size={28} />
              <span className="text-xl font-bold text-white">MovieHub</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for discovering amazing movies, trailers, and detailed information.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="block text-gray-400 hover:text-white transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="block text-gray-400 hover:text-white transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-5 pt-5 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MovieHub. All rights reserved. Powered by TMDB.
          </p>
        </div>
      </div>
    </footer>
  )
}
