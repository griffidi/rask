import { useRegistry } from './registry.js';
import type { Constructor } from './types.js';

const registry = useRegistry();

/**
 * Make class injectable.
 *
 * @param {string} interfaceName Name of implementation's interface to inject.
 * @returns Implementation of interfaceName.
 */
export function injectable(): Function {
  // eslint-disable-next-line ts/no-unused-vars, ts/no-explicit-any
  return (target: any) => {
    const { name } = target as Constructor;

    Reflect.defineMetadata('injectable', true, target);

    registry.register(name, target);
  };
}
