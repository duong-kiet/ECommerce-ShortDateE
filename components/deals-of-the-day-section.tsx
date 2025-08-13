"use client";

import { MockProduct, getDealProducts } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { ProductCard } from "./product-card";
import Link from "next/link";

interface CountdownTimer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(endDate: string): CountdownTimer {
  const [timeLeft, setTimeLeft] = useState<CountdownTimer>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const difference = end - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return timeLeft;
}

function CountdownTimer({ endDate }: { endDate: string }) {
  const { days, hours, minutes, seconds } = useCountdown(endDate);

  return (
    <div className="absolute bottom-2 left-2 flex space-x-1">
      <div className="bg-white rounded px-2 py-1 text-center min-w-[40px]">
        <div className="text-xs font-bold text-gray-900">{days}</div>
        <div className="text-xs text-gray-500">Days</div>
      </div>
      <div className="bg-white rounded px-2 py-1 text-center min-w-[40px]">
        <div className="text-xs font-bold text-gray-900">
          {hours.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-gray-500">Hours</div>
      </div>
      <div className="bg-white rounded px-2 py-1 text-center min-w-[40px]">
        <div className="text-xs font-bold text-gray-900">
          {minutes.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-gray-500">Mins</div>
      </div>
      <div className="bg-white rounded px-2 py-1 text-center min-w-[40px]">
        <div className="text-xs font-bold text-gray-900">
          {seconds.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-gray-500">Sec</div>
      </div>
    </div>
  );
}

export function DealsOfTheDaySection() {
  const dealProducts = getDealProducts();

  // Brand mapping cho deals
  const getBrandForDeal = (index: number) => {
    const brands = [
      "By NestFood",
      "By Old El Paso",
      "By Progresso",
      "By Yoplait",
    ];
    return brands[index] || "By NestFood";
  };

  return (
    <section className="py-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Deals Of The Day</h2>
        <Link
          href="/deals"
          className="text-sm text-gray-500 hover:text-green-600"
        >
          All Deals &gt;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dealProducts.map((product, index) => (
          <div key={product.id} className="relative">
            {product.dealEndDate && (
              <CountdownTimer endDate={product.dealEndDate} />
            )}
            <ProductCard
              product={product}
              rating={product.rating}
              brand={getBrandForDeal(index)}
              isDeal={true}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
