import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { HeroPricingCarousel } from "@/components/hero-pricing-carousel";
import { FreshFoodCarousel } from "@/components/fresh-food-carousel";
import { ProductTypeSection } from "@/components/product-type-section";
import { CategoryGrid } from "@/components/category-grid";
import PromoCards from "@/components/promo-cards";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0 px-4 lg:px-8">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1 px-4 lg:px-8 space-y-8">
            {/* Carousel 1: Hero Banner + Auto Pricing System */}
            <HeroPricingCarousel />

            {/* Carousel 2: Fresh Food Daily Deals (Autoplay) */}
            <FreshFoodCarousel />

            {/* Shop by Categories */}
            <CategoryGrid />

            <PromoCards />

            {/* Thực phẩm khô - Đóng gói */}
            <ProductTypeSection
              type="dry"
              title="Thực phẩm khô - Đóng gói"
              subtitle="Còn HSD 15-90 ngày: mì gói, đồ hộp, sữa, nước giải khát, bánh kẹo, gia vị, ngũ cốc..."
              maxProducts={8}
            />

            {/* Đồ ăn tươi - Tiêu dùng trong ngày */}
            <ProductTypeSection
              type="fresh"
              title="Đồ ăn tươi - Tiêu dùng trong ngày"
              subtitle="HSD 0-1 ngày: cơm hộp, sandwich, sushi, món nấu sẵn từ bếp trung tâm..."
              maxProducts={6}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
