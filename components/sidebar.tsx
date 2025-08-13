"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Clock, TrendingDown, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface SidebarProps {
  selectedCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
  onFilterChange?: (filters: any) => void;
}

export function Sidebar({
  selectedCategory,
  onCategoryChange,
  onFilterChange,
}: SidebarProps) {
  const [priceRange, setPriceRange] = useState([5000, 100000]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(
    []
  );
  const [selectedExpiryRanges, setSelectedExpiryRanges] = useState<string[]>(
    []
  );

  const categories = [
    {
      id: "dry-foods",
      name: "Thực phẩm khô",
      icon: "🥫",
      count: 8,
      type: "dry",
    },
    {
      id: "fresh-foods",
      name: "Đồ ăn tươi",
      icon: "🥗",
      count: 6,
      type: "fresh",
    },
    {
      id: "instant-noodles",
      name: "Mì gói & Mì ăn liền",
      icon: "🍜",
      count: 4,
      type: "dry",
    },
    {
      id: "canned-foods",
      name: "Đồ hộp (cá hộp, thịt hộp, rau củ hộp)",
      icon: "🥫",
      count: 5,
      type: "dry",
    },
    {
      id: "beverages",
      name: "Nước giải khát (nước ngọt, nước tăng lực, trà đóng chai)",
      icon: "🥤",
      count: 6,
      type: "dry",
    },
    {
      id: "dairy-products",
      name: "Sữa & Sản phẩm từ sữa (sữa bột, sữa tươi đóng hộp)",
      icon: "🥛",
      count: 1,
      type: "dry",
    },
    {
      id: "snacks",
      name: "Bánh kẹo (bánh quy, kẹo, chocolate)",
      icon: "🍪",
      count: 4,
      type: "dry",
    },
    {
      id: "condiments",
      name: "Gia vị & Nước chấm (muối, tiêu, nước mắm, dầu ăn)",
      icon: "🧂",
      count: 3,
      type: "dry",
    },
    {
      id: "cereals",
      name: "Ngũ cốc & Hạt (gạo, yến mạch, hạt dinh dưỡng)",
      icon: "🌾",
      count: 3,
      type: "dry",
    },
    {
      id: "ready-meals",
      name: "Cơm hộp & Bữa ăn sẵn (cơm gà, cơm thịt, salad hộp)",
      icon: "🍱",
      count: 4,
      type: "fresh",
    },
    {
      id: "sandwiches",
      name: "Sandwich & Bánh mì kẹp",
      icon: "🥪",
      count: 3,
      type: "fresh",
    },
    {
      id: "sushi",
      name: "Sushi & Đồ ăn Nhật",
      icon: "🍣",
      count: 3,
      type: "fresh",
    },
    {
      id: "cooked-foods",
      name: "Món nấu sẵn (từ bếp trung tâm: canh, súp, thịt nướng, rau củ hấp)",
      icon: "🍲",
      count: 4,
      type: "fresh",
    },
    {
      id: "convenience-foods",
      name: "Đồ ăn từ cửa hàng tiện lợi (bánh mì tươi, yogurt tươi, trái cây cắt sẵn)",
      icon: "🏪",
      count: 0,
      type: "fresh",
    },
  ];

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
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Danh mục</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-64 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400">
            <div className="space-y-1 p-3">
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
                    <span className="font-medium text-sm text-gray-700">
                      {category.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
                        category.type === "fresh"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {category.type === "fresh" ? "Tươi" : "Khô"}
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full min-w-[24px] text-center">
                      {category.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Khoảng giá (VNĐ)</CardTitle>
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
                min="0"
                max="200000"
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
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Loại sản phẩm</CardTitle>
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
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
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
            <TrendingDown className="w-4 h-4 text-red-500" />
            Giảm giá tự động
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
