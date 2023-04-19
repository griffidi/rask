import { type ApolloClient, type NormalizedCacheObject } from '@apollo/client/core';
import { ContextProvider } from '@lit-labs/context';
import type { ReactiveController, ReactiveControllerHost, ReactiveElement } from 'lit';
import { apolloClientContext } from '../client/apollo-client-context.js';
import { createApolloClient } from '../client/create-apollo-client.js';
import { ApolloClientProviderConnectedEvent, ApolloClientProviderDisconnectedEvent } from './events.js';
import type { ApolloClientProviderOptions } from './types.js';

export class ApolloClientProvider implements ReactiveController {
  #emitter: EventTarget;
  #provider: ContextProvider<typeof apolloClientContext>;

  protected host: ReactiveControllerHost;

  get client(): ApolloClient<NormalizedCacheObject> {
    return this.#provider.value;
  }

  constructor(host: ReactiveElement, options: ApolloClientProviderOptions) {
    if (host instanceof EventTarget) {
      this.#emitter = host;
    } else {
      this.#emitter = new EventTarget();
    }

    const client = createApolloClient(options);
    this.#provider = new ContextProvider(host, apolloClientContext, client);

    this.host = host;
    host.addController(this);
  }

  hostConnected(): void {
    this.#emitter.dispatchEvent(new ApolloClientProviderConnectedEvent(this));
  }

  hostDisconnected(): void {
    this.#emitter.dispatchEvent(new ApolloClientProviderDisconnectedEvent(this));
  }
}
