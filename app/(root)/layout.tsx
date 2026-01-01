"use client"; // navbar is a client component due to useSession hook
import type { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import { SessionProvider } from "next-auth/react";

import "easymde/dist/easymde.min.css";
interface layoutProps {
  children: ReactNode;
}
const layout = ({ children }: Readonly<layoutProps>): ReactNode => {
  return (
    <main>
      <SessionProvider>
        <Navbar />
      </SessionProvider>
      {children}
    </main>
  );
};

export default layout;
