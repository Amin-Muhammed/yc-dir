import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "@/sanity/lib/queries";
export const runtime = "nodejs"; // 🔴 REQUIRED
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    /**
     * Runs on sign in
     */
    async signIn({ user, profile }) {
      const googleId = profile?.sub;
      if (!googleId) {
        console.log("googleId not found");
        return false;
      }

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
          googleId: googleId,
        });
      console.log("user is.  found", existingUser);
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          googleId,
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }

      return true;
    },

    /**
     * Attach Sanity user _id to JWT
     */
    async jwt({ token, profile }) {
      if (profile?.sub) {
        const author = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
            googleId: profile.sub,
          });

        token.sanityId = author?._id;
      }

      return token;
    },

    /**
     * Expose Sanity _id to session
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token?.sanityId as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
