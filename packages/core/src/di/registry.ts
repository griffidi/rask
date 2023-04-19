import 'reflect-metadata';
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

    const clazz = this.#nameToClass.get(name) as Constructor<T>;
    const injectableDeps: Constructor<T>[] | undefined = Reflect.getMetadata('design:paramtypes', clazz);

    injectableDeps?.map(({ name }) => this.getInstance(name));

    if (clazz === undefined) {
      throw new Error('Unknown component name: ' + name);
    }

    const inst = new clazz();
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
