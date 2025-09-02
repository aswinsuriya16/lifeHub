import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username?: string;
      email?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username?: string;
    email?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    username?: string;
    email?: string;
  }
}
