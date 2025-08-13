"use client";

import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const { clearCart } = useCartStore();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
          <p className="text-gray-600 mb-4">
            {message ||
              "Thank you for your purchase. Your order is being processed."}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Note: Stripe payment processing is currently disabled for
            development purposes.
          </p>
        </div>
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
