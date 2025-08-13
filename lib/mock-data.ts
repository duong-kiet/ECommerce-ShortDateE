export interface MockProduct {
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
  category: string;
  inStock: boolean;
  dealEndDate?: string; // Added for deals of the day
  rating?: number;
  // New fields for Auto-Pricing
  productType: "dry" | "fresh"; // dry = thực phẩm khô, fresh = đồ ăn tươi
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

export const categories: Category[] = [
  {
    id: "dry-foods",
    name: "Thực phẩm khô",
    icon: "🥫",
    productCount: 8,
    products: [
      "prod_1",
      "prod_2",
      "prod_3",
      "prod_4",
      "prod_5",
      "prod_6",
      "prod_7",
      "prod_8",
    ],
    productType: "dry",
  },
  {
    id: "fresh-foods",
    name: "Đồ ăn tươi",
    icon: "🥗",
    productCount: 6,
    products: ["prod_9", "prod_10", "prod_11", "prod_12", "prod_13", "prod_14"],
    productType: "fresh",
  },
  {
    id: "instant-noodles",
    name: "Mì gói & Mì ăn liền",
    icon: "🍜",
    productCount: 4,
    products: ["prod_15", "prod_16", "prod_17", "prod_18"],
    productType: "dry",
  },
  {
    id: "canned-foods",
    name: "Đồ hộp (cá hộp, thịt hộp, rau củ hộp)",
    icon: "🥫",
    productCount: 5,
    products: ["prod_19", "prod_20", "prod_21", "prod_22", "prod_23"],
    productType: "dry",
  },
  {
    id: "beverages",
    name: "Nước giải khát (nước ngọt, nước tăng lực, trà đóng chai)",
    icon: "🥤",
    productCount: 6,
    products: [
      "prod_24",
      "prod_25",
      "prod_26",
      "prod_27",
      "prod_28",
      "prod_29",
    ],
    productType: "dry",
  },
  {
    id: "dairy-products",
    name: "Sữa & Sản phẩm từ sữa (sữa bột, sữa tươi đóng hộp)",
    icon: "🥛",
    productCount: 1,
    products: ["prod_7"],
    productType: "dry",
  },
  {
    id: "snacks",
    name: "Bánh kẹo (bánh quy, kẹo, chocolate)",
    icon: "🍪",
    productCount: 4,
    products: ["prod_30", "prod_31", "prod_32", "prod_33"],
    productType: "dry",
  },
  {
    id: "condiments",
    name: "Gia vị & Nước chấm (muối, tiêu, nước mắm, dầu ăn)",
    icon: "🧂",
    productCount: 3,
    products: ["prod_34", "prod_35", "prod_36"],
    productType: "dry",
  },
  {
    id: "cereals",
    name: "Ngũ cốc & Hạt (gạo, yến mạch, hạt dinh dưỡng)",
    icon: "🌾",
    productCount: 3,
    products: ["prod_37", "prod_38", "prod_39"],
    productType: "dry",
  },
  {
    id: "ready-meals",
    name: "Cơm hộp & Bữa ăn sẵn (cơm gà, cơm thịt, salad hộp)",
    icon: "🍱",
    productCount: 4,
    products: ["prod_40", "prod_41", "prod_42", "prod_43"],
    productType: "fresh",
  },
  {
    id: "sandwiches",
    name: "Sandwich & Bánh mì kẹp",
    icon: "🥪",
    productCount: 3,
    products: ["prod_44", "prod_45", "prod_46"],
    productType: "fresh",
  },
  {
    id: "sushi",
    name: "Sushi & Đồ ăn Nhật",
    icon: "🍣",
    productCount: 3,
    products: ["prod_47", "prod_48", "prod_49"],
    productType: "fresh",
  },
  {
    id: "cooked-foods",
    name: "Món nấu sẵn (từ bếp trung tâm: canh, súp, thịt nướng, rau củ hấp)",
    icon: "🍲",
    productCount: 4,
    products: ["prod_50", "prod_51", "prod_52", "prod_53"],
    productType: "fresh",
  },
  {
    id: "convenience-foods",
    name: "Đồ ăn từ cửa hàng tiện lợi (bánh mì tươi, yogurt tươi, trái cây cắt sẵn)",
    icon: "🏪",
    productCount: 0,
    products: [],
    productType: "fresh",
  },
];

// Helper function to calculate auto-pricing based on expiry date
export function calculateAutoPrice(
  originalPrice: number,
  expiryDate: string,
  productType: "dry" | "fresh"
): number {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const timeLeft = expiry.getTime() - now.getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  if (daysLeft <= 0) {
    return originalPrice * 0.1; // 90% discount if expired
  }

  let discountPercentage = 0;

  if (productType === "fresh") {
    // Fresh foods: aggressive discounting
    if (daysLeft <= 1) {
      discountPercentage = 0.8; // 80% discount if expiring today
    } else if (daysLeft <= 3) {
      discountPercentage = 0.6; // 60% discount if expiring in 3 days
    } else if (daysLeft <= 7) {
      discountPercentage = 0.4; // 40% discount if expiring in a week
    } else if (daysLeft <= 14) {
      discountPercentage = 0.2; // 20% discount if expiring in 2 weeks
    }
  } else {
    // Dry foods: moderate discounting
    if (daysLeft <= 7) {
      discountPercentage = 0.5; // 50% discount if expiring in a week
    } else if (daysLeft <= 15) {
      discountPercentage = 0.3; // 30% discount if expiring in 15 days
    } else if (daysLeft <= 30) {
      discountPercentage = 0.15; // 15% discount if expiring in a month
    } else if (daysLeft <= 60) {
      discountPercentage = 0.1; // 10% discount if expiring in 2 months
    }
  }

  return Math.round(originalPrice * (1 - discountPercentage));
}

export const mockProducts: MockProduct[] = [
  // DEALS OF THE DAY - Chính xác như trong hình ảnh
  {
    id: "prod_1",
    name: "Seeds of Change Organic Quinoa, Brown",
    description: "Organic quinoa with rich nutty flavor",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_1", unit_amount: 3285, currency: "usd" },
    originalPrice: 3380,
    category: "dry-foods",
    inStock: true,
    dealEndDate: new Date(
      Date.now() +
        426 * 24 * 60 * 60 * 1000 +
        8 * 60 * 60 * 1000 +
        17 * 60 * 1000 +
        58 * 1000
    ).toISOString(),
    rating: 4.0,
    productType: "dry",
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    autoPricingEnabled: false,
  },
  {
    id: "prod_2",
    name: "Perdue Simply Smart Organics Gluten",
    description: "Organic gluten-free chicken strips",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_2", unit_amount: 2485, currency: "usd" },
    originalPrice: 2680,
    category: "dry-foods",
    inStock: true,
    dealEndDate: new Date(
      Date.now() +
        822 * 24 * 60 * 60 * 1000 +
        8 * 60 * 60 * 1000 +
        17 * 60 * 1000 +
        59 * 1000
    ).toISOString(),
    rating: 4.0,
    productType: "dry",
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    autoPricingEnabled: false,
  },
  {
    id: "prod_3",
    name: "Signature Wood-Fired Mushroom",
    description: "Artisan wood-fired mushroom blend",
    images: [
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_3", unit_amount: 1285, currency: "usd" },
    originalPrice: 1380,
    category: "dry-foods",
    inStock: true,
    dealEndDate: new Date(
      Date.now() +
        1156 * 24 * 60 * 60 * 1000 +
        8 * 60 * 60 * 1000 +
        17 * 60 * 1000 +
        59 * 1000
    ).toISOString(),
    rating: 3.0,
    productType: "dry",
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    autoPricingEnabled: false,
  },
  {
    id: "prod_4",
    name: "Simply Lemonade with Raspberry Juice",
    description: "Refreshing lemonade with raspberry",
    images: [
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_4", unit_amount: 1585, currency: "usd" },
    originalPrice: 1680,
    category: "dry-foods",
    inStock: true,
    dealEndDate: new Date(
      Date.now() +
        398 * 24 * 60 * 60 * 1000 +
        8 * 60 * 60 * 1000 +
        17 * 60 * 1000 +
        59 * 1000
    ).toISOString(),
    rating: 3.0,
    productType: "dry",
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    autoPricingEnabled: false,
  },

  // DRY FOODS - Thực phẩm khô
  {
    id: "prod_5",
    name: "Mì gói Hảo Hảo chua cay",
    description: "Mì gói hương vị chua cay đậm đà",
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_5", unit_amount: 3500, currency: "usd" },
    originalPrice: 3500,
    category: "instant-noodles",
    inStock: true,
    rating: 4.2,
    productType: "dry",
    expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days
    autoPricingEnabled: true,
  },
  {
    id: "prod_6",
    name: "Cá hộp ngừ đại dương",
    description: "Cá ngừ đại dương đóng hộp, giàu protein",
    images: [
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_6", unit_amount: 25000, currency: "usd" },
    originalPrice: 25000,
    category: "canned-foods",
    inStock: true,
    rating: 4.5,
    productType: "dry",
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    autoPricingEnabled: true,
  },
  {
    id: "prod_7",
    name: "Sữa tươi Vinamilk 100%",
    description: "Sữa tươi nguyên chất, không đường",
    images: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_7", unit_amount: 15000, currency: "usd" },
    originalPrice: 15000,
    category: "beverages",
    inStock: true,
    rating: 4.3,
    productType: "dry",
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    autoPricingEnabled: true,
  },
  {
    id: "prod_8",
    name: "Bánh Oreo Original",
    description: "Bánh quy kem vani, hương vị truyền thống",
    images: [
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_8", unit_amount: 25000, currency: "usd" },
    originalPrice: 25000,
    category: "snacks",
    inStock: true,
    rating: 4.7,
    productType: "dry",
    expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days
    autoPricingEnabled: true,
  },
  {
    id: "prod_9",
    name: "Nước mắm Phú Quốc 40N",
    description: "Nước mắm truyền thống, độ đạm 40N",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_9", unit_amount: 45000, currency: "usd" },
    originalPrice: 45000,
    category: "condiments",
    inStock: true,
    rating: 4.8,
    productType: "dry",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
    autoPricingEnabled: true,
  },
  {
    id: "prod_10",
    name: "Ngũ cốc Nestlé Fitness",
    description: "Ngũ cốc ăn sáng, giàu chất xơ",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_10", unit_amount: 85000, currency: "usd" },
    originalPrice: 85000,
    category: "cereals",
    inStock: true,
    rating: 4.4,
    productType: "dry",
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
    autoPricingEnabled: true,
  },

  // FRESH FOODS - Đồ ăn tươi
  {
    id: "prod_11",
    name: "Cơm hộp thịt kho tàu",
    description: "Cơm hộp với thịt kho tàu truyền thống",
    images: [
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_11", unit_amount: 35000, currency: "usd" },
    originalPrice: 35000,
    category: "ready-meals",
    inStock: true,
    rating: 4.1,
    productType: "fresh",
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day
    autoPricingEnabled: true,
  },
  {
    id: "prod_12",
    name: "Sandwich gà nướng",
    description: "Sandwich với gà nướng và rau tươi",
    images: [
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_12", unit_amount: 25000, currency: "usd" },
    originalPrice: 25000,
    category: "sandwiches",
    inStock: true,
    rating: 4.3,
    productType: "fresh",
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day
    autoPricingEnabled: true,
  },
  {
    id: "prod_13",
    name: "Sushi cá hồi 8 miếng",
    description: "Sushi cá hồi tươi, 8 miếng",
    images: [
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_13", unit_amount: 120000, currency: "usd" },
    originalPrice: 120000,
    category: "sushi",
    inStock: true,
    rating: 4.6,
    productType: "fresh",
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day
    autoPricingEnabled: true,
  },
  {
    id: "prod_14",
    name: "Phở bò nấu sẵn",
    description: "Phở bò nấu sẵn từ bếp trung tâm",
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_14", unit_amount: 45000, currency: "usd" },
    originalPrice: 45000,
    category: "cooked-foods",
    inStock: true,
    rating: 4.2,
    productType: "fresh",
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day
    autoPricingEnabled: true,
  },
  {
    id: "prod_15",
    name: "Bún chả Hà Nội",
    description: "Bún chả truyền thống Hà Nội",
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_15", unit_amount: 40000, currency: "usd" },
    originalPrice: 40000,
    category: "cooked-foods",
    inStock: true,
    rating: 4.4,
    productType: "fresh",
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day
    autoPricingEnabled: true,
  },
  {
    id: "prod_16",
    name: "Cơm tấm sườn nướng",
    description: "Cơm tấm với sườn nướng thơm ngon",
    images: [
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_16", unit_amount: 38000, currency: "usd" },
    originalPrice: 38000,
    category: "ready-meals",
    inStock: true,
    rating: 4.5,
    productType: "fresh",
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day
    autoPricingEnabled: true,
  },

  // More dry foods
  {
    id: "prod_17",
    name: "Mì gói 3 Miền tôm chua cay",
    description: "Mì gói hương vị tôm chua cay",
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_17", unit_amount: 3000, currency: "usd" },
    originalPrice: 3000,
    category: "instant-noodles",
    inStock: true,
    rating: 4.0,
    productType: "dry",
    expiryDate: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString(), // 50 days
    autoPricingEnabled: true,
  },
  {
    id: "prod_18",
    name: "Thịt hộp SPAM",
    description: "Thịt hộp SPAM truyền thống",
    images: [
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_18", unit_amount: 35000, currency: "usd" },
    originalPrice: 35000,
    category: "canned-foods",
    inStock: true,
    rating: 4.3,
    productType: "dry",
    expiryDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days
    autoPricingEnabled: true,
  },
];

export const getProducts = () => mockProducts;

export const getProductById = (id: string) => {
  return mockProducts.find((product) => product.id === id);
};

export const getProductsByCategory = (categoryId: string) => {
  return mockProducts.filter((product) => product.category === categoryId);
};

export const getCategories = () => categories;

export const getCategoryById = (id: string) => {
  return categories.find((category) => category.id === id);
};

export const getDealProducts = () => {
  return mockProducts.filter((product) => product.dealEndDate);
};

// Get products by type
export const getProductsByType = (type: "dry" | "fresh") => {
  return mockProducts.filter((product) => product.productType === type);
};

// Get products with auto-pricing enabled
export const getAutoPricingProducts = () => {
  return mockProducts.filter((product) => product.autoPricingEnabled);
};
