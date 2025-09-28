"use client";

import { useEffect, useState } from "react";
import {
  getCategoryById,
  getProductsByCategory,
  getProductsByType,
} from "@/lib/firebase/firestore-app-data";
import { DealsOfTheDaySection } from "@/components/deals-of-the-day-section";
import { Header } from "@/components/header";
import { ChevronDown, ShoppingCart, Grid, List, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { showToast } from "@/components/ui/simple-toast";
import { useParams, useRouter } from "next/navigation";
import { Category, Product } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import Image from "next/image";

export default function ProductCategoryPage() {
  const params = useParams<{ category: string }>();
  const [categoryItem, setCategoryItem] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const [priceRange, setPriceRange] = useState([5000, 1000000]);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedExpiryRanges, setSelectedExpiryRanges] = useState<number[]>(
    []
  );

  const handleExpiryRangeChange = (range: number) => {
    setSelectedExpiryRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  useEffect(() => {
    async function fetchData() {
      const cat = await getCategoryById(params.category);
      if (!cat) {
        router.replace("/404");
        return;
      }
      setCategoryItem(cat);
      if (params.category === "dry-foods") {
        const prods = await getProductsByType("dry");
        setProducts(prods);
      } else if (params.category === "fresh-foods") {
        const prods = await getProductsByType("fresh");
        setProducts(prods);
      } else {
        const prods = await getProductsByCategory(params.category);
        setProducts(prods);
      }
    }
    fetchData();
  }, [params.category, router]);

  if (!categoryItem) {
    return null;
  }

  const categoryInfo = {
    name: categoryItem.name,
    icon: categoryItem.icon,
    description:
      categoryItem.productType === "fresh"
        ? "Đồ ăn tươi, cần dùng sớm"
        : "Thực phẩm khô, bảo quản lâu dài",
  };

  const expiryRanges = [
    { name: "Hôm nay (0-1 ngày)", count: 6, range: 0 }, // Hôm nay (0-1 ngày)
    { name: "3 ngày tới", count: 8, range: 1 }, // 3 ngày tới
    { name: "1 tuần tới", count: 12, range: 2 }, // 1 tuần tới
    { name: "1 tháng tới", count: 18, range: 3 }, // 1 tháng tới
    { name: "Trên 1 tháng", count: 25, range: 4 }, // Trên 1 tháng
  ];

  const itemsPerPage = 9;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Header Section */}
      <div className="mt-8 py-8 bg-[#d8f1e5] rounded-xl">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mt-2">
                <Link
                  href="/"
                  className="hover:text-green-600 transition-colors"
                >
                  Trang chủ
                </Link>
                {" > "}
                <span className="text-gray-900 font-bold">
                  {categoryInfo.name}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span>{categoryInfo.icon}</span>
            <p>{categoryInfo.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          {/* Left Side - Product List (Vertical) */}
          <div className="flex-1">
            {/* Product Listing Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                  Chúng tôi tìm thấy {products.length} sản phẩm cho bạn!
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                {/* Show Dropdown */}
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Hiển thị 10</option>
                    <option>Hiển thị 20</option>
                    <option>Hiển thị 50</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Sắp xếp theo: Nổi bật</option>
                    <option>Giá: Thấp đến cao</option>
                    <option>Giá: Cao đến thấp</option>
                    <option>Mới nhất</option>
                    <option>Bán chạy nhất</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-r-none border-r"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-l-none">
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product List - Grid Layout */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="relative">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={192} // Assuming h-48 is around 192px for a square image in grid
                      height={192} // Adjust as needed
                      className="w-full h-48 object-cover"
                    />
                    {/* Status Label */}
                    {parseInt(product.id.split("_")[1]) % 4 === 0 && (
                      <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                        Hot
                      </span>
                    )}
                    {parseInt(product.id.split("_")[1]) % 4 === 1 && (
                      <span className="absolute top-2 left-2 bg-blue-400 text-white text-xs px-2 py-1 rounded-full">
                        Sale
                      </span>
                    )}
                    {parseInt(product.id.split("_")[1]) % 4 === 2 && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                    {parseInt(product.id.split("_")[1]) % 4 === 3 && (
                      <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        Best
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="text-sm text-gray-500 mb-1">Hodo Foods</div>

                    <Link href={`/products/detail/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 h-12 overflow-hidden">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-2">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600">5.0</span>
                      <span className="text-sm text-gray-500">100g</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-3 h-10 overflow-hidden">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg font-bold text-green-600">
                        {product.default_price.unit_amount.toLocaleString()}đ
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice
                          ? product.originalPrice.toLocaleString()
                          : (
                              product.default_price.unit_amount * 1.1
                            ).toLocaleString()}
                        đ
                      </span>
                    </div>

                    {/* Action Buttons */}

                    {/* Add to Cart Button */}
                    <div className="flex items-center space-x-2">
                      <AddToCartButton
                        id={product.id}
                        name={product.name}
                        price={product.default_price.unit_amount}
                        imageUrl={product.images[0]}
                        className="flex-1 bg-green-600 hover:bg-green-700"
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
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>

          {/* Right Side - Filters */}
          <div className="w-full order-first md:w-80 md:order-last">
            {/* Price Filter */}
            <Card className="pt-0 mb-8">
              <CardHeader className="p-4 bg-[#dbfce7] text-[#00A63E]">
                <CardTitle className="text-lg font-bold">
                  Khoảng giá (VNĐ)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{priceRange[0].toLocaleString()}đ</span>
                    <span>{priceRange[1].toLocaleString()}đ</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="5000"
                      max="1000000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expiry Range Filter */}
            <Card className="pt-0 mb-8">
              <CardHeader className="p-4 bg-[#dbfce7] text-[#00A63E]">
                <CardTitle className="text-lg flex items-center gap-2 font-bold">
                  <Clock className="w-4 h-4" />
                  Hạn sử dụng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {expiryRanges.map((range) => (
                  <div
                    key={range.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={range.name}
                        checked={selectedExpiryRanges.includes(range.range)}
                        onChange={() => handleExpiryRangeChange(range.range)}
                        className="text-green-600"
                      />
                      <label htmlFor={range.name} className="text-sm">
                        {range.name}
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({range.count})
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Deals Of The Day Section */}
        <div className="mt-16">
          <DealsOfTheDaySection />
        </div>
      </div>
    </div>
  );
}
