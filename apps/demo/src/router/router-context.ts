import { createContext } from '@lit-labs/context';
import type { Router } from '@lit-labs/router';

/**
 * Ensure singleton instance for all consumers by creating a context
 * key with Symbol.for.
 *
 * @see {@link https://lit.dev/docs/data/context/#createcontext() createContext}
 * @type {*}
 */
export const routerContext = createContext<Router>(Symbol.for('router-context'));
