import CredentialsProvider from "next-auth/providers/credentials";
import Moralis from "moralis";
import NextAuth, { ISODateString } from "next-auth";
import type { DefaultUser, DefaultSession } from "next-auth";
import { Session } from "next-auth";

export type CryptoUserData = {
  address: string;
  chainId: number;
  signature: string;
  profileId: string;
  expirationTime: ISODateString;
};

export interface CryptoUser extends DefaultUser {
  user: CryptoUserData;
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "MoralisAuth",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const { message, signature } = credentials as Record<string, string>;

          await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

          const { address, chainId, profileId, expirationTime, uri } = (
            await Moralis.Auth.verify({ message, signature, network: "evm" })
          ).raw;
          const nextAuthUrl = process.env.NEXTAUTH_URL;

          if (uri !== nextAuthUrl) {
            return null;
          }

          const user = {
            address,
            chainId,
            profileId,
            expirationTime,
            signature,
          };

          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.expires = (token as unknown as CryptoUser).user.expirationTime;
      (session as unknown as CryptoUser).user = (
        token as unknown as CryptoUser
      ).user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
});
