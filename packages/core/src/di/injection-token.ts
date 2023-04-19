import { injectable } from './injectable.js';

type FactoryType<T> = () => T;

export interface InjectionTokenOptions<T> {
  factory?: FactoryType<T>;
}

/**
 *  A token that can be used by the DI registry to provide a dependency.
 */
@injectable()
export class InjectionToken<T> {
  readonly #factory: FactoryType<T>;

  /**
   * This property is used by Reflection for determining the type of the dependency.
   */
  readonly metadataName = 'InjectionToken';

  protected desc: string;

  /**
   * Get the factory function for the dependency.
   */
  get factory(): FactoryType<T> {
    return this.#factory;
  }

  constructor(desc: string, options?: InjectionTokenOptions<T>) {
    this.desc = desc;
    this.#factory = options.factory;
  }

  /**
   * String representation of the InjectionToken.
   *
   * @returns {string} String representation of the InjectionToken.
   */
  toString(): string {
    return `InjectionToken ${this.desc}`;
  }
}
