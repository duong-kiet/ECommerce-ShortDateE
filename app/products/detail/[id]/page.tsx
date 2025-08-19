import { getProductById, getProducts } from "@/lib/firebase/firestore-app-data";
import { notFound } from "next/navigation";
import { Product } from "@/lib/data";
import ProductDetailClient from "@/components/product-detail-client";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts: Product[] = (await getProducts()).slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
