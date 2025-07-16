import React from 'react'
import { FeaturedSection, GenreMarqueeSection, HeroSection, PopularMovies, TopRatedMovies, TrendingMovies, UpcomingMovies } from './home.client'

export default function page() {
  return (
    <div>
      <HeroSection />
      <TrendingMovies />
      <PopularMovies />
      <TopRatedMovies />
      <UpcomingMovies />
      <GenreMarqueeSection />
      <FeaturedSection />
    </div>
  )
}
