import { randChanceBoolean } from '@ngneat/falso';
import type { FakeOptions } from '@ngneat/falso/lib/core/core.js';

interface RandChangeBooleanOptions extends FakeOptions {
  chanceTrue?: number;
  chanceFalse?: number;
}

export function randChanceFn<T>(options: RandChangeBooleanOptions, func: (options: unknown) => T): T | null {
  const isNotNull = randChanceBoolean(options);

  return isNotNull ? func(options) : null;
}
