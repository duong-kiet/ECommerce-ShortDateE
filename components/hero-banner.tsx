"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
          <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-lg"></div>
          <div className="relative grid grid-cols-2 gap-4 opacity-60">
            <div className="space-y-4">
              <div className="w-24 h-24 bg-green-300 rounded-full mx-auto flex items-center justify-center text-2xl">
                🥫
              </div>
              <div className="w-20 h-20 bg-blue-300 rounded-full mx-auto flex items-center justify-center text-xl">
                🥗
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="w-20 h-20 bg-yellow-300 rounded-full mx-auto flex items-center justify-center text-xl">
                🍜
              </div>
              <div className="w-16 h-16 bg-orange-300 rounded-full mx-auto flex items-center justify-center text-lg">
                🥤
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
