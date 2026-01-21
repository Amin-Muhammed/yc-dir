import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import type { ReactNode } from "react";
import Ping from "./Ping";
import { formatNouneToLocaleString } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";
interface ViewProps {
  id: string;
}
const View = async ({ id }: ViewProps): Promise<ReactNode> => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .setIfMissing({ views: 0 })
        .inc({ views: 1 })
        .commit()
  ); // render the ui then update views in the background
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text rounded-xl!">
        <span className="font-black ">
          {formatNouneToLocaleString(
            totalViews,

            "view"
          )}
        </span>
      </p>
    </div>
  );
};

export default View;
