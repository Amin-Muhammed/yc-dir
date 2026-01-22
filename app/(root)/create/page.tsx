import StartUpForm from "@/components/StartUpForm";
import { getSession, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

const Page = ({}): ReactNode => {
  //   const { data: session, status } = useSession();
  const session = getSession();
  console.log(session);
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <section className="pink_container min-h-[230px]!">
        <h1 className="heading">Submit Your Statrup</h1>
      </section>
      <StartUpForm />
    </>
  );
};

export default Page;
