/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import type { ReactiveNode } from './graph.js';
import { Watch } from './watch';

/**
 * Options passed to the `effect` function.
 */
export interface CreateEffectOptions {
  /**
   * Whether the `effect` should require manual cleanup.
   *
   * If this is `false` (the default) the effect will automatically register itself to be cleaned up
   * with the current `DestroyRef`.
   */
  manualCleanup?: boolean;

  /**
   * Whether the `effect` should allow writing to signals.
   *
   * Using effects to synchronize data by writing to signals can lead to confusing and potentially
   * incorrect behavior, and should be enabled only when necessary.
   */
  allowSignalWrites?: boolean;
}

/**
 * A global reactive effect, which can be manually scheduled or destroyed.
 */
export interface Effect {
  /**
   * Schedule the effect for manual execution, if it's not already.
   */
  schedule(): void;

  /**
   * Shut down the effect, removing it from any upcoming scheduled executions.
   */
  destroy(): void;

  /**
   * Direct access to the effect's `Consumer` for advanced use cases.
   */
  readonly consumer: ReactiveNode;
}

/**
 * Create a global `Effect` for the given reactive function.
 *
 * @developerPreview
 */
export function effect(effectFn: () => void, options?: CreateEffectOptions): Effect {
  const watch = new Watch(effectFn, queueWatch, !!options?.allowSignalWrites);
  globalWatches.add(watch);

  // Effects start dirty.
  watch.notify();

  return {
    consumer: watch,
    schedule: watch.notify.bind(watch),
    destroy: () => {
      queuedWatches.delete(watch);
      globalWatches.delete(watch);
    },
  };
}

/**
 * Get a `Promise` that resolves when any scheduled effects have resolved.
 */
export function effectsDone(): Promise<void> {
  return watchQueuePromise?.promise ?? Promise.resolve();
}

/**
 * Shut down all active effects.
 */
export function resetEffects(): void {
  queuedWatches.clear();
  globalWatches.clear();
}

const globalWatches = new Set<Watch>();
const queuedWatches = new Set<Watch>();

let watchQueuePromise: { promise: Promise<void>; resolveFn: () => void } | null = null;

function queueWatch(watch: Watch): void {
  if (queuedWatches.has(watch) || !globalWatches.has(watch)) {
    return;
  }

  queuedWatches.add(watch);

  if (watchQueuePromise === null) {
    Promise.resolve().then(runWatchQueue);

    let resolveFn!: () => void;
    const promise = new Promise<void>(resolve => {
      resolveFn = resolve;
    });

    watchQueuePromise = {
      promise,
      resolveFn,
    };
  }
}

function runWatchQueue(): void {
  for (const watch of queuedWatches) {
    queuedWatches.delete(watch);
    watch.run();
  }

  watchQueuePromise!.resolveFn();
  watchQueuePromise = null;
}
