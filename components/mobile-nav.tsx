"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden" // Overlay
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`} // Mobile navigation
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Điều hướng</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col space-y-2 p-4">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Trang chủ
          </Link>
          <Link
            href="/categories/dry-foods"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Thực phẩm khô
          </Link>
          <Link
            href="/categories/fresh-foods"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Đồ ăn tươi
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Về chúng tôi
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t">
          <span className="text-sm text-gray-500 block">
            Hotline: 0123456789
          </span>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
            <span>🕒</span>
            <span>Mở cửa: 7:00 - 22:00</span>
          </div>
        </div>
      </div>
    </>
  );
}
