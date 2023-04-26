import type { ReactiveElement } from 'lit';

declare module 'lit' {
  export interface LitElement extends ReactiveElement {
    location: import('@vaadin/router').RouterLocation;
  }
}
