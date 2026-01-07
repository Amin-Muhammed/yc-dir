import * as z from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title should be at least 5 characters.")
    .max(60, "Title should be no more than 60 characters."),

  description: z
    .string()
    .min(20, "Description should be at least 20 characters.")
    .max(1000, "Description should be no more than 1,000 characters."),

  category: z
    .string()
    .min(3, "Category should be at least 3 characters.")
    .max(30, "Category should be no more than 30 characters."),

  link: z
    .string()
    .url("Please enter a valid image URL.")
    .refine(
      async (url) => {
        try {
          const res = await fetch(url, { method: "HEAD" });
          const contentType = res.headers.get("content-type");
          return contentType?.startsWith("image/");
        } catch {
          return false;
        }
      },
      {
        message: "The URL must point to a valid image (jpg, png, webp, etc.).",
      }
    ),

  pitch: z
    .string()
    .min(50, "Pitch should be at least 50 characters.")
    .max(2000, "Pitch should be no more than 2,000 characters."),
});
