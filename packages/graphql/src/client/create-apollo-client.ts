import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
  type TypePolicies,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { useCache } from '@rask/core/src/cache/index.js';

const internalCache = useCache();

export interface ApolloClientOptions {
  uri: string;
  typePolicies?: TypePolicies;
  validateVariables?: boolean;
}

export const createApolloClient = (options?: ApolloClientOptions): ApolloClient<NormalizedCacheObject> => {
  const { uri, typePolicies } = options;

  if (!uri) {
    throw new Error('Apollo client requires a uri');
  }

  const cache = new InMemoryCache({
    typePolicies: typePolicies ?? {},
  });

  // persistCacheSync({
  //   cache: cache,
  //   storage: new LocalStorageWrapper(internalCache.storage),
  // });

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
  const client = new ApolloClient({
    link,
    cache,
    // defaultOptions: {
    //   watchQuery: {
    //     fetchPolicy: 'cache-and-network',
    //   },
    // },
    connectToDevTools: true,
  });

  return client;
};
