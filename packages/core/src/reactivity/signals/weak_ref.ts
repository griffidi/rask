import { global } from '../../util/global.js';

// `WeakRef` is not always defined in every TS environment where Angular is compiled. Instead,
// alias it as a local export by reading it off of the global context.

export interface WeakRef<T extends object> {
  deref(): T | undefined;
}

export interface WeakRefCtor {
  new <T extends object>(value: T): WeakRef<T>;
}

// rome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const WeakRef: WeakRefCtor = global['WeakRef'];
