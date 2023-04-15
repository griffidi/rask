import { type ReactiveElement } from '@lit/reactive-element';
import { decorateProperty } from '@lit/reactive-element/decorators.js';
import { ApolloClientProvider } from '../controllers/apollo-client-provider.js';
import type { ApolloClientOptions } from './types.js';

// eslint-disable-next-line ts/no-explicit-any
export function apolloClient(options: ApolloClientOptions): any {
  return decorateProperty({
    finisher(clazz: typeof ReactiveElement) {
      clazz.addInitializer((instance: ReactiveElement) => {
        new ApolloClientProvider(instance, options);
      });
    },
  });
}
