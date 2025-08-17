"use client";

import { Button } from "@/components/ui/button";
import {
  Heart,
  MapPin,
  Search,
  ShoppingCart,
  User,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";

export function Header() {
  const { items } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-4">
        {/* Top Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-green-600">Shoda</span>
              <span className="text-sm text-gray-600 block">Auto-Pricing</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm thực phẩm..."
                  className="w-full pl-10 pr-4 py-3 border-0 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Vị trí của bạn</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-red-600 hover:text-red-700"
            >
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm">Auto-Pricing</span>
            </Button>

            <Button variant="ghost" size="sm" className="relative">
              <Heart className="w-4 h-4" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4" />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              </Button>
            </Link>

            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Bottom Header - Navigation */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100">
          <nav className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              href="/category/dry-foods"
              className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              Thực phẩm khô
            </Link>
            <Link
              href="/category/fresh-foods"
              className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              Đồ ăn tươi
            </Link>
            <Link
              href="/deals"
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Giảm giá tự động
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              Về chúng tôi
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-500">Hotline: 0123456789</span>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>🕒</span>
              <span>Mở cửa: 7:00 - 22:00</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
