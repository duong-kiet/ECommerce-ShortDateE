"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "./product-card";
import { getProductsByType } from "@/lib/firebase/firestore-app-data";
import { Product } from "@/lib/data";

interface ClientProductTypeSectionProps {
  type: "dry" | "fresh";
  title: string;
  subtitle?: string;
  maxProducts?: number;
  products?: (Product & { priceNow?: number; timeLeft?: number })[]; // Thêm products từ props với priceNow và timeLeft
}

export default function ClientProductTypeSection({
  type,
  title,
  subtitle,
  maxProducts = 4,
  products: allProducts = [],
}: ClientProductTypeSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allProducts.length > 0) {
      // Lọc products theo type từ allProducts thay vì fetch từ Firestore
      const filteredProducts = allProducts.filter(
        (product) => product.productType === type
      );
      setProducts(filteredProducts);
      setLoading(false);
    } else {
      // Fallback: fetch từ Firestore nếu không có allProducts
      const fetchProducts = async () => {
        try {
          const fetchedProducts = await getProductsByType(type);
          setProducts(fetchedProducts);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching products:", error);
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [type, allProducts]);

  const getTypeDescription = () => {
    if (subtitle) return subtitle;
    if (type === "dry") {
      return "Thực phẩm khô - đóng gói (HSD 15-90 ngày): mì gói, đồ hộp, sữa, nước giải khát, bánh kẹo, gia vị, ngũ cốc...";
    }
    return "Đồ ăn tươi - tiêu dùng trong ngày (HSD 0-1 ngày): cơm hộp, sandwich, sushi, món nấu sẵn...";
  };

  const getTypeIcon = () => {
    return type === "dry" ? "🥫" : "🥗";
  };

  if (loading) {
    return (
      <section className="py-8 w-full">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{getTypeIcon()}</span>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
          <p className="text-sm text-gray-600">{getTypeDescription()}</p>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </section>
    );
  }

  const displayedProducts = products.slice(0, maxProducts);

  return (
    <section className="py-8 w-full">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{getTypeIcon()}</span>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <p className="text-sm text-gray-600">{getTypeDescription()}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts.map((product, index) => (
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
            rating={product.rating}
            brand="By NestFood"
          />
        ))}
      </div>
    </section>
  );
}
