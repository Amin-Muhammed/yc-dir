import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { START_UP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import markdownit from "markdown-it";
import View from "@/components/View";

const md = markdownit();
interface pageProps {
  params: Promise<{ id: string }>;
}
const page = async ({ params }: pageProps): Promise<ReactNode> => {
  const id = (await params)?.id;
  console.log(id);
  const details = await client.fetch(START_UP_BY_ID_QUERY, { id });
  const { category, author, _createdAt, title, pitch, description, image } =
    details;
  if (!details) {
    return notFound();
  }
  const parsedContent = md.render(pitch || "");
  return (
    <>
      <section className="pink_container min-h-[230px]!">
        <p className="tag">{formatDate(_createdAt)}</p>
        <h1 className="heading">{title}</h1>

        <p className="sub-heading max-w-5xl!">{description}</p>
      </section>
      <section className="section_container">
        <Image
          src={image}
          alt={"thubmnail"}
          width={400}
          height={300}
          className="w-full h-auto rounded-xl"
          loading="lazy"
        />
        <div className="space-y-5! mt-10! max-w-4xl! mx-auto!">
          <div className="flex-between gap-5 justify-between">
            <Link
              href={`/user/${author?._id}`}
              className="flex items-center gap-2 mb-3!"
            >
              <Image
                src={author?.image}
                alt="author avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-xl"
              />
              <div>
                <p className="text-20-medium">{author?.name}</p>
                <p className="text-16-medium text-black-300!">
                  @{author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose! max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No pitch details available.</p>
          )}
        </div>

        <View id={id} />
      </section>
    </>
  );
};

export default page;
