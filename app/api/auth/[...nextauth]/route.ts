import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "../../../../lib/prisma";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: any }) {
      try {
        if (!user) return false;
        await prismaClient.user.upsert({
          where: { email: user.email ?? "" },
          update: {},
          create: {
            email: user.email ?? "",
            username: user.email?.split("@")[0] ?? "",
            password: null,
          },
        });
        console.log(user);
        return true;
      } catch (e) {
        console.error("Google provider signin error", e);
        return false;
      }
    },

    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        const dbUser = await prismaClient.user.findUnique({
          where: { email: user.email ?? "" },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.username = dbUser.username;
          token.email = dbUser.email;
        }
      }

      if(!token.username && token.email) {
        const dbuser = await prismaClient.user.findUnique({
          where : {
            email : token.email
          }
        })
        
        if(dbuser) {
          token.username = dbuser.username;
          token.id = dbuser.id;
        }
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
