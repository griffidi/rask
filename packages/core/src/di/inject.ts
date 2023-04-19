import { useRegistry } from './registry.js';
import type { Constructor } from './types.js';

const registry = useRegistry();

// NOTE: the annotation cannot read the interface from
// the declaring line and this is why we pass it as an arg
// Would be nice if it could though ;)

/**
 * Inject instance of passed type.
 *
 * @param {Constructor<T>} token The constructable type to be injected.
 * @returns Instance of passed type.
 */
export function inject<T>(token: Constructor<T>) {
  // eslint-disable-next-line ts/no-unused-vars
  return function decorate(target: unknown, propertyKey: string) {
    const { name } = token;
    const inst = registry.getInstance<T>(name as string);

    // @ts-ignore
    target[propertyKey] = inst;
  };
}

/**
 * Inject instance of passed type.
 *
 * @param {Constructor<T>} token The constructable type to be injected.
 * @returns {InstanceType<Constructor<T>>} Instance of type.
 */
export function useInject<T>(token: Constructor<T>): InstanceType<Constructor<T>> {
  const { name } = token;
  const isInjectable = Reflect.getMetadata('injectable', token);

  if (!isInjectable) {
    throw new Error(`Cannot inject ${name} as it is not injectable.`);
  }

  const inst = registry.getInstance<T>(name);

  return inst;
}
