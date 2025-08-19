"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";
import { formatPrice } from "@/lib/data";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase/firebase.config";
import ProtectedRoute from "@/components/ui/protected-route";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const [user, setUser] = useState<User | null>(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
      if (currentUser?.phoneNumber) {
        setPhone(currentUser.phoneNumber);
      }
    });
    return () => unsubscribe();
  }, []);
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 bg-green-50/50 rounded-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-green-800">Checkout</h1>
        <Card className="max-w-md mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-green-700">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 border-b pb-4">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-grow">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700"
                      onClick={() => removeItem(item.id)}
                    >
                      –
                    </Button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700"
                      onClick={() => addItem({ ...item, quantity: 1 })}
                    >
                      +
                    </Button>
                  </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t pt-2 text-lg font-semibold">
              Total: {formatPrice(total)}
            </div>
          </CardContent>
        </Card>
        <Card className="max-w-md mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-green-700">Thông tin đặt hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user ? (
                <>
                  <div>
                    <label className="font-semibold text-sm text-gray-600">Email</label>
                    <p className="text-gray-800">{user.email}</p>
                  </div>
                  <div>
                    <label htmlFor="address" className="font-semibold text-sm text-gray-600">Địa chỉ</label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Nhập địa chỉ giao hàng"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="font-semibold text-sm text-gray-600">Số điện thoại</label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Nhập số điện thoại liên hệ"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </>
              ) : (
                <p>Đang tải thông tin khách hàng...</p>
              )}
            </div>
          </CardContent>
        </Card>
        <form action={checkoutAction} className="max-w-md mx-auto">
          <input type="hidden" name="items" value={JSON.stringify(items)} />
          <Button type="submit" variant="default" className="w-full bg-green-600 hover:bg-green-700 text-white">
            Proceed to Payment
          </Button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
