"use client";

import { MockProduct, calculateAutoPrice } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { showToast } from "@/components/ui/simple-toast";
// import { AddToCartButton } from "@/components/add-to-cart-button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Star, Clock, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ProductCardProps {
  product: MockProduct;
  label?: "Hot" | "Sale" | "New";
  discount?: number;
  rating?: number;
  brand?: string;
  isDeal?: boolean; // Thêm prop để phân biệt deals
}

export function ProductCard({
  product,
  label,
  discount,
  rating,
  brand,
  isDeal = false,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(
    product.default_price.unit_amount
  );
  // Time constants and initial diffs
  const ONE_SECOND = 1000;
  const ONE_MINUTE = 60 * ONE_SECOND;
  const ONE_HOUR = 60 * ONE_MINUTE;
  const ONE_DAY = 24 * ONE_HOUR;
  const initialDiff = product.expiryDate
    ? Math.max(0, new Date(product.expiryDate).getTime() - Date.now())
    : 0;
  const [timeLeftMs, setTimeLeftMs] = useState<number>(initialDiff);
  const [daysLeft, setDaysLeft] = useState<number>(
    product.expiryDate ? Math.ceil(initialDiff / ONE_DAY) : 0
  );

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);
  };

  const formatTimeLeft = (ms: number) => {
    if (ms <= 0) return "Hết hạn";
    if (ms >= ONE_DAY) {
      const d = Math.ceil(ms / ONE_DAY);
      return d === 1 ? "1 ngày" : `${d} ngày`;
    }
    if (ms >= ONE_HOUR) {
      const h = Math.floor(ms / ONE_HOUR);
      return h === 1 ? "1 giờ" : `${h} giờ`;
    }
    if (ms >= ONE_MINUTE) {
      const m = Math.floor(ms / ONE_MINUTE);
      return m === 1 ? "1 phút" : `${m} phút`;
    }
    const s = Math.floor(ms / ONE_SECOND);
    return s === 1 ? "1 giây" : `${s} giây`;
  };

  // Calculate auto-pricing and time left (chỉ cho sản phẩm không phải deals)
  useEffect(() => {
    const updatePrice = () => {
      // Always update time left if có expiryDate (dù là deals hay không)
      if (product.expiryDate) {
        const diff = new Date(product.expiryDate).getTime() - Date.now();
        const clamped = Math.max(0, diff);
        setTimeLeftMs(clamped);
        setDaysLeft(Math.ceil(clamped / ONE_DAY));
      } else {
        setTimeLeftMs(0);
        setDaysLeft(0);
      }

      // Update price
      if (!isDeal && product.autoPricingEnabled && product.expiryDate) {
        const autoPrice = calculateAutoPrice(
          product.originalPrice,
          product.expiryDate,
          product.productType
        );
        setCurrentPrice(autoPrice);
      } else {
        // Cho deals hoặc khi auto-pricing tắt, sử dụng giá cố định
        setCurrentPrice(product.default_price.unit_amount);
      }
    };

    updatePrice();
    const interval = setInterval(updatePrice, 1000); // Cập nhật mỗi giây

    return () => clearInterval(interval);
  }, [product, isDeal]);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // const handleAddToCartLocal = () => {
  //   setIsInCart(!isInCart);
  // };

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
        {/* Product Image */}
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
              {!isDeal && product.expiryDate && (
                <span
                  className={`px-2 py-1 text-xs font-medium text-white rounded flex items-center gap-1 ${getExpiryBadgeColor()}`}
                >
                  {getExpiryIcon()}
                  {formatTimeLeft(timeLeftMs)}
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

          {/* Auto-Pricing badge (giữ nguyên) */}
          {!isDeal &&
            product.autoPricingEnabled &&
            currentPrice < product.originalPrice && (
              <div className="absolute top-2 right-2 z-20">
                <span className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded">
                  Auto-Pricing
                </span>
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
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>

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
            {/* Product Type Badge - chỉ hiển thị cho sản phẩm không phải deals */}
            {!isDeal && (
              <span
                className={`text-xs px-2 py-1 rounded ${
                  product.productType === "fresh"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {product.productType === "fresh" ? "Tươi" : "Khô"}
              </span>
            )}
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
        </div>
      </CardContent>
    </Card>
  );
}
