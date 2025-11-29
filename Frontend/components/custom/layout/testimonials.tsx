"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/utils/constants";
import { Star } from "lucide-react";
import Image from "next/image";

const Tesimonials = () => {
  return (
    <section id="testimonials">
      <div className="flex flex-col justify-center items-center gap-4 pb-8">
        <h2 className="text-4xl font-semibold">
          Check out what our users has to say about
        </h2>
        <p className="text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Task Master
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-7xl mx-auto my-10"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="w-full h-full p-4">
                  <CardHeader className="p-0">
                    <div className="flex items-start">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          fill={i < testimonial.rating ? "yellow" : "gray"}
                          stroke="gray"
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col items-start justify-center p-0">
                    <span className="text-base font-light py-4">
                      “{testimonial.quote}”
                    </span>
                  </CardContent>
                  <CardFooter className="p-0">
                    <div className="flex flex-row justify-start items-center gap-4">
                      <Image
                        src={testimonial.imageUrl}
                        width={24}
                        height={24}
                        className="w-12 h-12 rounded-full"
                        alt={testimonial.userName}
                      />
                      <div className="flex flex-col justify-start items-start gap-0">
                        <p className="text-lg font-medium">
                          {testimonial.userName}
                        </p>
                        <p className="flex justify-center items-center gap-2">
                          <span className="text-xs bg-purple-600 rounded-full px-2">
                            {testimonial.role}
                          </span>
                          <span className="text-xs bg-pink-600 rounded-full px-2">
                            {testimonial.company}
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default Tesimonials;
