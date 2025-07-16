import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MovieHub - Discover Amazing Movies",
  description: "Discover, search, and explore movies with trailers, ratings, and detailed information.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        <Toaster position="top-center" richColors />
        <Navbar />
        <main className="flex-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
