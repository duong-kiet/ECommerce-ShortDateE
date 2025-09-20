"use client";

import { useState, useEffect } from "react";
import { Product, enrichProductsWithPricing } from "@/lib/data";
import { getProducts } from "@/lib/firebase/firestore-app-data";
import { filterProducts } from "@/lib/filter";
import { useFilter } from "@/contexts/filter-context";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import Sidebar from "@/components/sidebar";
import FilterResults from "@/components/filter-results";

export default function FilterResultContent() {
  const searchParams = useSearchParams();
  const {
    filterState,
    updateCategory,
    updateProductTypes,
    updateExpiryRanges,
    updatePriceRange,
    resetFilters,
  } = useFilter();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        const enrichedProducts = enrichProductsWithPricing(products);
        setAllProducts(enrichedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters from URL params
  useEffect(() => {
    if (allProducts.length > 0) {
      const category = searchParams.get("category");
      const productTypes = searchParams.get("productTypes");
      const expiryRanges = searchParams.get("expiryRanges");
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");

      resetFilters(); // Start with a clean slate

      if (category) {
        updateCategory(category);
      }
      if (productTypes) {
        updateProductTypes(productTypes.split(","));
      }
      if (expiryRanges) {
        updateExpiryRanges(expiryRanges.split(",").map(Number));
      }
      if (minPrice && maxPrice) {
        updatePriceRange([Number(minPrice), Number(maxPrice)]);
      }

      const filtered = filterProducts(allProducts, {
        selectedCategory: category || undefined,
        selectedProductTypes: productTypes ? productTypes.split(",") : [],
        selectedExpiryRanges: expiryRanges
          ? expiryRanges.split(",").map(Number)
          : [],
        priceRange: [Number(minPrice) || 0, Number(maxPrice) || 1000000],
      });
      setFilteredProducts(filtered);
    }
  }, [allProducts, searchParams]);

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 flex-shrink-0 px-4 lg:px-8">
            <Sidebar products={allProducts} />
          </aside>
          <div className="flex-1 px-4 lg:px-8 space-y-8">
            <FilterResults
              products={filteredProducts}
              filterState={filterState}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
