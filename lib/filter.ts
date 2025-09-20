import { Product } from "./data";

export interface EnrichedProduct extends Product {
  priceNow?: number;
  timeLeft?: number;
}

export interface FilterState {
  priceRange: [number, number];
  selectedProductTypes: string[];
  selectedExpiryRanges: number[]; // Changed from string[] to number[]
  selectedCategory?: string;
}

export interface FilterOptions {
  priceRange: [number, number];
  productTypes: string[];
  expiryRanges: string[];
  category?: string;
}

// Hàm tính toán ngày còn lại từ ngày hết hạn (fallback)
function getDaysUntilExpiry(expiryDate: string): number {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Hàm kiểm tra sản phẩm có thuộc khoảng hạn sử dụng không
// Sử dụng timeLeft (số ngày) thay vì tính toán từ expiryDate
function isInExpiryRange(timeLeft: number, range: number): boolean {
  switch (range) {
    case 0: // Hôm nay (0-1 ngày)
      return timeLeft >= 0 && timeLeft < 1;
    case 1: // 3 ngày tới
      return timeLeft >= 1 && timeLeft < 3;
    case 2: // 1 tuần tới
      return timeLeft >= 3 && timeLeft < 7;
    case 3: // 1 tháng tới
      return timeLeft >= 7 && timeLeft < 30;
    case 4: // Trên 1 tháng
      return timeLeft >= 30;
    default:
      return true;
  }
}

// Hàm lọc sản phẩm chính
export function filterProducts(
  products: EnrichedProduct[],
  filters: FilterState
): EnrichedProduct[] {
  return products.filter((product) => {
    // Lọc theo khoảng giá
    const currentPrice = product.default_price.unit_amount;
    if (
      currentPrice < filters.priceRange[0] ||
      currentPrice > filters.priceRange[1]
    ) {
      return false;
    }

    // Lọc theo loại sản phẩm
    if (filters.selectedProductTypes.length > 0) {
      if (!filters.selectedProductTypes.includes(product.productType)) {
        return false;
      }
    }

    // Lọc theo hạn sử dụng
    if (filters.selectedExpiryRanges.length > 0) {
      // Sử dụng timeLeft từ sản phẩm (nếu có) hoặc tính toán từ expiryDate
      const timeLeft =
        product.timeLeft !== undefined
          ? product.timeLeft
          : getDaysUntilExpiry(product.expiryDate);

      const matchesExpiryRange = filters.selectedExpiryRanges.some((range) =>
        isInExpiryRange(timeLeft, range)
      );
      if (!matchesExpiryRange) {
        return false;
      }
    }

    // Lọc theo danh mục (nếu có)
    if (filters.selectedCategory) {
      // Logic này sẽ được implement khi có thông tin category của product
      // Hiện tại chưa có field category trong Product interface
    }

    return true;
  });
}

// Hàm đếm số sản phẩm theo từng tiêu chí filter
export function getFilterCounts(products: EnrichedProduct[]): {
  productTypes: { dry: number; fresh: number };
  expiryRanges: {
    today: number;
    "3days": number;
    "1week": number;
    "1month": number;
    over1month: number;
  };
} {
  const productTypeCounts: { dry: number; fresh: number } = {
    dry: 0,
    fresh: 0,
  };

  const expiryRangeCounts: {
    today: number;
    "3days": number;
    "1week": number;
    "1month": number;
    over1month: number;
  } = {
    today: 0,
    "3days": 0,
    "1week": 0,
    "1month": 0,
    over1month: 0,
  };

  products.forEach((product) => {
    // Đếm theo loại sản phẩm
    productTypeCounts[product.productType]++;

    // Đếm theo hạn sử dụng - sử dụng timeLeft nếu có
    const timeLeft =
      product.timeLeft !== undefined
        ? product.timeLeft
        : getDaysUntilExpiry(product.expiryDate);

    if (timeLeft >= 0 && timeLeft < 1) {
      expiryRangeCounts.today++;
    }
    if (timeLeft >= 1 && timeLeft < 3) {
      expiryRangeCounts["3days"]++;
    }
    if (timeLeft >= 3 && timeLeft < 7) {
      expiryRangeCounts["1week"]++;
    }
    if (timeLeft >= 7 && timeLeft < 30) {
      expiryRangeCounts["1month"]++;
    }
    if (timeLeft >= 30) {
      expiryRangeCounts.over1month++;
    }
  });

  return {
    productTypes: productTypeCounts,
    expiryRanges: expiryRangeCounts,
  };
}

// Hàm reset filter về trạng thái mặc định
export function getDefaultFilterState(): FilterState {
  return {
    priceRange: [5000, 1000000],
    selectedProductTypes: [],
    selectedExpiryRanges: [],
    selectedCategory: undefined,
  };
}
