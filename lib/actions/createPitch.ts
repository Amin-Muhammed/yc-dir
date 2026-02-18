"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSanityImageUrl, parseServerActionResponse } from "../utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  state: any,
  formData: FormData,
  pitch: string,
  image: File | null,
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return parseServerActionResponse({
      error: "You must be logged in to create an idea.",
      status: "ERROR",
    });
  }

  const { title, description, category } = Object.fromEntries(
    Array.from(formData).filter(([key]) => key !== "pitch" && key !== "image"),
  );

  const slug = slugify(title as string);

  try {
    let imageValue = null;

    if (image instanceof File) {
      const uploadedAsset = await writeClient.assets.upload(
        "image",
        Buffer.from(await image.arrayBuffer()),
        {
          filename: image.name,
          contentType: image.type,
        },
      );

      imageValue = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: uploadedAsset._id,
        },
      };
    }

    const startup = {
      title,
      description,
      category,
      image: imageValue,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session.user.id,
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
    console.error(error);
    return parseServerActionResponse({
      error: "Something went wrong while creating the pitch.",
      status: "ERROR",
    });
  }
};
