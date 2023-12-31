import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { SessionInterface } from "@/common.types";
import { getClient } from "./client";
import { gql } from "@apollo/client";
import { CREATE_NEW_USER } from "./mutations";
import { GET_USER } from "./queries";
const client = getClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  //   jwt: {
  //     encode: ({ secret, token }) => {},
  //     decode: ({ secret, token }) => {},
  //   },
  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },
  callbacks: {
    async session({ session }) {
      try {
        const { data } = await client.query({
          query: GET_USER,
          variables: {
            email: session?.user?.email,
          },
        });

        if (data?.users_customer?.length == 1) {
          console.log("🚀 ~ file: session.ts:38 ~ session ~ data:", data);
          const newSession = {
            ...session,
            user: {
              ...session.user,
              ...data?.users_customer[0],
            },
          };
          return newSession;
        }
      } catch (error) {
        console.log("error retrieving user data", error);
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        //get the user if they exists

        const { data } = await client.query({
          query: GET_USER,
          variables: {
            email: user?.email,
          },
        });

        if (data?.users_customer.length === 0) {
          console.log("user does not exists");
          const { data, errors } = await client.mutate({
            variables: {
              userData: { email: user.email },
            },
            mutation: CREATE_NEW_USER,
          });
        }

        // if they don't then, create them
        console.log(user);
        return true;
      } catch (error) {
        console.log(error);
        return true;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  console.log(
    "🚀 ~ file: session.ts:43 ~ getCurrentUser ~ session:",
    authOptions.callbacks?.session
  );
  return session;
}
