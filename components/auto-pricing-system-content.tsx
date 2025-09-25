"use client";

import { Clock, TrendingDown, AlertTriangle } from "lucide-react";

export function AutoPricingSystemContent() {
  return (
    <section className="bg-gradient-to-r from-orange-50 to-red-50 p-6 sm:p-8 lg:p-12 rounded-xl h-full flex flex-col justify-center border border-red-100">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Auto-Pricing System
          </h2>
        </div>
        <p className="text-sm sm:text-base text-gray-600">
          Hệ thống tự động giảm giá theo thời gian thực dựa trên hạn sử dụng
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Thực phẩm khô */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl sm:text-2xl">🥫</span>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Thực phẩm khô
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span>≤ 7 ngày:</span>
              <span className="font-medium text-red-600">-50%</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>≤ 15 ngày:</span>
              <span className="font-medium text-orange-600">-30%</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>≤ 30 ngày:</span>
              <span className="font-medium text-yellow-600">-15%</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>≤ 60 ngày:</span>
              <span className="font-medium text-blue-600">-10%</span>
            </div>
          </div>
        </div>

        {/* Đồ ăn tươi */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl sm:text-2xl">🥗</span>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Đồ ăn tươi
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span>Hôm nay:</span>
              <span className="font-medium text-red-600">-80%</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>≤ 3 ngày:</span>
              <span className="font-medium text-orange-600">-60%</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>≤ 7 ngày:</span>
              <span className="font-medium text-yellow-600">-40%</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>≤ 14 ngày:</span>
              <span className="font-medium text-blue-600">-20%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-xs sm:text-sm text-gray-500">
          💡 Giá được cập nhật tự động mỗi phút. Càng gần ngày hết hạn, giá càng
          giảm mạnh!
        </p>
      </div>
    </section>
  );
}
