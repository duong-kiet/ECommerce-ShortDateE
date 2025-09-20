"use client";

import {
  Product,
  calculateAutoPrice,
  formatTimeProduct,
  formatPrice,
  ONE_DAY,
  ONE_MINUTE,
  calculateExpiryNowLeft,
  formatTimeLeft,
  formatCountdownTime,
} from "@/lib/data";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { showToast } from "@/components/ui/simple-toast";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  ShoppingCart,
  Star,
  Clock,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ProductCardProps {
  product: Product & { priceNow?: number; timeLeft?: number };
  label?: "Hot" | "Sale" | "New";
  discount?: number;
  rating?: number;
  brand?: string;
  isDeal?: boolean;
}

export function ProductCard({
  product,
  label,
  rating,
  brand,
  isDeal = false,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(
    product.priceNow || product.originalPrice
  );

  // Parse expiry once via formatTimeProduct and reuse
  const parsedExpiry = formatTimeProduct(product.expiryDate);
  const initialDiff = calculateExpiryNowLeft(parsedExpiry!, new Date());

  const [secondsLeft, setSecondsLeft] = useState<number>(initialDiff);
  const [daysLeft, setDaysLeft] = useState<number>(
    parsedExpiry ? Math.ceil(initialDiff / ONE_DAY) : 0
  );

  const [priceCountdown, setPriceCountdown] = useState<number>(0);

  const calculateDynamicPrice = () => {
    return calculateAutoPrice(
      product.originalPrice,
      product.expiryDate,
      product.factoryDate,
      product.default_price.unit_amount
    );
  };

  // Calculate auto-pricing and time left
  useEffect(() => {
    const updateTimeLeft = () => {
      const expiry = formatTimeProduct(product.expiryDate);
      if (expiry) {
        const diff = calculateExpiryNowLeft(expiry, new Date());
        const clamped = Math.max(0, diff);
        setSecondsLeft(clamped);
        setDaysLeft(Math.ceil(clamped / ONE_DAY));
      } else {
        setSecondsLeft(0);
        setDaysLeft(0);
      }
    };

    const updatePrice = () => {
      const newPrice = calculateDynamicPrice();
      setCurrentPrice(newPrice);
    };

    // Initial updates
    updateTimeLeft();
    updatePrice();

    // Set up intervals
    const timeInterval = setInterval(updateTimeLeft, 1000);

    // Price update interval dựa trên thời gian còn lại
    let priceInterval: NodeJS.Timeout | null = null;

    if (parsedExpiry) {
      const updatePriceAndInterval = () => {
        updatePrice();

        // Clear interval cũ và tạo interval mới với thời gian phù hợp
        if (priceInterval) clearInterval(priceInterval);

        const timeLeft = calculateExpiryNowLeft(parsedExpiry, new Date());

        if (timeLeft > 0) {
          const updateInterval = timeLeft > ONE_DAY ? ONE_DAY : ONE_MINUTE;
          priceInterval = setInterval(
            updatePriceAndInterval,
            updateInterval * 1000
          );

          setPriceCountdown(updateInterval);
        }
      };

      updatePriceAndInterval();
    }

    // Countdown interval cho price update
    const countdownInterval = setInterval(() => {
      setPriceCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timeInterval);
      if (priceInterval) clearInterval(priceInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const getExpiryBadgeColor = () => {
    if (daysLeft <= 0) return "bg-red-500";
    if (daysLeft <= 1) return "bg-orange-500";
    if (daysLeft <= 3) return "bg-yellow-500";
    if (daysLeft <= 7) return "bg-blue-500";
    return "bg-green-500";
  };

  const getExpiryIcon = () => {
    if (daysLeft <= 0) return <AlertTriangle className="w-3 h-3" />;
    return <Clock className="w-3 h-3" />;
  };

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {/* Ảnh sản phẩm */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Hàng badge góc trái: HSD trước, Label sau (nếu có) */}
          {(!!label || (!isDeal && product.expiryDate)) && (
            <div className="absolute top-2 left-2 z-20 flex items-center gap-2">
              {/* HSD: chỉ hiển thị khi không phải deal và có expiryDate */}
              {!isDeal && parsedExpiry && (
                <span
                  className={`px-2 py-1 text-xs font-medium text-white rounded flex items-center gap-1 ${getExpiryBadgeColor()}`}
                >
                  {getExpiryIcon()}
                  {formatTimeLeft(secondsLeft)}
                </span>
              )}

              {/* Label: nằm bên phải HSD nếu có, còn nếu không có HSD thì đứng một mình */}
              {label && (
                <span
                  className={`px-2 py-1 text-xs font-medium text-white rounded ${
                    label === "Hot"
                      ? "bg-red-500"
                      : label === "Sale"
                      ? "bg-orange-500"
                      : "bg-blue-500"
                  }`}
                >
                  {label}
                </span>
              )}
            </div>
          )}

          {/* Wishlist button (giữ nguyên, nằm trên cùng để không bị đè) */}
          <button
            onClick={handleWishlist}
            className="absolute bottom-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors z-30"
          >
            <Heart
              className={`w-5 h-5 ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <a
            href={`/products/detail/${product.id}`}
            className="font-semibold text-gray-900 mb-2 line-clamp-2 h-[50px] font-sans"
          >
            {product.name ?? "No name"}
          </a>

          {/* Rating and Brand */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">
                {rating ? `(${rating})` : "(4.0)"}
              </span>
            </div>
            {brand && <span className="text-xs text-gray-500">{brand}</span>}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-green-600">
                {formatPrice(currentPrice)}
              </span>
              {product.originalPrice &&
                currentPrice < product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <AddToCartButton
            id={product.id}
            name={product.name}
            price={currentPrice}
            imageUrl={product.images?.[0] ?? null}
            className="w-full bg-green-50 hover:bg-green-100 text-green-600 border border-green-200"
            size="sm"
            onClick={() =>
              showToast(`Đã thêm "${product.name}" vào giỏ`, {
                variant: "success",
              })
            }
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Thêm vào giỏ
          </AddToCartButton>

          {/* Real-time Countdown Timer */}
          <div className="mt-2 w-full">
            <div className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-red-50 border border-red-200 rounded">
              <Clock className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-600">
                {secondsLeft > 0
                  ? formatCountdownTime(secondsLeft)
                  : "Đã hết hạn"}
              </span>
            </div>
          </div>

          {/* Price update countdown */}
          <div className="mt-2 w-full">
            <div className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-blue-50 border border-blue-200 rounded">
              <RefreshCw className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600">
                {formatCountdownTime(priceCountdown)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
