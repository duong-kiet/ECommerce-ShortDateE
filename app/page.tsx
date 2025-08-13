import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { HeroBanner } from "@/components/hero-banner";
import { ProductTypeSection } from "@/components/product-type-section";
import { AutoPricingBanner } from "@/components/auto-pricing-banner";
import { CategoryGrid } from "@/components/category-grid";

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
            {/* Hero Banner */}
            <HeroBanner />

            {/* Auto-Pricing Banner */}
            <AutoPricingBanner />

            {/* Shop by Categories */}
            <CategoryGrid />

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
