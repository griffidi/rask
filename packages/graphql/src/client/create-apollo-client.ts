import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
  type TypePolicies,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { TOKEN_CACHE_KEY } from '@rask/core/identity/constants/token-caChe-key.js';
import { type CachedToken } from '@rask/core/identity/models/cached-token.js';
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
    fetchOptions: {
      mode: 'cors',
    },
    uri,
    headers: {
      'Access-Control-Allow-Origin': 'true',
    },
  });

  const cachedToken = internalCache.get<CachedToken>(TOKEN_CACHE_KEY);

  const authLink = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: cachedToken?.token ? `Bearer ${cachedToken.token}` : '',
      },
    }));

    return forward(operation);
  });

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
    link: authLink.concat(link),
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
