import { type ApolloClient, type NormalizedCacheObject } from '@apollo/client/core';
import { createContext } from '@lit-labs/context';

/**
 * Ensure singleton instance for all consumers by creating a context
 * key with Symbol.for.
 *
 * https://lit.dev/docs/data/context/#createcontext
 */
export const apolloClientContext = createContext<ApolloClient<NormalizedCacheObject>>(
  Symbol.for('apollo-client-context')
);
