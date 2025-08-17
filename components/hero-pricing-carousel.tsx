"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBanner } from "@/components/hero-banner";

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
      <section className="bg-gradient-to-r from-orange-50 to-red-50 pt-10 pb-[74px] px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <TrendingDown className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Auto-Pricing System
              </h2>
            </div>
            <p className="text-lg text-gray-600">
              Hệ thống tự động giảm giá theo thời gian thực dựa trên hạn sử dụng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Thực phẩm khô */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🥫</span>
                <h3 className="text-lg font-semibold text-gray-900">
                  Thực phẩm khô
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">HSD 15-90 ngày</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>≤ 7 ngày:</span>
                    <span className="font-medium text-red-600">-50%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>≤ 15 ngày:</span>
                    <span className="font-medium text-orange-600">-30%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>≤ 30 ngày:</span>
                    <span className="font-medium text-yellow-600">-15%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>≤ 60 ngày:</span>
                    <span className="font-medium text-blue-600">-10%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Đồ ăn tươi */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🥗</span>
                <h3 className="text-lg font-semibold text-gray-900">
                  Đồ ăn tươi
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-600">HSD 0-1 ngày</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Hôm nay:</span>
                    <span className="font-medium text-red-600">-80%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>≤ 3 ngày:</span>
                    <span className="font-medium text-orange-600">-60%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>≤ 7 ngày:</span>
                    <span className="font-medium text-yellow-600">-40%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>≤ 14 ngày:</span>
                    <span className="font-medium text-blue-600">-20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              💡 Giá được cập nhật tự động mỗi phút. Càng gần ngày hết hạn, giá
              càng giảm mạnh!
            </p>
          </div>
        </div>
      </section>
    );
  };

  return (
    <section className="relative -mx-4 lg:-mx-8 mb-8 overflow-hidden">
      {/* Main Carousel Container */}
      <div className="relative">
        {/* Slides */}
        <div className="overflow-hidden">
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
