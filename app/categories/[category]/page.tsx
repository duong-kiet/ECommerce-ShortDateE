import { ProductList } from "@/components/product-list";
import { getProducts } from "@/lib/mock-data";
import { Sidebar } from "@/components/sidebar";
import { DealsOfTheDaySection } from "@/components/deals-of-the-day-section";
import { Header } from "@/components/header";
import {
  ChevronDown,
  Search,
  ShoppingCart,
  Grid,
  List,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";

interface ProductCategoryPageProps {
  params: {
    category: string;
  };
}

export default async function ProductCategoryPage({
  params,
}: ProductCategoryPageProps) {
  const { category } = params;
  // console.log(category); drink
  const products = getProducts();

  // Mock category mapping
  const categoryMap: Record<
    string,
    { name: string; icon: string; description: string }
  > = {
    drink: {
      name: "Nước giải khát",
      icon: "🥤",
      description: "Các loại nước giải khát tươi mới, đa dạng hương vị",
    },
    noodle: {
      name: "Mì gói",
      icon: "🍜",
      description: "Mì gói các loại, nhanh gọn và tiện lợi",
    },
    snack: {
      name: "Bánh kẹo",
      icon: "🍪",
      description: "Bánh kẹo ngọt ngào, đa dạng chủng loại",
    },
    canned: {
      name: "Đồ hộp",
      icon: "🥫",
      description: "Thực phẩm đóng hộp, bảo quản lâu dài",
    },
    "dry-food": {
      name: "Đồ khô",
      icon: "🥫",
      description: "Thực phẩm khô, bảo quản lâu dài",
    },
  };

  const categoryInfo = categoryMap[category];
  if (!categoryInfo) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Header Section */}
      <div className="mt-8 py-8 bg-[#d8f1e5] rounded-xl">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-3xl">{categoryInfo.icon}</span>
                {categoryInfo.name}
              </h1>
              <p className="text-gray-600 mt-1 font-bold">
                {categoryInfo.description}
              </p>
              <div className="text-sm text-gray-500 mt-2">
                <Link
                  href="/"
                  className="hover:text-green-600 transition-colors"
                >
                  Trang chủ
                </Link>
                {" > "}
                <Link
                  href="/products"
                  className="hover:text-green-600 transition-colors"
                >
                  Sản phẩm
                </Link>
                {" > "}
                <span className="text-gray-900">{categoryInfo.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex gap-8">
          {/* Left Side - Product List (Vertical) */}
          <div className="flex-1">
            {/* Product Listing Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Chúng tôi tìm thấy {products.length} sản phẩm cho bạn!
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                {/* Show Dropdown */}
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Hiển thị 10</option>
                    <option>Hiển thị 20</option>
                    <option>Hiển thị 50</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Sắp xếp theo: Nổi bật</option>
                    <option>Giá: Thấp đến cao</option>
                    <option>Giá: Cao đến thấp</option>
                    <option>Mới nhất</option>
                    <option>Bán chạy nhất</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-r-none border-r"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-l-none">
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product List - Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  label={
                    index === 0
                      ? "Hot"
                      : index === 1
                      ? "Sale"
                      : index === 2
                      ? "New"
                      : undefined
                  }
                  rating={product.rating}
                  brand="By NestFood"
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5, 6].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      page === 1
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Filters */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Category Section */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Danh mục
                </h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🍜</span>
                      <span className="text-sm text-gray-700">Mì tôm</span>
                    </div>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      4
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🥤</span>
                      <span className="text-sm text-gray-700">Nước</span>
                    </div>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      4
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🥛</span>
                      <span className="text-sm text-gray-700">Sữa</span>
                    </div>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      7
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🍪</span>
                      <span className="text-sm text-gray-700">Bánh kẹo</span>
                    </div>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      11
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🌾</span>
                      <span className="text-sm text-gray-700">Ngũ cốc</span>
                    </div>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      14
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Filter Section */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Lọc theo giá
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>500.000đ</span>
                      <span>1.000.000đ</span>
                    </div>
                    <input
                      type="range"
                      min="500000"
                      max="1000000"
                      defaultValue="750000"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* Color Filter */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Màu sắc
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="text-green-600" />
                        <span className="text-sm text-gray-600">Đỏ (56)</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="text-green-600" />
                        <span className="text-sm text-gray-600">
                          Xanh lá (78)
                        </span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="text-green-600" />
                        <span className="text-sm text-gray-600">
                          Xanh dương (34)
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Item Condition Filter */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Tình trạng sản phẩm
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="text-green-600" />
                        <span className="text-sm text-gray-600">Mới (150)</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="text-green-600" />
                        <span className="text-sm text-gray-600">
                          Đã qua sử dụng (27)
                        </span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="text-green-600" />
                        <span className="text-sm text-gray-600">Cũ (45)</span>
                      </label>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Filter className="w-4 h-4 mr-2" />
                    Lọc sản phẩm
                  </Button>
                </div>
              </div>

              {/* New Products Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Sản phẩm mới
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <Link
                      href="/products/prod_1"
                      className="flex items-center space-x-3 w-full"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=60&h=60&fit=crop"
                        alt="Orange Juice"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          Nước cam tươi
                        </h4>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-sm text-green-600 font-medium">
                            99.500đ
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <Link
                      href="/products/prod_2"
                      className="flex items-center space-x-3 w-full"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=60&h=60&fit=crop"
                        alt="Banana"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          Chuối tươi
                        </h4>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-sm text-green-600 font-medium">
                            69.500đ
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <Link
                      href="/products/prod_3"
                      className="flex items-center space-x-3 w-full"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=60&h=60&fit=crop"
                        alt="Red Jacket"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          Áo khoác đỏ
                        </h4>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-sm text-green-600 font-medium">
                            25.000đ
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Of The Day Section */}
        <div className="mt-16">
          <DealsOfTheDaySection />
        </div>
      </div>
    </div>
  );
}
