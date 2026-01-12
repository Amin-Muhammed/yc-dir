"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
export const createPitch = async (state, formData: FormData, pitch) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return parseServerActionResponse({
      error: "You must be logged in to create an idea.",
      status: "ERROR",
    });
  }
  const { title, description, category, link } = Object.fromEntries(
    Array.from(formData).filter(([key]) => key !== "pitch")
  );
  const slug = slugify(title as string);
  try {
    const startup = {
      title,
      description,
      category,
      image: link,

      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.user.id, //session.user.id,
      },
      pitch,
    };

    const result = await writeClient.create({
      _type: "startup",
      ...startup,
    });

    return parseServerActionResponse({
      ...result,
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
