"use client";

import { useState, useEffect } from "react";
import { getProducts } from "@/lib/firebase/firestore-app-data";
import { Product, enrichProductsWithPricing } from "@/lib/data";
import { filterProducts } from "@/lib/filter";
import { useFilter } from "@/contexts/filter-context";
import Sidebar from "@/components/sidebar";
import { HeroPricingCarousel } from "@/components/hero-pricing-carousel";
import { FoodCarousel } from "@/components/food-carousel";
import ClientProductTypeSection from "@/components/client-product-type-section";
import ClientCategoryGrid from "@/components/client-category-grid";
import PromoCards from "@/components/promo-cards";
import FilterResults from "@/components/filter-results";

type EnrichedProduct = Product & { priceNow: number; timeLeft: number };

export default function FilteredContent() {
  const [allProducts, setAllProducts] = useState<EnrichedProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<EnrichedProduct[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [showFilterResults, setShowFilterResults] = useState(false);
  const { filterState, applyFilters } = useFilter();

  // Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching all products from Firestore...");
        const products = await getProducts();
        console.log(`Loaded ${products.length} products`);

        // Bổ sung priceNow và timeLeft cho tất cả sản phẩm
        const enrichedProducts = enrichProductsWithPricing(products);
        console.log("Enriched products with pricing data", enrichedProducts);

        setAllProducts(enrichedProducts as EnrichedProduct[]);
        setFilteredProducts(enrichedProducts as EnrichedProduct[]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters when showFilterResults changes
  useEffect(() => {
    if (allProducts.length > 0 && showFilterResults) {
      console.log("Applying filters to", allProducts.length, "products");
      const filtered = filterProducts(
        allProducts as Product[],
        filterState
      ) as EnrichedProduct[];
      console.log("Filtered results:", filtered.length, "products");
      setFilteredProducts(filtered);
    }
  }, [allProducts, filterState, showFilterResults]);

  // Override applyFilters to show results
  const handleApplyFilters = () => {
    console.log("Apply filters clicked, current filter state:", filterState);
    setShowFilterResults(true);
    applyFilters();
  };

  // Check if any filters are active
  const hasActiveFilters =
    filterState.selectedProductTypes.length > 0 ||
    filterState.selectedExpiryRanges.length > 0 ||
    filterState.selectedCategory;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-80 flex-shrink-0 px-4 lg:px-8">
          <Sidebar products={allProducts} onApplyFilters={handleApplyFilters} />
        </aside>

        {/* Main Content */}
        <div className="flex-1 px-4 lg:px-8 space-y-8">
          {/* Carousel 1: Hero Banner + Auto Pricing System */}
          <HeroPricingCarousel />

          {/* Carousel 2: Fresh Food Daily Deals (Autoplay) */}
          <FoodCarousel />

          {/* Shop by Categories */}
          <ClientCategoryGrid products={allProducts} />

          <PromoCards />

          {/* Thực phẩm khô - Đóng gói */}
          <ClientProductTypeSection
            type="dry"
            title="Thực phẩm khô - Đóng gói"
            subtitle="Còn HSD 15-90 ngày: mì gói, đồ hộp, sữa, nước giải khát, bánh kẹo, gia vị, ngũ cốc..."
            maxProducts={8}
            products={allProducts}
          />

          {/* Đồ ăn tươi - Tiêu dùng trong ngày */}
          <ClientProductTypeSection
            type="fresh"
            title="Đồ ăn tươi - Tiêu dùng trong ngày"
            subtitle="HSD 0-1 ngày: cơm hộp, sandwich, sushi, món nấu sẵn từ bếp trung tâm..."
            maxProducts={8}
            products={allProducts}
          />

          {/* Hiển thị kết quả filter nếu có filter được áp dụng */}
          {showFilterResults && hasActiveFilters && (
            <FilterResults
              products={filteredProducts}
              filterState={filterState}
            />
          )}
        </div>
      </div>
    </main>
  );
}
