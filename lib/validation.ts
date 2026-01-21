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

  image: z
    .file()
    .refine((file) => file.size <= 3 * 1024 * 1024, "Max file size is 3MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPEG, PNG, and WEBP formats are accepted."
    ),

  pitch: z
    .string()
    .min(1, "Pitch should be at least 50 characters.")
    .max(2000, "Pitch should be no more than 2,000 characters."),
});
