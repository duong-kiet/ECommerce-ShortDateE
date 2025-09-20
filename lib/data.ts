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

export const ONE_SECOND = 1;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = 24 * ONE_HOUR;

// Helper function to calculate auto-pricing based on expiry date
export function calculateAutoPrice(
  originalPrice: number,
  expiryDate: string,
  factoryDate: string,
  limitPrice: number
): number {
  // Dùng helper
  const parsedExpiry = formatTimeProduct(expiryDate);
  const parsedFactory = formatTimeProduct(factoryDate);

  const ExpiryFactoryLeft = calculateExpiryFactoryLeft(
    parsedExpiry!,
    parsedFactory!
  );
  const NowFactoryLeft = calculateNowFactoryLeft(new Date(), parsedFactory!);

  if (
    originalPrice -
      (originalPrice - limitPrice) * (NowFactoryLeft / ExpiryFactoryLeft) <
    limitPrice
  ) {
    return limitPrice;
  }
  return (
    originalPrice -
    (originalPrice - limitPrice) * (NowFactoryLeft / ExpiryFactoryLeft)
  );
}

// Tính theo giây
export function calculateExpiryFactoryLeft(
  expiryDate: Date,
  factoryDate: Date
): number {
  const ExpiryFactoryLeft =
    expiryDate.getTime() - factoryDate.getTime() > 0
      ? Math.ceil((expiryDate.getTime() - factoryDate.getTime()) / 1000)
      : 0;
  return ExpiryFactoryLeft;
}

// Tính theo giây
export function calculateNowFactoryLeft(now: Date, factoryDate: Date): number {
  const NowFactoryLeft =
    now.getTime() - factoryDate.getTime() > 0
      ? Math.ceil((now.getTime() - factoryDate.getTime()) / 1000)
      : 0;
  return NowFactoryLeft;
}

// Tính theo giây
export function calculateExpiryNowLeft(expiryDate: Date, now: Date): number {
  const ExpiryNowLeft =
    expiryDate.getTime() - now.getTime() > 0
      ? Math.ceil((expiryDate.getTime() - now.getTime()) / 1000)
      : 0;
  return ExpiryNowLeft;
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

export const formatCountdownTime = (s: number) => {
  if (s < 0) return "Đã hết hạn";

  if (s >= ONE_DAY) {
    // Hiển thị theo ngày:giờ:phút
    const days = Math.floor(s / ONE_DAY);
    const hours = Math.floor((s % ONE_DAY) / ONE_HOUR);
    const minutes = Math.floor((s % ONE_HOUR) / ONE_MINUTE);
    return `${days}d:${hours.toString().padStart(2, "0")}h:${minutes
      .toString()
      .padStart(2, "0")}m`;
  } else {
    // Hiển thị theo giờ:phút:giây
    const hours = Math.floor(s / ONE_HOUR);
    const minutes = Math.floor((s % ONE_HOUR) / ONE_MINUTE);
    const seconds = Math.floor((s % ONE_MINUTE) / ONE_SECOND);
    return `${hours.toString().padStart(2, "0")}h:${minutes
      .toString()
      .padStart(2, "0")}m:${seconds.toString().padStart(2, "0")}s`;
  }
};

export const formatTimeLeft = (s: number) => {
  if (s <= 0) return "Hết hạn";
  if (s >= ONE_DAY) {
    const d = Math.ceil(s / ONE_DAY);
    return d === 1 ? "1 ngày" : `${d} ngày`;
  }
  if (s >= ONE_HOUR) {
    const h = Math.floor(s / ONE_HOUR);
    return h === 1 ? "1 giờ" : `${h} giờ`;
  }
  if (s >= ONE_MINUTE) {
    const m = Math.floor(s / ONE_MINUTE);
    return m === 1 ? "1 phút" : `${m} phút`;
  }
  return Math.floor(s / ONE_SECOND) === 1
    ? "1 giây"
    : `${Math.floor(s / ONE_SECOND)} giây`;
};

// Hàm bổ sung priceNow và timeLeft cho sản phẩm
export function enrichProductWithPricing(
  product: Product
): Product & { priceNow: number; timeLeft: number } {
  const now = new Date();
  const parsedExpiry = formatTimeProduct(product.expiryDate);
  const parsedFactory = formatTimeProduct(product.factoryDate);

  if (!parsedExpiry || !parsedFactory) {
    return {
      ...product,
      priceNow: product.default_price.unit_amount,
      timeLeft: 0,
    };
  }

  const priceNow = calculateAutoPrice(
    product.originalPrice,
    product.expiryDate,
    product.factoryDate,
    product.default_price.unit_amount
  );

  // Tính timeLeft bằng calculateExpiryNowLeft
  const timeLeftDay = Math.floor(
    calculateExpiryNowLeft(parsedExpiry, now) / 86400
  );

  return {
    ...product,
    priceNow: Math.round(priceNow),
    timeLeft: timeLeftDay,
  };
}

// Hàm bổ sung priceNow và timeLeft cho mảng sản phẩm
export function enrichProductsWithPricing(
  products: Product[]
): (Product & { priceNow: number; timeLeft: number })[] {
  return products.map(enrichProductWithPricing);
}
