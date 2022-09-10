import CredentialsProvider from "next-auth/providers/credentials";
import Moralis from "moralis";
import NextAuth, { ISODateString } from "next-auth";
import type { DefaultUser, DefaultSession } from "next-auth";
import { Session } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import dbConnect from "../../../lib/dbConnect";
import CryptoUser from "../../../model/CryptoUser";
import User from "../../../model/User";

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

          await dbConnect();
          const eUser = await CryptoUser.findOne({
            profileId: profileId,
          });
          console.log({ eUser, profileId });
          if (!eUser) {
            const newUser = new CryptoUser({
              address,
              chainId,
              profileId,
              expirationTime,
              signature,
            });
            newUser
              .save()
              .then((newUser: any) => {
                console.log({ newUser });
              })
              .catch((e: any) => {
                console.log(e);
              });

            return newUser;
          } else {
            const User = await CryptoUser.findOneAndUpdate(
              {
                profileId: profileId,
              },
              { expirationTime },
              { returnOriginal: false }
            );
            return User;
          }
        } catch (e) {
          throw new Error(`${e}`);
        }
      },
    }),
  ],
  callbacks: {
    // For JWT sessions
    async jwt({ token, user }) {
      console.log({ user });
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      // session.expires = (token as unknown as CryptoUser).user.expirationTime;
      (session as unknown as CryptoUser).user = (
        token as unknown as CryptoUser
      ).user;
      return session;
    },
  },
  session: {
    // strategy: "database",
    // updateAge: 24 * 60 * 60,
    // maxAge: 7 * 24 * 60 * 60,
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  debug: process.env.NODE_ENV === "development",
  // adapter: MongoDBAdapter(clientPromise),
  // secret: process.env.NEXTAUTH_SECRET,
});
