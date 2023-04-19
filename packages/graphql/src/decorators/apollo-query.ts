import type { QueryOptions } from '@apollo/client/core';
import { decorateProperty } from '@lit/reactive-element/decorators.js';
import { type ReactiveElement } from 'lit';
import { ApolloClientConsumer } from '../controllers/apollo-client-consumer.js';
import { unwrapQueryResult } from '../utils/operation-result-unwrapper.js';

// eslint-disable-next-line ts/no-explicit-any
export function apolloQuery(options: QueryOptions): any {
  return decorateProperty({
    // eslint-disable-next-line ts/no-unused-vars
    descriptor: (_name?: PropertyKey) => ({
      async get(this: ReactiveElement) {
        const { client } = new ApolloClientConsumer(this);

        if (!client) {
          throw new Error('ApolloClient not found');
        }

        await this.updateComplete;

        const result = await client.query(options);

        return unwrapQueryResult(result);
      },
      enumerable: true,
      configurable: true,
    }),
  });
}
