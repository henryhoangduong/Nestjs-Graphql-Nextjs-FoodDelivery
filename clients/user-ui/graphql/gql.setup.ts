import { ApolloClient, InMemoryCache } from "@apollo/client";

export const graphqlClient = new ApolloClient({
  uri: process.env.NEXT_SERVER_UI,
  cache: new InMemoryCache(),
});
