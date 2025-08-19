import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeParentheses(text: string): string {
  return text.replace(/\s*\(.*?\)\s*/g, "");
}

