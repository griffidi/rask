import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
  type TypePolicies,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';

const AUTH_TOKEN_KEY = 'auth|token';

export interface ApolloClientOptions {
  uri: string;
  typePolicies?: TypePolicies;
  validateVariables?: boolean;
}

export default function createApolloClient(options?: ApolloClientOptions): ApolloClient<NormalizedCacheObject> {
  const { uri, typePolicies } = options;

  if (!uri) {
    throw new Error('Apollo client requires a uri');
  }

  const httpLink = new HttpLink({
    // credentials: 'include',
    fetchOptions: {
      mode: 'cors',
    },
    uri,
    headers: {
      // authorization: localStorage.getItem(AUTH_TOKEN_KEY) || null,
      'Access-Control-Allow-Origin': 'true',
    },
  });

  // const authMiddleware = new ApolloLink((operation, forward) => {
  //   // add the authorization to the headers
  //   operation.setContext(({ headers = {} }) => ({
  //     headers: {
  //       ...headers,
  //       authorization: cache.get(AUTH_TOKEN_KEY) || null,
  //     },
  //   }));

  //   return forward(operation);
  // });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const link = ApolloLink.from([errorLink, httpLink]);
  const cache = new InMemoryCache({
    typePolicies: typePolicies ?? {},
  });

  const client = new ApolloClient({
    link,
    cache,
    connectToDevTools: true,
  });

  return client;
}
