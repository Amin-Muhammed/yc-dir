import { BadgePlus, FileInput, LogInIcon, LogOutIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="px-5! bg-white shadow-sm! py-3! font-work-sans text-stone-900!">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-2xl! flex-1! font-bold!">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex! items-center! gap-10!">
          {user ? (
            <>
              <Link
                href="/create"
                className="flex-between gap-2 justify-center "
              >
                <BadgePlus className="size-5 xs:size-6 " />
                <span className="max-sm:hidden">Create</span>
              </Link>

              <button
                className="flex gap-3"
                onClick={() => signOut()}
                type="submit"
              >
                <span className="self-center">
                  <LogOutIcon className="size-5 xs:size-6 " />
                </span>
                <span className="max-sm:hidden">log out</span>
              </button>

              <Link
                href={`/user/${user?.id}`}
                className="flex items-center justify-between gap-4  "
              >
                <span
                  className="text-sm hidden
                 sm:block sm:text-sm "
                >
                  {user?.name}
                </span>
                <Avatar className="size-10">
                  {" "}
                  <AvatarImage
                    src={user?.image || ""}
                    className=""
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-4 flex-between gap-2 py-2 bg-blue-600 text-white rounded-md"
            >
              Sign in <LogInIcon />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
