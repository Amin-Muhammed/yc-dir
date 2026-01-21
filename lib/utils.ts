import { urlFor } from "@/sanity/lib/image";
import { SanityImageAsset, Startup } from "@/sanity/types/typegen";
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
  noun: string = "item",
): string {
  return number <= 0
    ? `No ${noun} yet`
    : number === 1
      ? `1 ${noun}`
      : `${number.toLocaleString()} ${noun}s`;
}
export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response)) as T;
}
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/-+/g, "-"); // remove duplicate -
}
export function getSanityImageUrl(image: Startup["image"]): string {
  if (!image) return "";
  console.log(image);
  return urlFor(image).width(1200).quality(100).url();
}
