import { useRegistry } from './registry.js';
import type { Constructor } from './types.js';

const registry = useRegistry();

/**
 * Inject interface's implementation.
 *
 * @param {string} interfaceName Name of implementation's interface to inject.
 * @returns Implementation of interfaceName.
 */
export function injectable(): Function {
  // eslint-disable-next-line ts/no-explicit-any, ts/no-unused-vars
  return (target: any, _propertyKey: string) => {
    const { name } = target as Constructor;
    registry.register(name, target);
  };
}

// export function injectable2() {
//   return <T extends Constructor>(value: T, { kind, name }: ClassDecoratorContext) => {
//     if (kind !== 'class') {
//       throw new Error('This decorator can only be applied to a class.');
//     }

//     registry.register(name, value);
//   };
// }
