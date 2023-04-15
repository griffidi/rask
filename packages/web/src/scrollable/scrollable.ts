import { noChange, type ElementPart, type LitElement } from 'lit';
import { Directive, directive } from 'lit/directive.js';
import css from './scrollable.css' assert { type: 'css' };

class ScrollableDirective extends Directive {
  render() {
    return noChange;
  }

  override update(part: ElementPart): void {
    const element = part.element;

    if (!element.hasAttribute('scrollable')) {
      element.setAttribute('scrollable', '');

      const root = part.options?.host as LitElement;

      if (root?.shadowRoot && css instanceof CSSStyleSheet) {
        root.shadowRoot.adoptedStyleSheets.push(css);
      }
    }
  }
}

export const scrollable = directive(ScrollableDirective);
