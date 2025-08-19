"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";

export function HeroBanner() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 md:p-12 w-full border border-green-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Thực phẩm tươi ngon
            <span className="text-green-600 block">Giá tốt mỗi ngày</span>
          </h1>

          <p className="text-lg text-gray-600">
            Hệ thống tự động giảm giá theo thời gian thực. Càng gần ngày hết
            hạn, giá càng tốt!
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Input
              type="email"
              placeholder="Nhập email để nhận thông báo giảm giá"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              Đăng ký
            </Button>
          </form>
        </div>

        <div className="relative">
          <div className="relative w-full h-56 md:h-72 lg:h-80">
            <Image
              src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=1200&h=450&fit=crop"
              alt="Thực phẩm tươi ngon được đóng gói và trưng bày"
              fill
              className="rounded-xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
