import NextAuth from "next-auth";
import IdentityServer4 from "next-auth/providers/identity-server4";
import { jwtDecode } from "jwt-decode";

const { NEXTAUTH_SECRET, ISSUER, NEXTAUTH_URL } = process.env;
if (!NEXTAUTH_SECRET || !ISSUER)
  throw new Error("Next auth environment is not configured correctly");

const handler = NextAuth({
  providers: [
    IdentityServer4({
      id: "BKMIdentityServer",
      name: "BKM IdentityServer",
      authorization: {
        params: {
          scope: "openid profile api1 roles IdentityServerApi",
          //  redirect_uri: NEXTAUTH_URL,
        },
      },
      wellKnown: `${ISSUER}.well-known/openid-configuration`,
      issuer: ISSUER,
      clientId: "auction",
      clientSecret: NEXTAUTH_SECRET,

      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        const decoded: any =
          account.access_token && jwtDecode(account.access_token);

        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.name = decoded?.name;
        token.email = decoded?.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { ...session.user, name: token.name, email: token.email };
      session.access_token = token.accessToken as string;
      session.id_token = token.idToken as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
