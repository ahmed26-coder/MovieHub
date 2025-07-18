"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { testimonials } from "@/constent"
import { Star } from "lucide-react"

export function TestimonialsCarousel() {
    return (
<section className="container mx-auto">
  <Carousel
    opts={{
      loop: true,
      align: "start",
      slidesToScroll: 1,
    }}
    dir="ltr"
    className="w-full xl:max-w-6xl mx-auto"
  >
    <CarouselContent className="">
      {testimonials.map((testimonial) => (
        <CarouselItem
          key={testimonial.id}
          className=" shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 transition-transform duration-500 ease-in-out"
        >
          <div className="p-1 h-full">
            <Card className="h-full w-[325px] md:w-[350px] lg:w-[300px] xl:w-full mx-auto rounded-xl border border-purple-800/40 bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-md hover:shadow-purple-700/30 transition-all">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="flex flex-col items-center space-y-3">
                  <div className="rounded-full bg-purple-800/30 p-1">
                    <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <p className="mt-4 text-center text-purple-200 text-sm leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>

                <div className="mt-6 border-t border-purple-700/30 pt-4 text-center space-y-1">
                  <h3 className="text-lg font-semibold text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-purple-300">{testimonial.position}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>

    <div className="flex justify-center mt-10 gap-3 items-center">
      <CarouselPrevious className="text-purple-500 hover:text-purple-800" />
      <CarouselNext className="text-purple-500 hover:text-purple-800" />
    </div>
  </Carousel>
</section>

    )
}
