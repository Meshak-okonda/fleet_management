import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.URL_GRAPHQL,
  cache: new InMemoryCache({ addTypename: false }),
});

export default client;