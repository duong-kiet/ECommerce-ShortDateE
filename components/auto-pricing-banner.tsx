"use client";

import { Clock, TrendingDown, AlertTriangle } from "lucide-react";

export function AutoPricingBanner() {
  return (
    <section className="bg-gradient-to-r from-orange-50 to-red-50 py-8 -mx-4 lg:-mx-8 px-4 lg:px-8 mb-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingDown className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Auto-Pricing System
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Hệ thống tự động giảm giá theo thời gian thực dựa trên hạn sử dụng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Thực phẩm khô */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🥫</span>
              <h3 className="text-lg font-semibold text-gray-900">
                Thực phẩm khô
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">HSD 15-90 ngày</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>≤ 7 ngày:</span>
                  <span className="font-medium text-red-600">-50%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>≤ 15 ngày:</span>
                  <span className="font-medium text-orange-600">-30%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>≤ 30 ngày:</span>
                  <span className="font-medium text-yellow-600">-15%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>≤ 60 ngày:</span>
                  <span className="font-medium text-blue-600">-10%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Đồ ăn tươi */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🥗</span>
              <h3 className="text-lg font-semibold text-gray-900">
                Đồ ăn tươi
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-600">HSD 0-1 ngày</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>1 giờ:</span>
                  <span className="font-medium text-red-600">-80%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>≤ 3 giờ:</span>
                  <span className="font-medium text-orange-600">-70%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>≤ 6 giờ:</span>
                  <span className="font-medium text-yellow-600">-50%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>≤ 8 giờ:</span>
                  <span className="font-medium text-blue-600">-30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            💡 Giá được cập nhật tự động mỗi phút. Càng gần ngày hết hạn, giá
            càng giảm mạnh!
          </p>
        </div>
      </div>
    </section>
  );
}
