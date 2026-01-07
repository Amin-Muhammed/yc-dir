"use client"; // navbar is a client component due to useSession hook
import type { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import { SessionProvider } from "next-auth/react";
import "easymde/dist/easymde.min.css";
interface layoutProps {
  children: ReactNode;
}
const layout = ({ children }: layoutProps) => {
  return (
    <SessionProvider>
      <main>
        <Navbar />
        {children}
      </main>
    </SessionProvider>
  );
};

export default layout;
