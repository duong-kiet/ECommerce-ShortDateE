"use client";

import { useCartStore } from "@/store/cart-store";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, addItem, removeItem, removeLine, clearCart } = useCartStore();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = items.length > 0 ? 15000 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-8">
        <div className="px-4 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Giỏ hàng</h1>

          {items.length === 0 ? (
            <Card className="bg-white">
              <CardContent className="py-10 flex flex-col items-center text-center">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-600 mb-4">
                  Giỏ hàng của bạn đang trống.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/products">Tiếp tục mua sắm</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart List */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="bg-white">
                    <CardContent className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              No image
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.price.toLocaleString()}đ / đơn vị
                          </p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <div className="w-10 text-center font-medium">
                            {item.quantity}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addItem({ ...item, quantity: 1 })}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Line price */}
                        <div className="w-24 text-right font-semibold text-gray-900">
                          {(item.price * item.quantity).toLocaleString()}đ
                        </div>

                        {/* Remove line */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLine(item.id)}
                          className="text-red-600 hover:text-red-700"
                          aria-label="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => clearCart()}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Xóa giỏ hàng
                  </Button>
                  <Button asChild variant="ghost">
                    <Link href="/products">Tiếp tục mua sắm</Link>
                  </Button>
                </div>
              </div>

              {/* Summary */}
              <div>
                <Card className="bg-white sticky top-6">
                  <CardHeader>
                    <CardTitle>Tóm tắt đơn hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Tạm tính</span>
                      <span>{subtotal.toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Phí vận chuyển</span>
                      <span>{shipping.toLocaleString()}đ</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold text-gray-900">
                      <span>Tổng cộng</span>
                      <span>{total.toLocaleString()}đ</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      asChild
                    >
                      <Link href="/checkout">Tiến hành thanh toán</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

