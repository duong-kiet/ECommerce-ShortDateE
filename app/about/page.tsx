import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Về chúng tôi | Shoda",
  description:
    "Tìm hiểu về Shoda – cửa hàng thực phẩm với tính năng Auto-Pricing, giao nhanh và chất lượng đảm bảo.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-10">
        <div className="px-4 lg:px-8">
          {/* Hero */}
          <section className="bg-white rounded-2xl border shadow-sm p-8 lg:p-12 mb-10">
            <div className="max-w-3xl">
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
                Về Shoda
              </h1>
              <p className="text-gray-600 text-base lg:text-lg">
                Chúng tôi mang thực phẩm chất lượng đến tận tay bạn, nhanh chóng
                với giá tốt nhất nhờ công nghệ Auto-Pricing.
              </p>
              <div className="mt-6">
                <img
                  src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=1200&h=450&fit=crop"
                  alt="Thực phẩm tươi ngon được đóng gói và trưng bày"
                  className="w-full rounded-xl object-cover h-56 md:h-72 lg:h-80"
                />
              </div>
            </div>
          </section>

          {/* Mission */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl border p-6">
              <div className="text-3xl mb-3">🚚</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Giao nhanh
              </h3>
              <p className="text-gray-600 text-sm">
                Đặt hàng trực tuyến và nhận hàng trong ngày với mạng lưới giao
                nhận rộng khắp.
              </p>
            </div>
            <div className="bg-white rounded-xl border p-6">
              <div className="text-3xl mb-3">🥬</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tươi ngon
              </h3>
              <p className="text-gray-600 text-sm">
                Sản phẩm được chọn lọc từ nhà cung cấp uy tín, đảm bảo nguồn gốc
                và chất lượng.
              </p>
            </div>
            <div className="bg-white rounded-xl border p-6">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Auto-Pricing
              </h3>
              <p className="text-gray-600 text-sm">
                Công nghệ định giá tự động giúp tối ưu chi phí và mang lại mức
                giá cạnh tranh.
              </p>
            </div>
          </section>

          {/* Stats */}
          <section className="bg-white rounded-2xl border p-6 lg:p-10 mb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">5000+</div>
                <div className="text-sm text-gray-600">Khách hàng hài lòng</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">1000+</div>
                <div className="text-sm text-gray-600">Sản phẩm đa dạng</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600">Hỗ trợ khách hàng</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">15+</div>
                <div className="text-sm text-gray-600">Đối tác tin cậy</div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Giá trị cốt lõi
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>Đặt khách hàng ở trung tâm mọi quyết định</li>
                <li>Minh bạch về giá và nguồn gốc sản phẩm</li>
                <li>Liên tục cải tiến trải nghiệm mua sắm</li>
                <li>Gắn kết với cộng đồng địa phương</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Cam kết của chúng tôi
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Shoda cam kết mang đến trải nghiệm mua sắm đơn giản, giá hợp lý
                và dịch vụ hậu mãi chu đáo.
              </p>
              <p className="text-gray-600 text-sm">
                Nếu bạn có góp ý hoặc câu hỏi, hãy liên hệ với chúng tôi bất kỳ
                lúc nào.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-green-50 border border-green-200 rounded-2xl p-6 lg:p-10 flex items-center justify-between flex-col md:flex-row gap-4">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                Sẵn sàng mua sắm cùng Shoda?
              </h2>
              <p className="text-gray-700 text-sm">
                Khám phá các sản phẩm tươi ngon với giá tốt được cập nhật tự
                động.
              </p>
            </div>
            <div>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <a href="/">Mua sắm ngay</a>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
