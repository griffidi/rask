import {
  type ApolloClient,
  type DocumentNode,
  type MutationOptions,
  type NormalizedCacheObject,
  type OperationVariables,
  type QueryOptions,
  type TypedDocumentNode,
} from '@apollo/client/core';
import { useCache } from '@rask/core/cache/index.js';
import { injectable } from '@rask/core/di/injectable.js';
import { GRAPHQL_URI_CACHE_KEY } from '../constants/graphql-uri-cache-key.js';
import {
  extractDataFromQueryResult,
  unwrapMutateResult,
} from '../utils/operation-result-unwrapper.js';
import { createApolloClient } from './create-apollo-client.js';

const cache = useCache();
const GRAPHQL_URI = cache.get<string>(GRAPHQL_URI_CACHE_KEY);

interface ClientQueryOptions extends Omit<QueryOptions, 'query'> {}

@injectable()
export class Client implements Disposable {
  #apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

  constructor() {
    this.#apolloClient = createApolloClient({ uri: GRAPHQL_URI });
  }

  [Symbol.dispose]() {
    this.#apolloClient = null;
  }

  /**
   * Execute a mutate operation.
   *
   * @param {MutationOptions} options Mutate options.
   * @returns {Promise<FetchResult<T>>} Unwrapped result from mutate operation.
   */
  async mutate<T>(options: MutationOptions): Promise<T> {
    const result = await this.#apolloClient?.mutate(options);
    return unwrapMutateResult(result);
  }

  /**
   * Execute a query operation.
   *
   * @param {QueryOptions} options Query options.
   * @returns {Promise<ApolloQueryResult<T>>} Unwrapped result from query operation.
   */
  // eslint-disable-next-line ts/no-explicit-any
  async query<TData = any, TVariables = OperationVariables>(
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options: ClientQueryOptions = {}
  ): Promise<TData> {
    const result = await this.#apolloClient?.query({
      ...options,
      query,
    } as QueryOptions);
    return extractDataFromQueryResult<TData>(result);
  }
}
