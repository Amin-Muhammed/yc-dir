import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
export function formatNouneToLocaleString(
  number: number = 0,
  noun: string = "item"
): string {
  return number <= 0
    ? `No ${noun} yet`
    : number === 1
      ? `1 ${noun}`
      : `${number.toLocaleString()} ${noun}s`;
}
