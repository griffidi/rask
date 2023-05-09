import { ReactiveElement } from '@lit/reactive-element';
import { effect } from './effect';

// Reflect.defineProperty(ReactiveElement.prototype, 'disposeEffect', {
//   value: undefined,
//   writable: true,
//   enumerable: false,
//   configurable: true,
// });

Reflect.defineProperty(ReactiveElement.prototype, 'originalPerformUpdate', {
  value: ReactiveElement.prototype['performUpdate'],
  writable: false,
  enumerable: false,
  configurable: true,
});

ReactiveElement.prototype['performUpdate'] = function () {
  if (!this.isUpdatePending) {
    return;
  }

  try {
    // @ts-ignore
    this['disposeEffect']?.();
  } catch (e) {
    console.error(e);
  }

  // @ts-ignore
  this['disposeEffect'] = effect(() => {
    this.isUpdatePending = true;
    // @ts-ignore
    this['originalPerformUpdate']();
  });
};
