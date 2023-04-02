import type { Constructor } from './types.js';

class Registry {
  static #instance: Registry;

  readonly #nameToClass: Map<string, InstanceType<Constructor<unknown>>> = new Map();
  readonly #nameToInstance: Map<string, InstanceType<Constructor<unknown>>> = new Map();

  static {
    this.#instance = new Registry();
  }

  /**
   * Get singleton Registry instance.
   *
   * @static
   * @returns {*} {Registry}
   */
  static get instance(): Registry {
    return this.#instance;
  }

  register<T>(name: string, componentClass: InstanceType<Constructor<T>>) {
    this.#nameToClass.set(name, componentClass);
  }

  getInstance<T>(name: string): InstanceType<Constructor<T>> {
    if (this.#nameToInstance.has(name)) {
      return this.#nameToInstance.get(name) as InstanceType<Constructor<T>>;
    }

    const componentClass = this.#nameToClass.get(name) as Constructor<T>;

    if (componentClass === undefined) {
      throw new Error('Unknown component name: ' + name);
    }

    const inst = new componentClass();
    this.#nameToInstance.set(name, inst);

    return inst as InstanceType<Constructor<T>>;
  }
}

/**
 * Provide instance of Registry.
 *
 * @returns {Registry} Instance of Registry.
 */
export function useRegistry() {
  return Registry.instance;
}
