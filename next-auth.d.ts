import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      sanityId?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sanityId?: string;
  }
}
