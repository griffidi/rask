import { type ApolloClient, type NormalizedCacheObject } from '@apollo/client/core';
import { ContextConsumer } from '@lit-labs/context';
import type { ReactiveController, ReactiveControllerHost, ReactiveElement } from 'lit';
import { apolloClientContext } from '../client/apollo-client-context.js';
import { ApolloClientConsumerConnectedEvent, ApolloClientConsumerDisconnectedEvent } from './events.js';

export class ApolloClientConsumer implements ReactiveController {
  #emitter: EventTarget;
  #consumer: ContextConsumer<typeof apolloClientContext, ReactiveElement>;

  protected host: ReactiveControllerHost;

  get client(): ApolloClient<NormalizedCacheObject> | undefined {
    return this.#consumer?.value;
  }

  constructor(host: ReactiveElement) {
    if (host instanceof EventTarget) {
      this.#emitter = host;
    } else {
      this.#emitter = new EventTarget();
    }

    this.#consumer = new ContextConsumer(host, apolloClientContext, this.clientChanged);

    this.host = host;
    host.addController(this);
  }

  protected clientChanged?(client?: ApolloClient<NormalizedCacheObject> | null): void;

  hostConnected(): void {
    this.#emitter.dispatchEvent(new ApolloClientConsumerConnectedEvent(this));
  }

  hostDisconnected(): void {
    this.#emitter.dispatchEvent(new ApolloClientConsumerDisconnectedEvent(this));
  }
}
