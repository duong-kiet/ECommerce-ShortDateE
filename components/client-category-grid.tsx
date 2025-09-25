"use client";

import { useState, useEffect } from "react";
import { getCategories } from "@/lib/firebase/firestore-app-data";
import Link from "next/link";
import { Category } from "@/lib/data";

export default function ClientCategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-6 sm:py-8 w-full">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Phân khúc sản phẩm
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Chọn phân khúc phù hợp với nhu cầu của bạn
          </p>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </section>
    );
  }

  const mainCategories = categories.filter(
    (cat) => cat.id === "dry-foods" || cat.id === "fresh-foods"
  );
  const subCategories = categories.filter(
    (cat) => cat.id !== "dry-foods" && cat.id !== "fresh-foods"
  );

  return (
    <section className="py-6 sm:py-8 w-full">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Phân khúc sản phẩm
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Chọn phân khúc phù hợp với nhu cầu của bạn
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {mainCategories.map((category) => (
          <Link
            href={`/categories/${category.id}`}
            key={category.id}
            className="group relative overflow-hidden bg-[#ecf9f2] rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  {category.id === "dry-foods"
                    ? "Thực phẩm đóng gói, HSD 15-90 ngày"
                    : "Đồ ăn tươi, HSD 0-1 ngày"}
                </p>
              </div>
              <div className="text-xl sm:text-2xl text-gray-300 group-hover:text-gray-400 transition-colors">
                →
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          Danh mục chi tiết
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {subCategories.map((category) => (
            <Link
              href={`/categories/${category.id}`}
              key={category.id}
              className="group flex flex-col items-center p-3 sm:p-4 bg-[#ecf9f2] rounded-lg hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-xl sm:text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h4 className="text-xs sm:text-sm font-medium text-gray-900 text-center line-clamp-2">
                {category.name}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
