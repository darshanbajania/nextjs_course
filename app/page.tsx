"use client";

export const dynamic = "force-dynamic";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

const query = gql`
  query MyQuery {
    customer {
      username
    }
  }
`;

const Home = () => {
  const { data } = useSuspenseQuery(query);
  console.log(
    "🚀 ~ file: page.tsx:18 ~ Home ~ data:",
    process.env.GOOGLE_CLIENT_SECRET
  );
  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1>
      <h1>Posts</h1>
      <h1>Load more</h1>
    </section>
  );
};

export default Home;
