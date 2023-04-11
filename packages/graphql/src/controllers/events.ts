import { type ApolloClientConsumer } from './apollo-client-consumer.js';
import { type ApolloClientProvider } from './apollo-client-provider.js';

export class ApolloClientProviderConnectedEvent<T extends ApolloClientProvider> extends Event {
  constructor(public readonly controller: T) {
    super('apollo-client-provider-connected', { bubbles: true, composed: true });
  }
}

export class ApolloClientProviderDisconnectedEvent<T extends ApolloClientProvider> extends Event {
  constructor(public readonly controller: T) {
    super('apollo-client-provider-disconnected', { bubbles: true, composed: true });
  }
}

export class ApolloClientConsumerConnectedEvent<T extends ApolloClientConsumer> extends Event {
  constructor(public readonly controller: T) {
    super('apollo-client-consumer-connected', { bubbles: true, composed: true });
  }
}

export class ApolloClientConsumerDisconnectedEvent<T extends ApolloClientConsumer> extends Event {
  constructor(public readonly controller: T) {
    super('apollo-client-consumer-disconnected', { bubbles: true, composed: true });
  }
}
