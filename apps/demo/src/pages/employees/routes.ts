import { type RouteConfig } from '@lit-labs/router';
import { html } from 'lit';

export default [
  {
    path: '/employees',
    render: () => {
      import('./employee-list/employee-list-page.js');
      return html`
        <app-employee-list-page></app-employee-list-page>
      `;
    },
  },
  {
    path: '/employees/{:id}?',
    render: ({ id }) => {
      import('./employee/employee-page.js');
      return html`
        <app-employee-page .employeeId=${id}></app-employee-page>
      `;
    },
  },
] satisfies RouteConfig[];
