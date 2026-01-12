import { FileInput, LogInIcon, LogOutIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="px-5! bg-white shadow-sm! py-3! font-work-sans text-stone-900!">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-2xl! font-bold!">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex! items-center! gap-10!">
          {user ? (
            <>
              <Link
                href="/create"
                className="flex-between gap-2 justify-center "
              >
                <FileInput />
                <span>Create</span>
              </Link>

              <button
                className="flex gap-3"
                onClick={() => signOut()}
                type="submit"
              >
                <span className="self-center">
                  <LogOutIcon />
                </span>
                <span>log out</span>
              </button>

              <Link
                href={`/user/${user?.id}`}
                className="flex items-center justify-between gap-4"
              >
                <span>{user.name}</span>

                <Image
                  src={user.image || "/default-profile.png"}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full ml-2"
                  unoptimized
                />
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
