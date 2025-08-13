"use client";

import { MockProduct } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";

interface ProductDetailProps {
  product: MockProduct;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCartStore();
  const price = product.default_price;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <Image
              alt={product.name}
              className="h-full w-full object-cover"
              height={600}
              src={product.images[0]}
              width={600}
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    alt={`${product.name} ${index + 2}`}
                    className="h-full w-full object-cover"
                    height={150}
                    src={image}
                    width={150}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold text-green-600 mt-2">
              ${(price.unit_amount / 100).toFixed(2)}{" "}
              {price.currency.toUpperCase()}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <AddToCartButton
            id={product.id}
            name={product.name}
            price={price.unit_amount}
            imageUrl={product.images[0]}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
