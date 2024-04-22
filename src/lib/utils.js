import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const nameRegex = /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF]{3,}$/;
export const lastNameRegex = /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\s]{4,}$/;
export const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
export const nationalCodeRegex = /^[0-9]{10}$/;
