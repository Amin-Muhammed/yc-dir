import React from "react";
import { client } from "@/sanity/lib/client";

import StartUpCard from "./StartUpCard";
import { StartupTypes } from "@/app/(root)/page";
import { USER_STARTUPS_QUERY } from "@/sanity/lib/queries";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(USER_STARTUPS_QUERY, { id });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupTypes) => (
          <StartUpCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};
export default UserStartups;
