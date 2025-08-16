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

export const categories: Category[] = [
  {
    id: "dry-foods",
    name: "Thực phẩm khô",
    icon: "🥫",
    productCount: 8,
    products: ["prod_1", "prod_2", "prod_3", "prod_4", "prod_5", "prod_6", "prod_7", "prod_8"],
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
  productCount: 2,
  products: ["prod_5", "prod_17"],
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
    products: ["prod_24", "prod_25", "prod_26", "prod_27", "prod_28", "prod_29"],
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
  productCount: 6,
  products: ["prod_14", "prod_15", "prod_40", "prod_41", "prod_42", "prod_43"],
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
  // DEALS OF THE DAY - Chính xác như trong hình ảnh (đã cố định ngày)
  {
    id: "prod_1",
    name: "Seeds of Change Organic Quinoa, Brown",
    description: "Organic quinoa with rich nutty flavor",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_1", unit_amount: 3285, currency: "usd" },
    originalPrice: 3345,
    inStock: true,
    dealEndDate: "20:30-18/08/2025",
    rating: 4.0,
    productType: "dry",
    factoryDate: "10:00-10/08/2025",
    expiryDate: "22:00-05/09/2025",
    autoPricingEnabled: true,
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
    inStock: true,
    dealEndDate: "08:17-25/08/2025",
    rating: 4.0,
    productType: "dry",
    factoryDate: "09:00-12/08/2025",
    expiryDate: "23:59-15/09/2025",
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
    inStock: true,
    dealEndDate: "08:17-01/09/2025",
    rating: 3.0,
    productType: "dry",
    factoryDate: "09:00-08/08/2025",
    expiryDate: "23:59-20/09/2025",
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
    inStock: true,
    dealEndDate: "08:17-10/09/2025",
    rating: 3.0,
    productType: "dry",
    factoryDate: "09:00-05/08/2025",
    expiryDate: "23:59-28/09/2025",
    autoPricingEnabled: false,
  },

  // DRY FOODS - Thực phẩm khô (đã cố định ngày)
  {
    id: "prod_5",
    name: "Mì gói Hảo Hảo chua cay",
    description: "Mì gói hương vị chua cay đậm đà",
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_5", unit_amount: 3500, currency: "usd" },
    originalPrice: 3500,
    inStock: true,
    rating: 4.2,
    productType: "dry",
    factoryDate: "09:00-01/08/2025",
    expiryDate: "12:00-12/09/2025",
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
    inStock: true,
    rating: 4.5,
    productType: "dry",
    factoryDate: "09:00-02/08/2025",
    expiryDate: "12:00-18/09/2025",
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
    inStock: true,
    rating: 4.3,
    productType: "dry",
    factoryDate: "09:00-15/08/2025",
    expiryDate: "12:00-03/09/2025",
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
    inStock: true,
    rating: 4.7,
    productType: "dry",
    factoryDate: "09:00-30/07/2025",
    expiryDate: "12:00-22/09/2025",
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
    inStock: true,
    rating: 4.8,
    productType: "dry",
    factoryDate: "09:00-01/07/2025",
    expiryDate: "12:00-30/09/2025",
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
    inStock: true,
    rating: 4.4,
    productType: "dry",
    factoryDate: "09:00-20/07/2025",
    expiryDate: "12:00-25/09/2025",
    autoPricingEnabled: true,
  },

  // FRESH FOODS - Đồ ăn tươi (mock nên cũng “bền bỉ” tới 9/2025)
  {
    id: "prod_11",
    name: "Cơm hộp thịt kho tàu",
    description: "Cơm hộp với thịt kho tàu truyền thống",
    images: [
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=500&fit=crop",
    ],
    default_price: { id: "price_11", unit_amount: 35000, currency: "usd" },
    originalPrice: 35000,
    inStock: true,
    rating: 4.1,
    productType: "fresh",
    factoryDate: "06:00-16/08/2025",
    expiryDate: "20:00-02/09/2025",
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
    inStock: true,
    rating: 4.3,
    productType: "fresh",
    factoryDate: "06:30-16/08/2025",
    expiryDate: "20:00-03/09/2025",
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
    inStock: true,
    rating: 4.6,
    productType: "fresh",
    factoryDate: "07:00-16/08/2025",
    expiryDate: "20:00-04/09/2025",
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
    inStock: true,
    rating: 4.2,
    productType: "fresh",
    factoryDate: "07:30-16/08/2025",
    expiryDate: "20:00-05/09/2025",
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
    inStock: true,
    rating: 4.4,
    productType: "fresh",
    factoryDate: "08:00-16/08/2025",
    expiryDate: "20:00-06/09/2025",
    autoPricingEnabled: true,
  },
  // Additional products (prod_16..prod_53)
  {
    id: "prod_16",
    name: "Cơm tấm sườn nướng",
    description: "Cơm tấm với sườn nướng thơm ngon",
    images: ["https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=500&fit=crop"],
    default_price: { id: "price_16", unit_amount: 38000, currency: "usd" },
    originalPrice: 38000,
    inStock: true,
    rating: 4.5,
    productType: "fresh",
    factoryDate: "07:30-16/08/2025",
    expiryDate: "20:00-07/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_17",
    name: "Mì gói 3 Miền tôm chua cay",
    description: "Mì gói hương vị tôm chua cay",
    images: ["https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop"],
    default_price: { id: "price_17", unit_amount: 3000, currency: "usd" },
    originalPrice: 3000,
    inStock: true,
    rating: 4.0,
    productType: "dry",
    factoryDate: "09:00-01/08/2025",
    expiryDate: "12:00-12/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_18",
    name: "Thịt hộp SPAM",
    description: "Thịt hộp SPAM truyền thống",
    images: ["https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=500&fit=crop"],
    default_price: { id: "price_18", unit_amount: 35000, currency: "usd" },
    originalPrice: 35000,
    inStock: true,
    rating: 4.3,
    productType: "dry",
    factoryDate: "09:00-02/08/2025",
    expiryDate: "12:00-18/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_19",
    name: "Cá hộp sốt cà",
    description: "Cá hộp vị sốt cà chua đậm đà",
    images: ["https://images.unsplash.com/photo-1604907773060-1b4fdbb4b77c?w=500&h=500&fit=crop"],
    default_price: { id: "price_19", unit_amount: 28000, currency: "usd" },
    originalPrice: 30000,
    inStock: true,
    rating: 4.2,
    productType: "dry",
    factoryDate: "09:00-03/08/2025",
    expiryDate: "12:00-22/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_20",
    name: "Đậu hộp",
    description: "Đậu trắng đóng hộp tiện lợi",
    images: ["https://images.unsplash.com/photo-1540907048-4d9b89d4d5f1?w=500&h=500&fit=crop"],
    default_price: { id: "price_20", unit_amount: 22000, currency: "usd" },
    originalPrice: 22000,
    inStock: true,
    rating: 4.0,
    productType: "dry",
    factoryDate: "09:00-04/08/2025",
    expiryDate: "12:00-24/09/2025",
    autoPricingEnabled: false,
  },
  {
    id: "prod_21",
    name: "Ngô ngọt đóng hộp",
    description: "Ngô ngọt giòn ngọt tự nhiên",
    images: ["https://images.unsplash.com/photo-1604908554041-3af6d506a5d0?w=500&h=500&fit=crop"],
    default_price: { id: "price_21", unit_amount: 26000, currency: "usd" },
    originalPrice: 27000,
    inStock: true,
    rating: 4.1,
    productType: "dry",
    factoryDate: "09:00-05/08/2025",
    expiryDate: "12:00-26/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_22",
    name: "Cá mòi dầu ô-liu",
    description: "Cá mòi ngâm dầu ô-liu thơm béo",
    images: ["https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=500&fit=crop"],
    default_price: { id: "price_22", unit_amount: 32000, currency: "usd" },
    originalPrice: 34000,
    inStock: true,
    rating: 4.3,
    productType: "dry",
    factoryDate: "09:00-06/08/2025",
    expiryDate: "12:00-28/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_23",
    name: "Thịt bò hầm hộp",
    description: "Thịt bò hầm sẵn, tiện lợi",
    images: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=500&fit=crop"],
    default_price: { id: "price_23", unit_amount: 39000, currency: "usd" },
    originalPrice: 42000,
    inStock: true,
    rating: 4.4,
    productType: "dry",
    factoryDate: "09:00-07/08/2025",
    expiryDate: "12:00-30/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_24",
    name: "Nước ngọt Cola",
    description: "Nước ngọt có gas hương cola",
    images: ["https://images.unsplash.com/photo-1541976076758-347942db1970?w=500&h=500&fit=crop"],
    default_price: { id: "price_24", unit_amount: 12000, currency: "usd" },
    originalPrice: 13000,
    inStock: true,
    rating: 4.0,
    productType: "dry",
    factoryDate: "09:00-08/08/2025",
    expiryDate: "12:00-05/10/2025",
    autoPricingEnabled: false,
  },
  {
    id: "prod_25",
    name: "Nước tăng lực",
    description: "Nước tăng lực vị truyền thống",
    images: ["https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=500&fit=crop"],
    default_price: { id: "price_25", unit_amount: 15000, currency: "usd" },
    originalPrice: 16000,
    inStock: true,
    rating: 4.1,
    productType: "dry",
    factoryDate: "09:00-09/08/2025",
    expiryDate: "12:00-08/10/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_26",
    name: "Trà xanh đóng chai",
    description: "Trà xanh thanh mát",
    images: ["https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500&h=500&fit=crop"],
    default_price: { id: "price_26", unit_amount: 13000, currency: "usd" },
    originalPrice: 14000,
    inStock: true,
    rating: 4.2,
    productType: "dry",
    factoryDate: "09:00-10/08/2025",
    expiryDate: "12:00-15/10/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_27",
    name: "Nước khoáng",
    description: "Nước khoáng thiên nhiên",
    images: ["https://images.unsplash.com/photo-1560841656-59934836d88d?w=500&h=500&fit=crop"],
    default_price: { id: "price_27", unit_amount: 8000, currency: "usd" },
    originalPrice: 8000,
    inStock: true,
    rating: 4.5,
    productType: "dry",
    factoryDate: "09:00-11/08/2025",
    expiryDate: "12:00-20/10/2025",
    autoPricingEnabled: false,
  },
  {
    id: "prod_28",
    name: "Nước trái cây hỗn hợp",
    description: "Nước ép trái cây tổng hợp",
    images: ["https://images.unsplash.com/photo-1556679343-c7306c2b21f8?w=500&h=500&fit=crop"],
    default_price: { id: "price_28", unit_amount: 20000, currency: "usd" },
    originalPrice: 21000,
    inStock: true,
    rating: 4.3,
    productType: "dry",
    factoryDate: "09:00-12/08/2025",
    expiryDate: "12:00-22/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_29",
    name: "Trà sữa đóng chai",
    description: "Trà sữa hương vị truyền thống",
    images: ["https://images.unsplash.com/photo-1594631252845-29bb0f4d3f1a?w=500&h=500&fit=crop"],
    default_price: { id: "price_29", unit_amount: 22000, currency: "usd" },
    originalPrice: 23000,
    inStock: true,
    rating: 4.1,
    productType: "dry",
    factoryDate: "09:00-13/08/2025",
    expiryDate: "12:00-26/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_30",
    name: "Bim bim khoai tây",
    description: "Snack khoai tây giòn tan",
    images: ["https://images.unsplash.com/photo-1546554137-f86b9593a222?w=500&h=500&fit=crop"],
    default_price: { id: "price_30", unit_amount: 12000, currency: "usd" },
    originalPrice: 12000,
    inStock: true,
    rating: 4.6,
    productType: "dry",
    factoryDate: "09:00-14/08/2025",
    expiryDate: "12:00-10/10/2025",
    autoPricingEnabled: false,
  },
  {
    id: "prod_31",
    name: "Kẹo mềm trái cây",
    description: "Kẹo mềm hương trái cây",
    images: ["https://images.unsplash.com/photo-1581553676871-2c4f3d2a2cdf?w=500&h=500&fit=crop"],
    default_price: { id: "price_31", unit_amount: 10000, currency: "usd" },
    originalPrice: 11000,
    inStock: true,
    rating: 4.2,
    productType: "dry",
    factoryDate: "09:00-15/08/2025",
    expiryDate: "12:00-18/10/2025",
    autoPricingEnabled: false,
  },
  {
    id: "prod_32",
    name: "Chocolate đen 70%",
    description: "Chocolate đen nguyên chất 70% cacao",
    images: ["https://images.unsplash.com/photo-1548907040-4b7acb5b3f53?w=500&h=500&fit=crop"],
    default_price: { id: "price_32", unit_amount: 35000, currency: "usd" },
    originalPrice: 36000,
    inStock: true,
    rating: 4.7,
    productType: "dry",
    factoryDate: "09:00-16/08/2025",
    expiryDate: "12:00-25/10/2025",
    autoPricingEnabled: false,
  },
  {
    id: "prod_33",
    name: "Bánh quy bơ",
    description: "Bánh quy bơ thơm béo",
    images: ["https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&h=500&fit=crop"],
    default_price: { id: "price_33", unit_amount: 24000, currency: "usd" },
    originalPrice: 25000,
    inStock: true,
    rating: 4.5,
    productType: "dry",
    factoryDate: "09:00-17/08/2025",
    expiryDate: "12:00-30/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_34",
    name: "Muối hồng Himalaya",
    description: "Muối hồng tinh khiết",
    images: ["https://images.unsplash.com/photo-1598514983071-8e25c70cf36c?w=500&h=500&fit=crop"],
    default_price: { id: "price_34", unit_amount: 18000, currency: "usd" },
    originalPrice: 20000,
    inStock: true,
    rating: 4.4,
    productType: "dry",
    factoryDate: "09:00-18/08/2025",
    expiryDate: "12:00-31/10/2025",
    autoPricingEnabled: false,
  },
  {
    id: "prod_35",
    name: "Tiêu đen xay",
    description: "Tiêu đen xay nhuyễn thơm nồng",
    images: ["https://images.unsplash.com/photo-1555255707-c07966088b7b?w=500&h=500&fit=crop"],
    default_price: { id: "price_35", unit_amount: 22000, currency: "usd" },
    originalPrice: 23000,
    inStock: true,
    rating: 4.6,
    productType: "dry",
    factoryDate: "09:00-19/08/2025",
    expiryDate: "12:00-29/10/2025",
    autoPricingEnabled: false,
  },
  {
    id: "prod_36",
    name: "Dầu ô-liu extra virgin",
    description: "Dầu ô-liu nguyên chất",
    images: ["https://images.unsplash.com/photo-1558036117-15d82a90b9b4?w=500&h=500&fit=crop"],
    default_price: { id: "price_36", unit_amount: 120000, currency: "usd" },
    originalPrice: 125000,
    inStock: true,
    rating: 4.7,
    productType: "dry",
    factoryDate: "09:00-20/08/2025",
    expiryDate: "12:00-31/10/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_37",
    name: "Gạo thơm Jasmine",
    description: "Gạo thơm hạt dài",
    images: ["https://images.unsplash.com/photo-1564053489984-317bbd824340?w=500&h=500&fit=crop"],
    default_price: { id: "price_37", unit_amount: 180000, currency: "usd" },
    originalPrice: 185000,
    inStock: true,
    rating: 4.8,
    productType: "dry",
    factoryDate: "09:00-21/08/2025",
    expiryDate: "12:00-30/10/2025",
    autoPricingEnabled: false,
  },
  {
    id: "prod_38",
    name: "Yến mạch cán mỏng",
    description: "Yến mạch dinh dưỡng cho bữa sáng",
    images: ["https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=500&h=500&fit=crop"],
    default_price: { id: "price_38", unit_amount: 55000, currency: "usd" },
    originalPrice: 58000,
    inStock: true,
    rating: 4.5,
    productType: "dry",
    factoryDate: "09:00-22/08/2025",
    expiryDate: "12:00-15/10/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_39",
    name: "Hạt hạnh nhân",
    description: "Hạnh nhân Mỹ nguyên hạt",
    images: ["https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&h=500&fit=crop"],
    default_price: { id: "price_39", unit_amount: 150000, currency: "usd" },
    originalPrice: 155000,
    inStock: true,
    rating: 4.6,
    productType: "dry",
    factoryDate: "09:00-23/08/2025",
    expiryDate: "12:00-20/10/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_40",
    name: "Cơm gà xối mỡ",
    description: "Cơm gà xối mỡ nóng hổi",
    images: ["https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=500&fit=crop"],
    default_price: { id: "price_40", unit_amount: 42000, currency: "usd" },
    originalPrice: 42000,
    inStock: true,
    rating: 4.3,
    productType: "fresh",
    factoryDate: "06:30-16/08/2025",
    expiryDate: "20:00-08/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_41",
    name: "Cơm gà nướng mật ong",
    description: "Cơm gà nướng sốt mật ong",
    images: ["https://images.unsplash.com/photo-1604908553941-5f40f63dc67d?w=500&h=500&fit=crop"],
    default_price: { id: "price_41", unit_amount: 45000, currency: "usd" },
    originalPrice: 45000,
    inStock: true,
    rating: 4.4,
    productType: "fresh",
    factoryDate: "06:45-16/08/2025",
    expiryDate: "20:00-09/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_42",
    name: "Salad ức gà",
    description: "Salad ức gà tươi ngon",
    images: ["https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&h=500&fit=crop"],
    default_price: { id: "price_42", unit_amount: 38000, currency: "usd" },
    originalPrice: 38000,
    inStock: true,
    rating: 4.2,
    productType: "fresh",
    factoryDate: "07:00-16/08/2025",
    expiryDate: "20:00-10/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_43",
    name: "Salad cá ngừ",
    description: "Salad cá ngừ tươi",
    images: ["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop"],
    default_price: { id: "price_43", unit_amount: 39000, currency: "usd" },
    originalPrice: 40000,
    inStock: true,
    rating: 4.1,
    productType: "fresh",
    factoryDate: "07:15-16/08/2025",
    expiryDate: "20:00-11/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_44",
    name: "Sandwich trứng",
    description: "Sandwich trứng béo ngậy",
    images: ["https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=500&fit=crop"],
    default_price: { id: "price_44", unit_amount: 30000, currency: "usd" },
    originalPrice: 30000,
    inStock: true,
    rating: 4.0,
    productType: "fresh",
    factoryDate: "07:30-16/08/2025",
    expiryDate: "20:00-12/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_45",
    name: "Sandwich jambon phô mai",
    description: "Sandwich jambon và phô mai",
    images: ["https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=500&fit=crop"],
    default_price: { id: "price_45", unit_amount: 32000, currency: "usd" },
    originalPrice: 32000,
    inStock: true,
    rating: 4.2,
    productType: "fresh",
    factoryDate: "07:45-16/08/2025",
    expiryDate: "20:00-13/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_46",
    name: "Sandwich gà sốt tiêu",
    description: "Sandwich gà sốt tiêu đen",
    images: ["https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=500&fit=crop"],
    default_price: { id: "price_46", unit_amount: 34000, currency: "usd" },
    originalPrice: 35000,
    inStock: true,
    rating: 4.3,
    productType: "fresh",
    factoryDate: "08:00-16/08/2025",
    expiryDate: "20:00-14/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_47",
    name: "Sushi cá ngừ 8 miếng",
    description: "Sushi cá ngừ tươi",
    images: ["https://images.unsplash.com/photo-1544025163-3a6f3e5a9a3a?w=500&h=500&fit=crop"],
    default_price: { id: "price_47", unit_amount: 110000, currency: "usd" },
    originalPrice: 110000,
    inStock: true,
    rating: 4.5,
    productType: "fresh",
    factoryDate: "08:15-16/08/2025",
    expiryDate: "20:00-15/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_48",
    name: "Sushi thập cẩm 10 miếng",
    description: "Combo sushi thập cẩm",
    images: ["https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&h=500&fit=crop"],
    default_price: { id: "price_48", unit_amount: 135000, currency: "usd" },
    originalPrice: 135000,
    inStock: true,
    rating: 4.6,
    productType: "fresh",
    factoryDate: "08:30-16/08/2025",
    expiryDate: "20:00-16/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_49",
    name: "Sashimi cá hồi",
    description: "Sashimi cá hồi tươi",
    images: ["https://images.unsplash.com/photo-1544025165-5b0b9f5d3f91?w=500&h=500&fit=crop"],
    default_price: { id: "price_49", unit_amount: 160000, currency: "usd" },
    originalPrice: 160000,
    inStock: true,
    rating: 4.7,
    productType: "fresh",
    factoryDate: "08:45-16/08/2025",
    expiryDate: "20:00-17/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_50",
    name: "Canh rau củ",
    description: "Canh rau củ thanh đạm",
    images: ["https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=500&fit=crop"],
    default_price: { id: "price_50", unit_amount: 30000, currency: "usd" },
    originalPrice: 30000,
    inStock: true,
    rating: 4.0,
    productType: "fresh",
    factoryDate: "06:00-16/08/2025",
    expiryDate: "20:00-18/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_51",
    name: "Súp bí đỏ",
    description: "Súp bí đỏ kem",
    images: ["https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500&h=500&fit=crop"],
    default_price: { id: "price_51", unit_amount: 32000, currency: "usd" },
    originalPrice: 32000,
    inStock: true,
    rating: 4.2,
    productType: "fresh",
    factoryDate: "06:15-16/08/2025",
    expiryDate: "20:00-19/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_52",
    name: "Thịt nướng mật ong",
    description: "Thịt nướng sốt mật ong",
    images: ["https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=500&fit=crop"],
    default_price: { id: "price_52", unit_amount: 65000, currency: "usd" },
    originalPrice: 65000,
    inStock: true,
    rating: 4.5,
    productType: "fresh",
    factoryDate: "06:30-16/08/2025",
    expiryDate: "20:00-20/09/2025",
    autoPricingEnabled: true,
  },
  {
    id: "prod_53",
    name: "Rau củ hấp",
    description: "Rau củ hấp chín tới",
    images: ["https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=500&fit=crop"],
    default_price: { id: "price_53", unit_amount: 28000, currency: "usd" },
    originalPrice: 28000,
    inStock: true,
    rating: 4.1,
    productType: "fresh",
    factoryDate: "06:45-16/08/2025",
    expiryDate: "20:00-21/09/2025",
    autoPricingEnabled: true,
  }
 ];

export const getProducts = () => mockProducts;

export const getProductById = (id: string) => {
  return mockProducts.find((product) => product.id === id);
};

export const getProductsByCategory = (categoryId: string) => {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return [];
  const byId = new Map(mockProducts.map((p) => [p.id, p] as const));
  return category.products
    .map((pid) => byId.get(pid))
    .filter((p): p is MockProduct => Boolean(p));
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
