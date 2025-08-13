import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const promoData = [
  {
    id: 1,
    title: "Everyday Fresh & Clean with Our Products",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=200&fit=crop",
    link: "/products?category=fresh-vegetables",
  },
  {
    id: 2,
    title: "Make your breakfast healthy and Daily",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=200&fit=crop",
    link: "/products?category=milks-dairies",
  },
  {
    id: 3,
    title: "The best Organic Products Online",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=200&fit=crop",
    link: "/products?category=fresh-fruit",
  },
];

export function PromoBanners() {
  return (
    <section className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promoData.map((promo) => (
          <Card
            key={promo.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-0">
              <div className="relative h-48">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                  <h3 className="text-white font-semibold text-lg mb-4 leading-tight">
                    {promo.title}
                  </h3>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href={promo.link}>Shop Now</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
