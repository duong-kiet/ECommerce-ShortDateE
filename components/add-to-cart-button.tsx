"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

interface AddToCartButtonProps extends React.ComponentProps<typeof Button> {
  id: string;
  name: string;
  price: number; // smallest unit, same as used in Cart page
  imageUrl: string | null;
  quantity?: number;
}

export function AddToCartButton({
  id,
  name,
  price,
  imageUrl,
  quantity = 1,
  onClick,
  children,
  ...btnProps
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    addItem({ id, name, price, imageUrl, quantity });
  };

  return (
    <Button {...btnProps} onClick={handleClick}>
      {children ?? "Thêm vào giỏ"}
    </Button>
  );
}
