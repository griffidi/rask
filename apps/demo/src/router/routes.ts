import { type RouteConfig } from '@lit-labs/router';
import { html } from 'lit';
import { RouteTypes } from './route-types.js';

export default [
  {
    name: 'default',
    path: '/',
    render: () => {
      import('../pages/home/home-page.js');
      return html`<app-home-page></app-home-page>`;
    },
  },
  // {
  //   name: 'default',
  //   path: '/',
  //   render: () => {
  //     import('../pages/login/login-page.js');
  //     return html`<app-login-page></app-login-page>`;
  //   },
  // },
  {
    name: 'documents',
    path: RouteTypes.documents,
    render: () => {
      import('../pages/documents/documents-page.js');
      return html`<app-documents-page></app-documents-page>`;
    },
  },
  {
    name: 'home',
    path: RouteTypes.home,
    render: () => {
      import('../pages/home/home-page.js');
      return html`<app-home-page></app-home-page>`;
    },
  },
  {
    name: 'login',
    path: RouteTypes.login,
    render: () => {
      import('../pages/login/login-page.js');
      return html`<app-login-page></app-login-page>`;
    },
  },
  {
    name: 'customers',
    path: RouteTypes.customers,
    render: () => {
      import('../pages/customers/customers-page.js');
      return html`<app-customers-page></app-customers-page>`;
    },
  },
  {
    name: 'settings',
    path: RouteTypes.settings,
    render: () => {
      import('../pages/settings/settings-page.js');
      return html`<app-settings-page></app-settings-page>`;
    },
  },
  {
    name: 'users',
    path: RouteTypes.users,
    render: () => {
      import('../pages/users/users-page.js');
      return html`<app-users-page></app-users-page>`;
    },
  },
  {
    name: 'userEdit',
    path: RouteTypes.userEdit,
    render: ({ id }: { [key: string]: string }) => {
      import('../pages/users/user-edit-page.js');
      return html`<app-user-edit-page .userId=${id}></app-user-edit-page>`;
    },
  },
] as RouteConfig[];
