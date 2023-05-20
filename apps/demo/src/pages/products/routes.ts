import type { RouteConfig } from '@lit-labs/router';
import { html } from 'lit';

export default [
  {
    path: '/products',
    render: () => {
      import('./product-list/product-list-page.js');
      return html`
        <app-product-list-page></app-product-list-page>
      `;
    },
  },
  {
    path: '/products/:id',
    render: ({ id }) => {
      import('./product/product-page.js');
      return html`
        <app-product-page .productId=${id}></app-product-page>
      `;
    },
  },
] as RouteConfig[];
