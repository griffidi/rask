import 'lit';

declare class LitElement {
  hotReplacedCallback(): void;
}

declare module 'lit' {
  export interface LitElement {
    hotReplaceCallback(fn: Function): void;
  }

  export interface LitElementConstructor {
    new (...params: any[]): LitElement;
  }
}
