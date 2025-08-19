import { ProductCard } from "./product-card";
import { getProductsByType } from "@/lib/firebase/firestore-app-data";
import { Product } from "@/lib/data";

interface ProductTypeSectionProps {
  type: "dry" | "fresh"
  title: string
  subtitle?: string
  maxProducts?: number
}

export default async function ProductTypeSection({
  type,
  title,
  subtitle,
  maxProducts = 4,
}: ProductTypeSectionProps) {
  const products: Product[] = await getProductsByType(type)
  const displayedProducts = products.slice(0, maxProducts)

  const getTypeDescription = () => {
    if (subtitle) return subtitle
    if (type === "dry") {
      return "Thực phẩm khô - đóng gói (HSD 15-90 ngày): mì gói, đồ hộp, sữa, nước giải khát, bánh kẹo, gia vị, ngũ cốc..."
    }
    return "Đồ ăn tươi - tiêu dùng trong ngày (HSD 0-1 ngày): cơm hộp, sandwich, sushi, món nấu sẵn..."
  }

  const getTypeIcon = () => {
    return type === "dry" ? "🥫" : "🥗"
  }

  return (
    <section className="py-8 w-full">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{getTypeIcon()}</span>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <p className="text-sm text-gray-600">{getTypeDescription()}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts.map((product, index) => (
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
    </section>
  )
}