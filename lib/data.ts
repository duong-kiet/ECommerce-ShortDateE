export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  default_price: {
    id: string;
    unit_amount: number;
    currency: string;
  };
  old_price?: number;
  metadata?: Record<string, string>;
  inStock: boolean;
  dealEndDate?: string; // Added for deals of the day
  rating?: number;
  // New fields for Auto-Pricing
  productType: "dry" | "fresh"; // dry = thực phẩm khô, fresh = đồ ăn tươi
  factoryDate: string; // Ngày sản xuất
  expiryDate: string; // Ngày hết hạn sử dụng
  originalPrice: number; // Giá gốc (không đổi)
  autoPricingEnabled: boolean; // Bật/tắt auto-pricing
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
  products: string[];
  productType: "dry" | "fresh"; // Thêm loại sản phẩm cho category
}

// Helper function to calculate auto-pricing based on expiry date
export function calculateAutoPrice(
  originalPrice: number,
  expiryDate: string,
  factoryDate: string,
  limitPrice: number,
): number {

  const now = new Date();

  // Dùng helper
  const parsedExpiry = formatTimeProduct(expiryDate);
  const parsedFactory = formatTimeProduct(factoryDate);

  const ExpiryFactoryLeft = parsedExpiry!.getTime() - parsedFactory!.getTime() > 0 ? Math.ceil((parsedExpiry!.getTime() - parsedFactory!.getTime()) / 1000) : 0;
  const NowFactoryLeft = now.getTime() - parsedFactory!.getTime() > 0 ? Math.ceil((now.getTime() - parsedFactory!.getTime()) / 1000) : 0;

  if (originalPrice - (originalPrice - limitPrice) * (NowFactoryLeft / ExpiryFactoryLeft) < limitPrice) {
    return limitPrice;
  }
  return originalPrice - (originalPrice - limitPrice) * (NowFactoryLeft / ExpiryFactoryLeft);

}

export function formatTimeProduct(s: string | null | undefined): Date | null {
  if (!s) return null;

  // 1) Thử ISO/native trước
  const iso = new Date(s);
  if (!isNaN(iso.getTime())) return iso;

  // 2) Thử custom: HH:MM - DD/MM/YYYY (cho phép có khoảng trắng quanh dấu '-')
  const m = s.match(/^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    const hh = parseInt(m[1], 10);
    const mm = parseInt(m[2], 10);
    const day = parseInt(m[3], 10);
    const month = parseInt(m[4], 10) - 1; // JS: 0-11
    const year = parseInt(m[5], 10);
    const d = new Date(year, month, day, hh, mm);
    if (!isNaN(d.getTime())) return d;
  }

  return null;
}

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
