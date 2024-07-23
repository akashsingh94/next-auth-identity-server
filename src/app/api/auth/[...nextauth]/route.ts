import NextAuth, { AuthOptions } from "next-auth";
import IdentityServer4 from "next-auth/providers/identity-server4";
import { jwtDecode } from "jwt-decode";
import { authOptions } from "@/lib";

const { NEXTAUTH_SECRET, ISSUER, NEXTAUTH_URL } = process.env;
if (!NEXTAUTH_SECRET || !ISSUER || !NEXTAUTH_URL)
  throw new Error("Next auth environment is not configured correctly");

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
