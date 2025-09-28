"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar"; // Import your existing Sidebar component
import { Product } from "@/lib/data";

interface MobileSidebarProps {
  products?: (Product & { priceNow?: number; timeLeft?: number })[]; // Pass products to the sidebar
  onCategoryChange?: (categoryId: string) => void;
  onApplyFilters?: () => void;
}

export default function MobileSidebar({
  products,
  onCategoryChange,
  onApplyFilters,
}: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="lg:hidden" // Only show on mobile screens
      >
        <Menu className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black lg:hidden transition-opacity duration-300"
          style={{ opacity: isOpen ? 0.5 : 0 }}
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`} // Mobile sidebar
      >
        <Sidebar
          products={products}
          onCategoryChange={onCategoryChange}
          onApplyFilters={onApplyFilters}
          onClose={closeSidebar} // Pass close function to sidebar
        />
      </div>
    </>
  );
}
