import { ApolloClient, InMemoryCache } from "@apollo/client";

export const graphqlClient = new ApolloClient({
  uri: process.env.SERVER_UI,
  cache: new InMemoryCache(),
});
