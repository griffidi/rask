import { effect } from '@preact/signals-core';
import { LitElement } from 'lit';
import { toKebabCase } from '../../utils/case.js';

export interface CustomElementMetadata {
  tag?: string;
  template?: string;
  templateUrl?: string;
  styleUrl?: string;
  style?: string;
  shadow?: boolean;
}

export interface KeyValue {
  [key: string]: any;
}

export const CustomElement = (args: CustomElementMetadata) => {
  return (target: any) => {
    const tag: string = args.tag || toKebabCase(target.prototype.constructor.name);
    const customElement: any = class extends LitElement {
      private _disposeEffect?: () => void;

      override performUpdate() {
        // ReactiveElement.performUpdate() also does this check, so we want to
        // also bail early so we don't erroneously appear to not depend on any
        // signals.
        if (!this.isUpdatePending) {
          return;
        }
        // If we have a previous effect, dispose it
        this._disposeEffect?.();

        // We create a new effect to capture all signal access within the
        // performUpdate phase (update, render, updated, etc) of the element.
        // Q: Do we need to create a new effect each non-Signal-triggered render?
        // TODO: test various combinations of render triggers:
        //  - from requestUpdate()
        //  - from signals
        //  - from both (do we get one or two re-renders)
        // and see if we really need a new effect here.
        this._disposeEffect = effect(() => {
          // When Signals change we need to re-render, but we need to get past
          // the isUpdatePending in performUpdate(), so we set it to true.
          this.isUpdatePending = true;
          // We call super.performUpdate() so that we don't create a new effect
          // only as the result of the effect running.
          super.performUpdate();
        });
      }
    };

    if (!customElements.get(tag)) {
      customElements.define(tag, customElement);
    }
    return customElement;
  };
};
