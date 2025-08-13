"use server";

import { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void> => {
  const itemsJson = formData.get("items") as string;
  const items = JSON.parse(itemsJson);

  // Tạm thời vô hiệu hóa Stripe checkout
  // Thay thế bằng thông báo đơn giản
  console.log("Checkout items:", items);

  // Chuyển hướng đến trang thành công với thông báo
  redirect("/success?message=Order placed successfully (Stripe disabled)");
};
