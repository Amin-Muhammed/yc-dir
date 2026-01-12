import { cn, formatDate } from "@/lib/utils";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "./ui/button";
import { StartupTypes } from "@/app/(root)/page";
import { Skeleton } from "./ui/skeleton";

const StartUpCard = ({ post }: { post: StartupTypes }): ReactNode => {
  const {
    author,
    title,
    _id,
    _createdAt,
    views,
    description,
    category,
    image,
  } = post;
  return (
    <li className="startup-card group">
      <div className="flex-between ">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <Eye color="red" />
          <span className="text-16-medium!">{views ?? "not provided"}</span>
        </div>
      </div>
      <div className="flex-between mt-5! gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium! line-clamp-1!">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image || "https://placehold.co/48x48"}
            alt="place holder"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`} className="">
        <p className="startup-card_desc">{description}</p>
        <Image // remember to provide fall back image
          className="startup-card_img"
          src={image || "https://placehold.co/400x400"}
          alt="place holder"
          width={600}
          height={400}
        />
      </Link>
      <div
        className="flex-between 
       gap-3 mt-5! "
      >
        <Link
          href={`/?query=${category?.toLowerCase()}`}
          className="startup-card_category"
        >
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};
export const StartUpCardSkeleton = (): ReactNode => {
  return (
    <>
      {[1, 2, 3, 4].map((index) => (
        <li key={cn("skeleton", index)}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
    </>
  );
};
export default StartUpCard;
