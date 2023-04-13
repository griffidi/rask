import type { QueryOptions } from '@apollo/client/core';
import { decorateProperty } from '@lit/reactive-element/decorators.js';
import { type ReactiveElement } from 'lit';
import { ApolloClientConsumer } from '../controllers/apollo-client-consumer.js';

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

        // unwrap result data
        const { data } = result;
        const keys = Object.keys(data);

        return keys.length > 0 ? data[keys[0]] : data;
      },
      enumerable: true,
      configurable: true,
    }),
  });
}
