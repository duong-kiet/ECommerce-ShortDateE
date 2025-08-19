"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Clock, TrendingDown, ShoppingCart, Flame } from "lucide-react";
import { getCategories } from "@/lib/firebase/firestore-app-data";
import Link from "next/link";
import { removeParentheses } from "@/lib/utils";
import { Category } from "@/lib/data";
import { useState, useEffect } from "react";
import Image from "next/image";

interface SidebarProps {
  selectedCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
  onFilterChange?: (filters: any) => void;
}

export default function Sidebar({
  selectedCategory,
  onCategoryChange,
  onFilterChange,
}: SidebarProps) {
  const [priceRange, setPriceRange] = useState([5000, 1000000]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(
    []
  );
  const [selectedExpiryRanges, setSelectedExpiryRanges] = useState<string[]>(
    []
  );
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const productTypes = [
    { name: "Thực phẩm khô", count: 23, type: "dry" },
    { name: "Đồ ăn tươi", count: 11, type: "fresh" },
  ];

  const expiryRanges = [
    { name: "Hôm nay (0-1 ngày)", count: 6, range: "today" },
    { name: "3 ngày tới", count: 8, range: "3days" },
    { name: "1 tuần tới", count: 12, range: "1week" },
    { name: "1 tháng tới", count: 18, range: "1month" },
    { name: "Trên 1 tháng", count: 25, range: "over1month" },
  ];

  const autoPricingProducts = [
    {
      id: "prod_1",
      name: "Mì gói 3 Miền",
      price: 3000,
      originalPrice: 5000,
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=100&h=100&fit=crop",
      daysLeft: 2,
    },
    {
      id: "prod_2",
      name: "Cơm hộp gà nướng",
      price: 25000,
      originalPrice: 45000,
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop",
      daysLeft: 1,
    },
  ];

  const handleProductTypeChange = (type: string) => {
    setSelectedProductTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleExpiryRangeChange = (range: string) => {
    setSelectedExpiryRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleFilter = () => {
    onFilterChange?.({
      priceRange,
      selectedProductTypes,
      selectedExpiryRanges,
    });
  };

  return (
    <div className="space-y-6 w-full">
      {/* Auto-Pricing Banner */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-600">
              Auto-Pricing
            </span>
          </div>
          <p className="text-xs text-gray-600">
            Giá tự động giảm theo thời gian thực
          </p>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="pt-0">
        <CardHeader className="p-4 border-b border-gray-200 bg-[#dbfce7] text-[#00A63E]">
          <CardTitle className="text-lg font-bold">Danh mục chi tiết</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-64 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400">
            <div className="space-y-2 p-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange?.(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-green-50 border border-green-200 shadow-sm"
                      : "hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <span className="text-xl flex-shrink-0">
                      {category.icon}
                    </span>
                    <span className="font-medium text-sm text-gray-700 text-left truncate max-w-[90px]">
                      {removeParentheses(category.name)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
                        category.productType === "fresh"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {category.productType === "fresh" ? "Tươi" : "Khô"}
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full min-w-[24px] text-center">
                      {category.productCount}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Filter */}
      <Card className="pt-0">
        <CardHeader className="p-4 bg-[#dbfce7] text-[#00A63E]">
          <CardTitle className="text-lg font-bold">Khoảng giá (VNĐ)</CardTitle>
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

      {/* Product Type Filter */}
      <Card className="pt-0">
        <CardHeader className="p-4 bg-[#dbfce7] text-[#00A63E]">
          <CardTitle className="text-lg font-bold">Loại sản phẩm</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {productTypes.map((type) => (
            <div key={type.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={type.name}
                  checked={selectedProductTypes.includes(type.type)}
                  onChange={() => handleProductTypeChange(type.type)}
                  className="text-green-600"
                />
                <label htmlFor={type.name} className="text-sm">
                  {type.name}
                </label>
              </div>
              <span className="text-sm text-gray-500">({type.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Expiry Range Filter */}
      <Card className="pt-0">
        <CardHeader className="p-4 bg-[#dbfce7] text-[#00A63E]">
          <CardTitle className="text-lg flex items-center gap-2 font-bold">
            <Clock className="w-4 h-4" />
            Hạn sử dụng
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {expiryRanges.map((range) => (
            <div key={range.name} className="flex items-center justify-between">
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
              <span className="text-sm text-gray-500">({range.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Filter Button */}
      <Button
        onClick={handleFilter}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        <Filter className="w-4 h-4 mr-2" />
        Lọc sản phẩm
      </Button>

      {/* Auto-Pricing Products */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Flame className="w-6 h-6 text-red-500" />
            Siêu Hot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {autoPricingProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center space-x-3 p-2 bg-red-50 rounded-lg"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-red-600 font-medium">
                    {product.price.toLocaleString()}đ
                  </p>
                  <p className="text-xs text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()}đ
                  </p>
                </div>
                <p className="text-xs text-red-600 font-medium">
                  Còn {product.daysLeft} ngày
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
