import { type Route } from '@vaadin/router';

export default [
  {
    path: '/',
    name: 'home',
    animate: true,
    component: 'app-home-page',
    action: async () => {
      await import('../pages/home/home-page.js');
    },
  },
  {
    path: '/login',
    name: 'login',
    animate: true,
    component: 'app-login-page',
    action: async () => {
      await import('../pages/login/login-page.js');
    },
  },
  {
    path: '/documents',
    name: 'documents',
    animate: true,
    component: 'app-documents-page',
    action: async () => {
      await import('../pages/documents/documents-page.js');
    },
  },
  {
    path: '/customers',
    name: 'customers',
    animate: true,
    children: [
      {
        path: '/',
        component: 'app-customers-page',
        action: async () => {
          await import('../pages/customers/customers-page.js');
        },
      },
      {
        path: '/:id',
        component: 'app-customer-page',
        action: async () => {
          await import('../pages/customers/customer-page.js');
        },
      },
    ],
  },
  {
    path: '/employees',
    name: 'employees',
    animate: true,
    children: [
      {
        path: '/',
        component: 'app-employees-page',
        action: async () => {
          await import('../pages/employees/employees-page.js');
        },
      },
      {
        path: '/:id',
        component: 'app-employee-page',
        action: async () => {
          await import('../pages/employees/employee-page.js');
        },
      },
    ],
  },
  {
    path: '/users',
    name: 'users',
    animate: true,
    children: [
      {
        path: '/',
        component: 'app-users-page',
        action: async () => {
          await import('../pages/users/users-page.js');
        },
      },
      {
        path: '/:id',
        component: 'app-user-page',
        action: async () => {
          await import('../pages/users/user-page.js');
        },
      },
    ],
  },
  {
    path: '/settings',
    name: 'settings',
    animate: true,
    component: 'app-settings-page',
    action: async () => {
      await import('../pages/settings/settings-page.js');
    },
  },
  {
    path: '(.*)',
    animate: true,
    component: 'app-page-not-found',
    action: async () => {
      await import('../pages/page-not-found/page-not-found.js');
    },
  },
] as ReadonlyArray<Route>;
