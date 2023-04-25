import { render, type TemplateResult } from 'lit';
import { when } from 'lit/directives/when.js';
import { html } from 'lit/static-html.js';
import { Motion } from '../css/motion.js';
import { ToastType, type ToastOptions } from './types.js';
const TOAST_CONTAINER_CLASS = 'rk-toast__container';

const TOAST_ICON: Record<ToastType, string> = {
  [ToastType.error]: 'error',
  [ToastType.info]: 'info',
  [ToastType.success]: 'check_circle',
  [ToastType.warning]: 'warning',
};

/**
 * Create a new toast template applying the parameters to the template.
 *
 * @param {string} id The ID to assign to this toast instance.
 * @param {ToastType} type The type of toast to display.
 * @param {ToastOptions} options The options to apply to the toast.
 * @returns {TemplateResult} Toast template to render.
 */
const createToastHtml = (
  id: string,
  type: ToastType,
  { title, message, hideCloseButton }: ToastOptions
): TemplateResult => html`
  <output
    id=${id}
    class="rk-toast"
    role="status"
    aria-live="polite">
    <div class="rk-toast__inner-container">
      <span class="rk-toast__icon material-symbols-sharp ${TOAST_ICON[type]}">check_circle</span>
      <span class="rk-toast__text-container">
        <span class="rk-toast__title-text">${title}</span>
        <span class="rk-toast__text">${message}</span>
      </span>
      ${when(
        !hideCloseButton,
        () =>
          html`
            <span
              class="rk-toast__close-button material-symbols-sharp"
              aria-label="Close">
              close
            </span>
          `
      )}
    </div>
    <div class="rk-toast__border"></div>
  </output>
`;

class Toast {
  #container: HTMLElement | undefined;

  constructor() {
    let container = document.querySelector<HTMLElement>(`.${TOAST_CONTAINER_CLASS}`);

    if (!container) {
      container = document.createElement('section');
      container.classList.add(TOAST_CONTAINER_CLASS);
      document.firstElementChild.insertBefore(container, document.body);
    }

    this.#container = container;
  }

  /**
   * Show error toast message.
   *
   * @param options {ToastOptions} - Toast options.
   */
  error(options: ToastOptions): void {
    this.#show(ToastType.error, options);
  }

  /**
   * Show information toast message.
   *
   * @param options {ToastOptions} - Toast options.
   */
  info(options: ToastOptions): void {
    this.#show(ToastType.info, options);
  }

  /**
   * Show success toast message.
   *
   * @param options {ToastOptions} - Toast options.
   */
  success(options: ToastOptions): void {
    this.#show(ToastType.success, options);
  }

  /**
   * Show warning toast message.
   *
   * @param options {ToastOptions} - Toast options.
   */
  warning(options: ToastOptions): void {
    this.#show(ToastType.warning, options);
  }

  #show(type: ToastType, options: ToastOptions): void {
    setTimeout(async () => this.#startToast(type, options));
  }

  async #startToast(type: ToastType, options: ToastOptions): Promise<void> {
    const id = `t${Date.now().toString()}`;
    const template = createToastHtml(id, type, options);

    this.#addToast(template);

    return new Promise<void>(async resolve => {
      const container = this.#container;
      const toast = container.querySelector<HTMLElement>(`output#${id}`);

      await Promise.allSettled(toast.getAnimations().map(animation => animation.finished));

      this.#closeToast(toast);
      resolve();
    });
  }

  #addToast(template: TemplateResult): void {
    const { matches: motionOK } = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const container = this.#container;

    if (container.children.length && motionOK) {
      this.#flipToast(null);
      return;
    }

    render(template, container);
  }

  /**
   * Optimize animation by using {@link http://aerotwist.com/blog/flip-your-animations | FLIP}
   * (First, Last, Invert, Play) technique. Instead doing expensive calculations on
   * every single frame, it is precalculated.
   *
   * @param toasts {HTMLOutputElement} - Toast element to be added to container.
   */
  #flipToast(template: TemplateResult): void {
    const container = this.#container;

    // first (initial state of element)
    const first = container.offsetHeight;

    // add new child to change container size
    // container.appendChild(toast);
    render(template, container);

    // last (final state of element)
    const last = container.offsetHeight;

    // invert (how has element changed)
    const invert = last - first;

    // play animation
    const animation = container.animate(
      [
        { transform: `translateY(${invert}px)` },
        { transform: 'translateY(0)' },
      ],
      {
        duration: 150,
        easing: Motion.decelerationEasing,
      }
    );

    animation.startTime = document.timeline.currentTime;
  }

  #closeToast(toast: HTMLElement): void {
    this.#container.removeChild(toast);
  }
}

/**
 * TODO: Change to lazy load instance.
 */
export default new Toast();
