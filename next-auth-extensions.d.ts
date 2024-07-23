import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession`, and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token: string;
    id_token: string;
    role: string;
    user: {
      /** The user's id */
      id: string;
    } & DefaultSession["user"];
  }
}
