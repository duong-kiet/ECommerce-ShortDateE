"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-16 -mx-4 lg:-mx-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stay home & get your daily needs from our shop
          </h2>
          <p className="text-lg text-gray-600">
            Start your daily shopping with Nest Mart
          </p>
        </div>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
