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
  productType: "dry" | "fresh"
): number {
  const now = new Date();

  // Dùng helper mới
  const parsed = formatTimeProduct(expiryDate);
  const expiry = parsed ?? new Date(expiryDate); // thêm một lớp fallback đề phòng
  if (isNaN(expiry.getTime())) {
    // Không parse được thì không auto-discount
    return originalPrice;
  }

  const timeLeft = expiry.getTime() - now.getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  if (daysLeft <= 0) {
    // Hết hạn: xả kho 90%
    return Math.round(originalPrice * 0.1);
  }

  let discountPercentage = 0;

  if (productType === "fresh") {
    // Fresh: giảm gắt
    if (daysLeft <= 1) {
      discountPercentage = 0.8;
    } else if (daysLeft <= 3) {
      discountPercentage = 0.6;
    } else if (daysLeft <= 7) {
      discountPercentage = 0.4;
    } else if (daysLeft <= 14) {
      discountPercentage = 0.2;
    }
  } else {
    // Dry: giảm vừa phải
    if (daysLeft <= 7) {
      discountPercentage = 0.5;
    } else if (daysLeft <= 15) {
      discountPercentage = 0.3;
    } else if (daysLeft <= 30) {
      discountPercentage = 0.15;
    } else if (daysLeft <= 60) {
      discountPercentage = 0.1;
    }
  }

  return Math.round(originalPrice * (1 - discountPercentage));
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

// export const formatPrice = (amount: number) =>
//   new Intl.NumberFormat("vi-VN", {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(amount) + " VNĐ";

// export const getProducts = () => Products;

// export const getProductById = (id: string) => {
//   return Products.find((product) => product.id === id);
// };

// export const getProductsByCategory = (categoryId: string) => {
//   const category = categories.find((c) => c.id === categoryId);
//   if (!category) return [];
//   const byId = new Map(Products.map((p) => [p.id, p] as const));
//   return category.products
//     .map((pid) => byId.get(pid))
//     .filter((p): p is Product => Boolean(p));
// };

// export const getProductsByCategory = (categoryId: string) => {
//   // Nhóm tổng hợp dry
//   if (categoryId === "dry-foods") {
//     const drySubIds = categories
//       .filter(c => c.productType === "dry" && c.id !== "dry-foods")
//       .map(c => c.id);

//     const prodIds = drySubIds.flatMap(
//       id => categories.find(c => c.id === id)?.products ?? []
//     );
//     const unique = Array.from(new Set(prodIds));

//     const byId = new Map(Products.map(p => [p.id, p] as const));
//     return unique.map(pid => byId.get(pid)).filter((p): p is Product => Boolean(p));
//   }

//   // Nhóm tổng hợp fresh
//   if (categoryId === "fresh-foods") {
//     const freshSubIds = categories
//       .filter(c => c.productType === "fresh" && c.id !== "fresh-foods")
//       .map(c => c.id);

//     const prodIds = freshSubIds.flatMap(
//       id => categories.find(c => c.id === id)?.products ?? []
//     );
//     const unique = Array.from(new Set(prodIds));

//     const byId = new Map(Products.map(p => [p.id, p] as const));
//     return unique.map(pid => byId.get(pid)).filter((p): p is Product => Boolean(p));
//   }

//   // Category bình thường
//   const category = categories.find(c => c.id === categoryId);
//   if (!category) return [];

//   const byId = new Map(Products.map(p => [p.id, p] as const));
//   return category.products
//     .map(pid => byId.get(pid))
//     .filter((p): p is Product => Boolean(p));
// };


// export const getCategories = () => categories;

// export const getCategoryById = (id: string) => {
//   return categories.find((category) => category.id === id);
// };

// export const getDealProducts = () => {
//   return Products.filter((product) => product.dealEndDate);
// };

// // Get products by type
// export const getProductsByType = (type: "dry" | "fresh") => {
//   return Products.filter((product) => product.productType === type);
// };

// // Get products with auto-pricing enabled
// export const getAutoPricingProducts = () => {
//   return Products.filter((product) => product.autoPricingEnabled);
// };
