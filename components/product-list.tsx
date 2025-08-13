"use client";

import { MockProduct } from "@/lib/mock-data";
import { ProductCard } from "./product-card";

interface ProductListProps {
  products: MockProduct[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
