import { type RouteConfig } from '@lit-labs/router';
import { html } from 'lit';

export default [
  // {
  //   path: '(.*)/',
  //   enter: params => {
  //     return true;
  //     // const isAuthenticated = authGuard();
  //     // const view = new URLSearchParams(context.search).get('view') ?? '';
  //     // const { pathname } = context;
  //     // const validPath = pathname === '/' ? pathname : pathname.replace(/\/$/, '');

  //     // if (!isAuthenticated && view !== 'login') {
  //     //   return commands.redirect('/login');
  //     // }

  //     // if (pathname !== validPath) {
  //     //   return commands.redirect(validPath);
  //     // }

  //     // return context.next();
  //   },
  // },
  {
    name: 'home',
    path: '/',
    render: () => {
      import('../pages/home/home-page.js');
      return html`
        <app-home-page></app-home-page>
      `;
    },
  },
  {
    name: 'login',
    path: '/login',
    render: () => {
      import('../pages/login/login-page.js');
      return html`
        <app-login-page></app-login-page>
      `;
    },
  },
  {
    name: 'employees',
    path: '/employees',
    render: () => {
      import('../pages/employees/employees-page.js');
      return html`
        <app-employees-page></app-employees-page>
      `;
    },
  },
  {
    name: 'products',
    path: '/products',
    render: () => {
      import('../pages/products/products-page.js');
      return html`
        <app-products-page></app-products-page>
      `;
    },
  },
  {
    name: 'settings',
    path: '/settings',
    render: () => {
      import('../pages/settings/settings-page.js');
      return html`
        <app-settings-page></app-settings-page>
      `;
    },
  },
  // {
  //   path: '(.*)',
  //   render: () => {
  //     import('../pages/page-not-found/page-not-found.js');
  //     return html`
  //       <app-page-not-found></app-page-not-found>
  //     `;
  //   },
  // },
] as RouteConfig[];
