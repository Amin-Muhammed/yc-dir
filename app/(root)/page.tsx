import SearchForm from "../../components/SearchForm";
import StartUpCard from "@/components/StartUpCard";
import { startupQuery } from "@/sanity/lib/queries";
import { Author, Startup } from "@/sanity/types/typegen";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export type StartupTypes = Omit<Startup, "author"> & { author?: Author };
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ ["search-query"]?: string }>;
}) {
  const params = await searchParams;
  const query = params["search-query"];
  // const post:  = await client.fetch(startupQuery);
  const { data: post } = await sanityFetch({
    query: startupQuery,
    params: { search: query || null },
  });

  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading">
          Pitch Your Startup,
          <br /> Connect with Entrepreneurs
        </h1>

        <p className="sub-heading max-w-3xl!">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {`${query ? `Search results for "${query}"` : "All Startups"}`}
        </p>

        {post.length > 0 ? (
          <ul className="mt-7 card_grid">
            {post.map((p: StartupTypes) => (
              <StartUpCard key={p?._id} post={p} />
            ))}
          </ul>
        ) : (
          <div>
            <h1 className="mt-7 text-center text-2xl! font-extrabold! text-primary">
              No startups found.
            </h1>
          </div>
        )}
      </section>
      <SanityLive />
    </>
  );
}
