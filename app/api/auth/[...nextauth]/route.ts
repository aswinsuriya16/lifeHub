import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prismaClient } from "../../../../lib/prisma"
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

export const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],callbacks : {
    async signIn({user}) {
            try {
                if(!user) { 
                return false;
            }
            await prismaClient.user.upsert({
                where : {
                    email : user.email ?? ""
                },
                update : {},
                create : {
                    email : user.email ?? "",
                    username : user.email?.split("@")[0] ?? "",
                    password : null
                }
            })
            return true;
            }
            catch(e) {
                console.error("Google provider signin error");
                return false;
            }
        },
        async jwt({token,user} : {
          user : any
          token : JWT
        }) {
          if(user) {
            token.id = parseInt(user.id),
            token.username = user.username,
            token.email = user.email
          }
          return token;
        },
        async session({session,token}) {
          if(session.user && token) {
            session.user.id = token.id
          }
          return session;
        }
  }
});
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
