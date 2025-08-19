"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product , formatTimeProduct } from "@/lib/data";
import { getProducts } from "@/lib/firebase/firestore-app-data";

// Helper function to get time until expiry
function getTimeUntilExpiry(expiryDate: string): string {
  const now = new Date();
  const expiry = formatTimeProduct(expiryDate);

  const diffInHours = Math.ceil(
    (expiry!.getTime() - now.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours <= 0) return "Hết hạn";
  if (diffInHours <= 24) return `${diffInHours} giờ`;
  const days = Math.ceil(diffInHours / 24);
  return `${days} ngày`;
}

// Helper function to get urgency level
function getUrgencyLevel(expiryDate: string): "high" | "medium" | "low" {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffInHours = Math.ceil(
    (expiry.getTime() - now.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours <= 24) return "high";
  if (diffInHours <= 72) return "medium";
  return "low";
}

export function FoodCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await getProducts();
      setProducts(allProducts.slice(0, 4));
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!autoPlay || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Auto-play every 4 seconds

    return () => clearInterval(interval);
  }, [autoPlay, products.length]);

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

  if (products.length === 0) {
    return null;
  }

  const currentProduct = products[currentIndex];
  const currentPrice = currentProduct.default_price.unit_amount;
  const originalPrice = currentProduct.originalPrice;
  const timeUntilExpiry = getTimeUntilExpiry(currentProduct.expiryDate);
  const urgencyLevel = getUrgencyLevel(currentProduct.expiryDate);

  return (
    <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 -mx-4 lg:-mx-8 px-4 lg:px-8 mb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">🥗</div>
        <div className="absolute top-20 right-20 text-4xl">🍱</div>
        <div className="absolute bottom-10 left-20 text-5xl">🥪</div>
        <div className="absolute bottom-20 right-10 text-4xl">🍣</div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-full">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Thực phẩm tươi ngon giá tốt mỗi ngày
            </h2>
            <div className="p-2 bg-green-100 rounded-full">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-lg text-gray-600">
            Giá giảm tự động theo thời gian thực - Càng gần hết hạn, giá càng
            tốt!
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Card className="overflow-hidden shadow-xl border-0">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                {/* Product Image */}
                <div className="relative bg-white">
                  <Image
                    src={currentProduct.images[0]}
                    alt={currentProduct.name}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Urgency Indicator */}
                  <div className="absolute top-4 left-4">
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-lg font-medium ${
                        urgencyLevel === "high"
                          ? "bg-red-100 text-red-700"
                          : urgencyLevel === "medium"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      {timeUntilExpiry}
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-8 bg-white flex flex-col justify-center">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2"
                      >
                        {currentProduct.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed truncate">
                        {currentProduct.description}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-green-600">
                          {(currentPrice).toLocaleString("vi-VN")}đ
                        </span>
                        {originalPrice > currentPrice && (
                          <span className="text-lg text-gray-400 line-through">
                            {(originalPrice).toLocaleString("vi-VN")}đ
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        💡 Tiết kiệm:{" "}
                        {((originalPrice - currentPrice)).toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </div>
                    </div>

                    {/* Rating */}
                    {currentProduct.rating && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium">
                          {currentProduct.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                          (Đánh giá)
                        </span>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-4">
                      <Button
                        asChild
                        size="lg"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                      >
                        <Link href={`/products/detail/${currentProduct.id}`}>
                          Mua ngay - Giá tốt nhất!
                        </Link>
                      </Button>
                    </div>

                    {/* Auto-pricing Info */}
                    <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                      🤖 Giá được cập nhật tự động mỗi phút dựa trên hạn sử dụng
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={prevSlide}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={nextSlide}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {products.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-green-600 scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
            />
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            🔥 Đang hiển thị {currentIndex + 1} / {products.length} sản phẩm
            tươi ngon với giá ưu đãi
          </p>
        </div>
      </div>
    </section>
  );
}
