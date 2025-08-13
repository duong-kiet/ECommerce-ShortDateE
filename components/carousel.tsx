"use client";

import { MockProduct } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CarouselProps {
  products: MockProduct[];
}

export function Carousel({ products }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const currentProduct = products[currentIndex];
  const price = currentProduct.default_price;

  return (
    <div className="relative mx-auto max-w-4xl">
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-64 md:h-96">
            <Image
              alt={currentProduct.name}
              className="object-cover"
              fill
              src={currentProduct.images[0]}
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold md:text-4xl">
                  {currentProduct.name}
                </h2>
                <p className="mt-2 text-lg md:text-xl">
                  ${(price.unit_amount / 100).toFixed(2)}{" "}
                  {price.currency.toUpperCase()}
                </p>
                <Button asChild className="mt-4">
                  <Link href={`/products/${currentProduct.id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-center">{currentProduct.name}</CardTitle>
          <p className="mt-2 text-center text-muted-foreground">
            {currentProduct.description}
          </p>
        </CardContent>
      </Card>

      <Button
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
        size="icon"
        variant="secondary"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
        size="icon"
        variant="secondary"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="mt-4 flex justify-center space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-primary" : "bg-muted"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
