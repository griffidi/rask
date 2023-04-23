import { LitElement, html, type PropertyValueMap, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import css from './progress-bar.css' assert { type: 'css' };

/** Clamps a value to be between two numbers, by default 0 and 100. */
function clamp(v: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}

export class ProgressBar extends LitElement {
  static override styles = css;

  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 0;
  @property({ type: Number }) value = 0;

  @state() private bufferValue = 0;

  protected override willUpdate(changed: PropertyValueMap<this>): void {
    if (changed.has('value')) {
      this.bufferValue = clamp(this.value);
    }
  }
  override render(): TemplateResult {
    return html` <div class="container" role="progressbar">${this.#renderBuffer()}</div> `;
  }

  #renderBuffer(): TemplateResult {
    const transform = { transform: `scaleX(${this.bufferValue})` };

    return html` <div class="buffer" style="${styleMap(transform)}"></div> `;
  }
}
