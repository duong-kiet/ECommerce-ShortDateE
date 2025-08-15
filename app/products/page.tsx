import { getProducts } from "@/lib/mock-data";
import { DealsOfTheDaySection } from "@/components/deals-of-the-day-section";
import { ChevronDown, Search, ShoppingCart, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/add-to-cart-button";
import ProtectedRoute from "@/components/ui/protected-route";

export default async function ProductsPage() {
  const products = getProducts();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Chúng tôi tìm thấy {products.length} sản phẩm cho bạn
                </h1>
              </div>

              <div className="flex items-center space-x-4">
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

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Cart */}
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex gap-8">
            {/* Left Sidebar - Filters and Categories */}
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
                        <span className="text-xl">🥛</span>
                        <span className="text-sm text-gray-700">
                          Sữa & Sản phẩm từ sữa
                        </span>
                      </div>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        3
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">👕</span>
                        <span className="text-sm text-gray-700">Quần áo</span>
                      </div>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        4
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🐕</span>
                        <span className="text-sm text-gray-700">
                          Thức ăn thú cưng
                        </span>
                      </div>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        7
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🧁</span>
                        <span className="text-sm text-gray-700">
                          Nguyên liệu làm bánh
                        </span>
                      </div>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        11
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🍎</span>
                        <span className="text-sm text-gray-700">
                          Trái cây tươi
                        </span>
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
                          <span className="text-sm text-gray-600">
                            Mới (150)
                          </span>
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
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
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
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Product Grid */}
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
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 9).map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      {/* Status Label */}
                      {parseInt(product.id.split("_")[1]) % 4 === 0 && (
                        <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                          Hot
                        </span>
                      )}
                      {parseInt(product.id.split("_")[1]) % 4 === 1 && (
                        <span className="absolute top-2 left-2 bg-blue-400 text-white text-xs px-2 py-1 rounded-full">
                          Sale
                        </span>
                      )}
                      {parseInt(product.id.split("_")[1]) % 4 === 2 && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                      {parseInt(product.id.split("_")[1]) % 4 === 3 && (
                        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                          Best
                        </span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="text-sm text-gray-500 mb-1">
                        Hodo Foods
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 h-12 overflow-hidden">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-2">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600">5.0</span>
                        <span className="text-sm text-gray-500">100g</span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3 h-10 overflow-hidden">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore.
                      </p>

                      {/* Price */}
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-lg font-bold text-green-600">
                          {product.default_price.unit_amount.toLocaleString()}đ
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {product.old_price
                            ? product.old_price.toLocaleString()
                            : (
                                product.default_price.unit_amount * 1.1
                              ).toLocaleString()}
                          đ
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <AddToCartButton
                          id={product.id}
                          name={product.name}
                          price={product.default_price.unit_amount}
                          imageUrl={product.images[0]}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Thêm vào giỏ
                        </AddToCartButton>
                        <Button variant="outline" size="sm">
                          So sánh
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5, 6].map((page) => (
                    <button
                      key={page}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        page === 2
                          ? "bg-green-600 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deals Of The Day Section */}
              <div className="mt-16">
                <DealsOfTheDaySection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
