import { useRegistry } from './registry.js';
import type { Constructor } from './types.js';

const registry = useRegistry();

/**
 * Inject instance of passed type.
 *
 * @param {Constructor<T>} token The constructable type to be injected.
 * @returns {InstanceType<Constructor<T>>} Instance of type.
 */
export function inject<T>(token: Constructor<T>): InstanceType<Constructor<T>> {
  const { name } = token;
  const isInjectable = Reflect.getMetadata('injectable', token);

  if (!isInjectable) {
    throw new Error(`Cannot inject ${name} as it is not injectable.`);
  }

  const inst = registry.getInstance<T>(name);

  return inst;
}
