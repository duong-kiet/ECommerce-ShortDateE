import { getProductById, getProducts } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProducts().slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600 transition-colors">
              Trang chủ
            </Link>
            <span>&gt;</span>
            <Link
              href="/products"
              className="hover:text-green-600 transition-colors"
            >
              Sản phẩm
            </Link>
            <span>&gt;</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Product Images */}
          <div>
            {/* Main Image */}
            <div className="relative mb-4">
              <Link href={product.images[0]} target="_blank">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                />
              </Link>
              {/* Sale Badge */}
              <div className="absolute top-4 left-4 bg-pink-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                Sale Off
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative">
                  <Link href={image} target="_blank">
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div>
            {/* Product Name & Status */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <span className="text-gray-600">32 đánh giá</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-green-600">
                {product.default_price.unit_amount.toLocaleString()}đ
              </span>
              <span className="text-xl text-gray-500 line-through">
                {product.old_price
                  ? product.old_price.toLocaleString()
                  : (product.default_price.unit_amount * 1.37).toLocaleString()}
                đ
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            {/* Size/Weight Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Kích thước / Trọng lượng:
              </h3>
              <div className="flex space-x-3">
                {["30g", "60g", "80g", "100g"].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      size === "60g"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex items-center space-x-4 mb-8">
              {/* Quantity */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button className="px-3 py-2 hover:bg-gray-50">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value="1"
                  className="w-16 text-center border-0 focus:outline-none focus:ring-0"
                  min="1"
                />
                <button className="px-3 py-2 hover:bg-gray-50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <Button className="bg-green-600 hover:bg-green-700 px-8 py-3">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Thêm vào giỏ
              </Button>

              {/* Wishlist */}
              <Button variant="outline" size="icon" className="w-12 h-12">
                <Heart className="w-5 h-5" />
              </Button>

              {/* Compare */}
              <Button variant="outline" size="icon" className="w-12 h-12">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Product Specifications */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông số sản phẩm
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Loại:</span>
                  <span className="ml-2 font-medium">Hữu cơ</span>
                </div>
                <div>
                  <span className="text-gray-600">Ngày sản xuất:</span>
                  <span className="ml-2 font-medium">4/6/2020</span>
                </div>
                <div>
                  <span className="text-gray-600">Hạn sử dụng:</span>
                  <span className="ml-2 font-medium">70 ngày</span>
                </div>
                <div>
                  <span className="text-gray-600">Mã sản phẩm:</span>
                  <span className="ml-2 font-medium">FWM215MT</span>
                </div>
                <div>
                  <span className="text-gray-600">Tags:</span>
                  <span className="ml-2 font-medium">Snack, Hữu cơ, Nâu</span>
                </div>
                <div>
                  <span className="text-gray-600">Tồn kho:</span>
                  <span className="ml-2 font-medium text-green-600">
                    8 sản phẩm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          {/* Tab Headers */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {[
                { id: "description", label: "Mô tả", active: true },
                { id: "additional", label: "Thông tin bổ sung" },
                { id: "vendor", label: "Nhà cung cấp" },
                { id: "reviews", label: "Đánh giá (3)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    tab.active
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content and Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Tab Content */}
            <div className="lg:col-span-3 prose max-w-none">
              <div className="space-y-8">
                {/* Description Tab */}
                <div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>

                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Thông số kỹ thuật:
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Loại đóng gói:</span>
                        <span className="ml-2 font-medium">Chai</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Màu sắc:</span>
                        <span className="ml-2 font-medium">
                          Xanh lá, Hồng, Xanh dương, Tím
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          Số lượng mỗi sản phẩm:
                        </span>
                        <span className="ml-2 font-medium">100ml</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Ethyl Alcohol:</span>
                        <span className="ml-2 font-medium">70%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          Số lượng mỗi thùng:
                        </span>
                        <span className="ml-2 font-medium">Carton</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo.
                  </p>

                  {/* Packaging & Delivery */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Đóng gói & Giao hàng
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>

                  {/* Suggested Use */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Hướng dẫn sử dụng
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Không cần bảo quản trong tủ lạnh</li>
                      <li>Khuấy đều trước khi sử dụng</li>
                    </ul>
                  </div>

                  {/* Other Ingredients */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Thành phần khác
                    </h4>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      Hạt điều hữu cơ thô, hạt điều hữu cơ thô. Bơ này được sản
                      xuất bằng quy trình LTO (Low Temperature Grinding).
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Được sản xuất trong máy móc xử lý các loại hạt cây nhưng
                      không xử lý đậu phộng, gluten, sữa hoặc đậu nành.
                    </p>
                  </div>

                  {/* Warnings */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Cảnh báo
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Hiện tượng tách dầu xảy ra tự nhiên</li>
                      <li>Có thể chứa các mảnh vỏ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* New Products Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Sản phẩm mới
                  </h3>
                  <div className="space-y-3">
                    <Link
                      href="/products/prod_1"
                      className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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
                    <Link
                      href="/products/prod_2"
                      className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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
                    <Link
                      href="/products/prod_3"
                      className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Hành động nhanh
                  </h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Heart className="w-4 h-4 mr-2" />
                      Thêm vào yêu thích
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <X className="w-4 h-4 mr-2" />
                      So sánh sản phẩm
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Thêm vào giỏ
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Sản phẩm liên quan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  {/* Status Label */}
                  {parseInt(relatedProduct.id.split("_")[1]) % 4 === 0 && (
                    <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                      Hot
                    </span>
                  )}
                  {parseInt(relatedProduct.id.split("_")[1]) % 4 === 1 && (
                    <span className="absolute top-2 left-2 bg-blue-400 text-white text-xs px-2 py-1 rounded-full">
                      Sale
                    </span>
                  )}
                  {parseInt(relatedProduct.id.split("_")[1]) % 4 === 2 && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                  {parseInt(relatedProduct.id.split("_")[1]) % 4 === 3 && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Best
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {relatedProduct.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-green-600">
                      {relatedProduct.default_price.unit_amount.toLocaleString()}
                      đ
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {relatedProduct.old_price
                        ? relatedProduct.old_price.toLocaleString()
                        : (
                            relatedProduct.default_price.unit_amount * 1.34
                          ).toLocaleString()}
                      đ
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
