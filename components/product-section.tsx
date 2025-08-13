"use client";

import { MockProduct, getProductsByCategory } from "@/lib/mock-data";
import { useState } from "react";
import { ProductCard } from "./product-card";

interface ProductSectionProps {
  title: string;
  categories?: string[];
  products?: MockProduct[];
}

export function ProductSection({
  title,
  categories,
  products,
}: ProductSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categoryOptions = categories || [
    "all",
    "milks-dairies",
    "coffes-teas",
    "pet-foods",
    "meats",
    "vegetables",
    "fruits",
  ];

  const getDisplayProducts = () => {
    if (products) return products;
    if (activeCategory === "all") {
      return getProductsByCategory("milks-dairies").concat(
        getProductsByCategory("fresh-fruit").slice(0, 3),
        getProductsByCategory("fresh-vegetables").slice(0, 3),
        getProductsByCategory("water-drinks").slice(0, 4)
      );
    }
    return getProductsByCategory(activeCategory);
  };

  const displayProducts = getDisplayProducts();

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case "all":
        return "All";
      case "milks-dairies":
        return "Milks & Dairies";
      case "coffes-teas":
        return "Coffes & Teas";
      case "pet-foods":
        return "Pet Foods";
      case "meats":
        return "Meats";
      case "vegetables":
        return "Vegetables";
      case "fruits":
        return "Fruits";
      default:
        return category;
    }
  };

  return (
    <section className="py-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          {title}
        </h2>

        {categories && (
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {getCategoryDisplayName(category)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            label={
              index === 0
                ? "Hot"
                : index === 1
                ? "Sale"
                : index === 2
                ? "New"
                : undefined
            }
            discount={index === 1 ? 14 : undefined}
            rating={product.rating}
            brand="By NestFood"
          />
        ))}
      </div>
    </section>
  );
}
