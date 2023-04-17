import { authGuard } from '@rask/identity/guards/auth-guards.js';
import { Router, type Params } from '@vaadin/router';
import routes from './routes.js';

const router = new Router();

router.setRoutes([
  {
    path: '(.*)/',
    action: async (context, commands) => {
      const isAuthenticated = await authGuard();
      const view = new URLSearchParams(context.search).get('view');
      const newPath = context.pathname.slice(0, -1);

      if (!isAuthenticated && view !== 'login') {
        return commands.redirect('/login');
      }

      return commands.redirect(newPath);
    },
  },
  ...routes,
]);

export const attachRouter = (outlet: HTMLElement) => {
  router.setOutlet(outlet);
};

export const urlForName = (name: string, params?: Params) => {
  return router.urlForName(name, params);
};
