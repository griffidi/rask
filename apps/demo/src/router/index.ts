import { ContextProvider } from '@lit-labs/context';
import { Router } from '@lit-labs/router';
import type { LitElement } from 'lit';
import { routerContext } from './router-context.js';
import routes from './routes.js';

/**
 * Creates a router and provider for the router context.
 *
 * @param {LitElement} host Host element to create the router for.
 *
 * @returns { router: Router, provider: ContextProvider } The router
 * and the provider for the router context.
 */
export function createRouter(host: LitElement) {
  const router = new Router(host, routes);
  const provider = new ContextProvider(host, {
    context: routerContext,
    initialValue: router,
  });

  return { router, provider };
}
