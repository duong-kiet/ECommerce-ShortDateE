"use client";

import { getCategories } from "@/lib/mock-data";
import Link from "next/link";

export function CategoryGrid() {
  const categories = getCategories();

  // Lọc ra 2 phân khúc chính và các danh mục con
  const mainCategories = categories.filter(
    (cat) => cat.id === "dry-foods" || cat.id === "fresh-foods"
  );
  const subCategories = categories.filter(
    (cat) => cat.id !== "dry-foods" && cat.id !== "fresh-foods"
  );

  return (
    <section className="py-8 w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Phân khúc sản phẩm
        </h2>
        <p className="text-gray-600">
          Chọn phân khúc phù hợp với nhu cầu của bạn
        </p>
      </div>

      {/* 2 phân khúc chính */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {mainCategories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="group relative overflow-hidden bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {category.id === "dry-foods"
                    ? "Thực phẩm đóng gói, HSD 15-90 ngày"
                    : "Đồ ăn tươi, HSD 0-1 ngày"}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {category.productCount} sản phẩm
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Auto-Pricing
                  </span>
                </div>
              </div>
              <div className="text-2xl text-gray-300 group-hover:text-gray-400 transition-colors">
                →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Danh mục con */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Danh mục chi tiết
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {subCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="group flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h4 className="text-sm font-medium text-gray-900 text-center line-clamp-2">
                {category.name}
              </h4>
              <span className="text-xs text-gray-500 mt-1">
                ({category.productCount})
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full mt-1 ${
                  category.productType === "fresh"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {category.productType === "fresh" ? "Tươi" : "Khô"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
