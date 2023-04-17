import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  type ApolloClientOptions,
  type NormalizedCacheObject,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { useStorage } from '@rask/core/cache/index.js';
import { injectable } from '@rask/core/di/injectable.js';
import { GRAPHQL_URI_CACHE_KEY } from '../constants/graphql-uri-cache-key.js';

const cache = useStorage();
const GRAPHQL_URI = cache.get<string>(GRAPHQL_URI_CACHE_KEY);

const createHttpLink = (uri: string) =>
  new HttpLink({
    credentials: 'include',
    fetchOptions: {
      mode: 'cors',
    },
    uri,
    headers: {
      'Access-Control-Allow-Origin': 'true',
    },
  });

const createErrorLink = () =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

/**
 * An Apollo Client class derived from ApolloClient that exposes
 */
@injectable()
export class Client extends ApolloClient<NormalizedCacheObject> {
  constructor(options: ApolloClientOptions<NormalizedCacheObject>) {
    const httpLink = createHttpLink(GRAPHQL_URI);
    const errorLink = createErrorLink();
    const link = ApolloLink.from([errorLink, httpLink]);
    const cache = new InMemoryCache({
      typePolicies: {},
    });

    options = {
      ...options,
      link,
      cache,
      connectToDevTools: true,
    };

    super(options);
  }
}
