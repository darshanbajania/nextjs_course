import NextAuth from "next-auth";
import { authOptions } from "@/lib/session";
const handler = NextAuth(authOptions);
// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     // ...add more providers here
//   ],
// }

export { handler as GET, handler as POST };
