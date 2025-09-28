"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBanner } from "@/components/hero-banner";
import { AutoPricingSystemContent } from "@/components/auto-pricing-system-content"; // Import the new component

export function HeroPricingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  // Slide 1: Hero Banner
  const renderHeroBannerSlide = () => {
    return (
      <div className="w-full">
        <HeroBanner />
      </div>
    );
  };

  // Slide 2: Auto Pricing System
  const renderAutoPricingSlide = () => {
    return (
      // Sử dụng component AutoPricingSystemContent mới
      <AutoPricingSystemContent />
    );
  };

  return (
    <section className="py-6 sm:py-8 lg:py-10 px-2 sm:px-4 lg:px-8 mb-8">
      {/* Mobile-specific layout: Stacks HeroBanner and AutoPricingSystemContent */}
      <div className="flex flex-col gap-4 sm:gap-6 lg:hidden max-w-6xl mx-auto">
        <HeroBanner />
        <AutoPricingSystemContent /> {/* Sử dụng component mới ở đây */}
      </div>

      {/* Desktop-specific layout: Carousel */}
      <div className="relative hidden lg:block">
        {/* Slides */}
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <div className="w-full flex-shrink-0">
              {renderHeroBannerSlide()}
            </div>
            <div className="w-full flex-shrink-0">
              {renderAutoPricingSlide()}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg z-10"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg z-10"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
}
