import type { ApolloQueryResult, FetchResult } from '@apollo/client';

function unwrapResult<T>(data: T): T {
  const keys = Object.keys(data);

  // @ts-ignore(ts/7053)
  return keys.length > 0 ? data[keys[0]] : data;
}

/**
 * Unwrap the result object from an ApolloClient mutate operation.
 *
 * @param {FetchResult<T>} result Mutate result object.
 * @returns {T} Unwrapped result object.
 */
export const unwrapMutateResult = <T>(result: FetchResult<T>): T => {
  const { data } = result;
  return unwrapResult(data);
};

/**
 * Unwrap the result object from an ApolloClient query operation.
 *
 * @param {ApolloQueryResult<T>} result Query result object.
 * @returns {T} Unwrapped result object.
 */
export const unwrapQueryResult = <T>(result: ApolloQueryResult<T>): T => {
  const { data } = result;
  return unwrapResult(data);
};
