"use client";

import { useState } from "react";
import { Product } from "@/lib/data";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronDown, Grid, List, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { showToast } from "./ui/simple-toast";
import { AddToCartButton } from "./add-to-cart-button";
import Image from "next/image";

interface FilterResultsProps {
  products: (Product & { priceNow?: number; timeLeft?: number })[];
  filterState: {
    selectedProductTypes: string[];
    selectedExpiryRanges: number[];
    selectedCategory?: string;
  };
}

export default function FilterResults({
  products,
  filterState,
}: FilterResultsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const itemsPerPageOptions = [9, 18, 36];
  const sortOptions = [
    { value: "featured", label: "Nổi bật" },
    { value: "price-low", label: "Giá: Thấp đến cao" },
    { value: "price-high", label: "Giá: Cao đến thấp" },
    { value: "newest", label: "Mới nhất" },
    { value: "bestselling", label: "Bán chạy nhất" },
  ];

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.default_price.unit_amount - b.default_price.unit_amount;
      case "price-high":
        return b.default_price.unit_amount - a.default_price.unit_amount;
      case "newest":
        return (
          new Date(b.factoryDate).getTime() - new Date(a.factoryDate).getTime()
        );
      case "bestselling":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  // Paginate products
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getFilterDescription = () => {
    const parts = [];

    if (filterState.selectedProductTypes.length > 0) {
      const types = filterState.selectedProductTypes.map((type) =>
        type === "dry" ? "Thực phẩm khô" : "Đồ ăn tươi"
      );
      parts.push(types.join(", "));
    }

    if (filterState.selectedExpiryRanges.length > 0) {
      const ranges = filterState.selectedExpiryRanges.map((range) => {
        switch (range) {
          case 0:
            return "Hôm nay";
          case 1:
            return "3 ngày tới";
          case 2:
            return "1 tuần tới";
          case 3:
            return "1 tháng tới";
          case 4:
            return "Trên 1 tháng";
          default:
            return range.toString();
        }
      });
      parts.push(`HSD: ${ranges.join(", ")}`);
    }

    return parts.length > 0 ? parts.join(" • ") : "Tất cả sản phẩm";
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 text-center">
        <div className="text-5xl sm:text-6xl mb-4">🔍</div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
          Không tìm thấy sản phẩm
        </h3>
        <p className="text-sm sm:text-base text-gray-500 mb-4">
          Không có sản phẩm nào phù hợp với bộ lọc của bạn.
        </p>
        <p className="text-xs sm:text-sm text-gray-400">
          Hãy thử điều chỉnh các tiêu chí lọc hoặc xóa bộ lọc để xem tất cả sản
          phẩm.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header Section */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
              Kết quả tìm kiếm
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              {getFilterDescription()}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              {products.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">sản phẩm</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div className="text-xs sm:text-sm text-gray-600">
            Hiển thị{" "}
            {Math.min((currentPage - 1) * itemsPerPage + 1, products.length)}-
            {Math.min(currentPage * itemsPerPage, products.length)} trong{" "}
            {products.length} sản phẩm
          </div>

          <div className="flex items-center flex-wrap gap-2 sm:space-x-4">
            {/* Items per page */}
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-7 text-xs sm:px-4 sm:py-2 sm:pr-8 sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    Hiển thị {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-7 text-xs sm:px-4 sm:py-2 sm:pr-8 sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sắp xếp theo: {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* View toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm" // Adjust size for mobile
                onClick={() => setViewMode("grid")}
                className="rounded-r-none border-r text-xs sm:size-sm"
              >
                <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm" // Adjust size for mobile
                onClick={() => setViewMode("list")}
                className="rounded-l-none text-xs sm:size-sm"
              >
                <List className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="p-4 sm:p-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="relative">
                  <Image
                    src={product.images[0] || "/placeholder-product.jpg"}
                    alt={product.name}
                    width={192}
                    height={192}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  {/* Status Label */}
                  {parseInt(product.id.split("_")[1] || "1") % 4 === 0 && (
                    <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                      Hot
                    </span>
                  )}
                  {parseInt(product.id.split("_")[1] || "1") % 4 === 1 && (
                    <span className="absolute top-2 left-2 bg-blue-400 text-white text-xs px-2 py-1 rounded-full">
                      Sale
                    </span>
                  )}
                  {parseInt(product.id.split("_")[1] || "1") % 4 === 2 && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                  {parseInt(product.id.split("_")[1] || "1") % 4 === 3 && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Best
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">
                    NestFood
                  </div>

                  <Link href={`/products/detail/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-1 h-auto line-clamp-2 hover:text-green-600 transition-colors text-base sm:text-lg">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-1 sm:mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            i < (product.rating || 5)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {product.rating || 5.0}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">
                      100g
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 h-auto line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-base sm:text-lg font-bold text-green-600">
                      {product.priceNow?.toLocaleString() ||
                        product.default_price.unit_amount.toLocaleString()}
                      đ
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()}đ
                      </span>
                    )}
                  </div>

                  {/* Expiry Date */}
                  <div className="text-xs text-gray-500 mb-2">
                    HSD:{" "}
                    {new Date(product.expiryDate).toLocaleDateString("vi-VN")}
                  </div>

                  {/* Add to Cart Button */}
                  <AddToCartButton
                    id={product.id}
                    name={product.name}
                    price={product.default_price.unit_amount}
                    imageUrl={product.images[0]}
                    className="w-full bg-green-600 hover:bg-green-700 sm:w-auto"
                    size="sm"
                    onClick={() =>
                      showToast(`Đã thêm "${product.name}" vào giỏ`, {
                        variant: "success",
                      })
                    }
                  >
                    <ShoppingCart className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2" />
                    Thêm vào giỏ
                  </AddToCartButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Image
                  src={product.images[0] || "/placeholder-product.jpg"}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1 text-base sm:text-lg truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                    <span className="text-base sm:text-lg font-bold text-green-600">
                      {product.priceNow?.toLocaleString() ||
                        product.default_price.unit_amount.toLocaleString()}
                      đ
                    </span>
                    <span className="text-xs text-gray-500">
                      HSD:{" "}
                      {new Date(product.expiryDate).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 w-full sm:w-auto mt-2 sm:mt-0"
                >
                  Thêm vào giỏ
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 sm:mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
