import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
// import {
//   NextSSRInMemoryCache,
//   NextSSRApolloClient,
// } from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // https://studio.apollographql.com/public/spacex-l4uc6p/
      uri: "https://outgoing-lizard-27.hasura.app/v1/graphql",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET,
      },
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  });
});
