import { Motion } from '../css/motion.js';
import { ToastType, type ToastOptions } from './types.js';

const TOAST_CONTAINER_CLASS = 'rk-toast__container';
const TOAST_CLASS = 'rk-toast';
const TOAST_BORDER_CLASS = 'rk-toast__border';
const TOAST_ICON_CLASS = 'rk-toast__icon';
const TOAST_TEXT_CONTAINER_CLASS = 'rk-toast__text-container';
const TOAST_TITLE_TEXT_CLASS = 'rk-toast__title-text';
const TOAST_TEXT_CLASS = 'rk-toast__text';
const TOAST_CLOSE_BUTTON_CLASS = 'rk-toast__close-button';

const TOAST_ICON: Record<ToastType, string> = {
  [ToastType.error]: 'error',
  [ToastType.info]: 'info',
  [ToastType.success]: 'check_circle',
  [ToastType.warning]: 'warning',
};

const MATERIAL_ICON_CLASS = 'material-symbols-sharp';
export default abstract class {
  static #container: HTMLElement | undefined;

  static {
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
  static error(options: ToastOptions): void {
    this.#show(options, ToastType.error);
  }

  /**
   * Show information toast message.
   *
   * @param options {ToastOptions} - Toast options.
   */
  static info(options: ToastOptions): void {
    this.#show(options, ToastType.info);
  }

  /**
   * Show success toast message.
   *
   * @param options {ToastOptions} - Toast options.
   */
  static success(options: ToastOptions): void {
    this.#show(options, ToastType.success);
  }

  /**
   * Show warning toast message.
   *
   * @param options {ToastOptions} - Toast options.
   */
  static warning(options: ToastOptions): void {
    this.#show(options, ToastType.warning);
  }

  static #show(options: ToastOptions, type: ToastType): void {
    setTimeout(async () => this.#startToast(options, type));
  }

  static async #startToast(options: ToastOptions, type: ToastType): Promise<void> {
    const toast = this.#createToast(options, type);
    this.#addToast(toast);

    return new Promise<void>(async (resolve) => {
      await Promise.allSettled(toast.getAnimations().map((animation) => animation.finished));
      this.#closeToast(toast);
      resolve();
    });
  }

  static #addToast(toast: HTMLOutputElement): void {
    const { matches: motionOK } = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const container = this.#container;

    container.children.length && motionOK ? this.#flipToast(toast) : container.appendChild(toast);
  }

  static #createToast(options: ToastOptions, type: ToastType): HTMLOutputElement {
    const toast = document.createElement('output');
    const borderEl = this.#createBorderElement();
    const iconEl = this.#createIconElement(type);
    const messageEl = this.#createMessageElement(options);

    toast.classList.add(TOAST_CLASS);
    toast.classList.add(type);
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.appendChild(borderEl);
    toast.appendChild(iconEl);
    toast.appendChild(messageEl);

    if (!options.hideCloseButton) {
      const closeButton = this.#createCloseButton();
      closeButton.addEventListener('click', () => this.#closeToast(toast));
      toast.appendChild(closeButton);
    }

    return toast;
  }

  static #createBorderElement(): HTMLDivElement {
    const borderEl = document.createElement('div');

    borderEl.classList.add(TOAST_BORDER_CLASS);

    return borderEl;
  }

  static #createMessageElement(options: ToastOptions): HTMLSpanElement {
    const messageEl = document.createElement('span');
    const { message, title } = options;

    messageEl.classList.add(TOAST_TEXT_CONTAINER_CLASS);

    if (title) {
      const titleEl = document.createElement('span', {});
      titleEl.classList.add(TOAST_TITLE_TEXT_CLASS);
      titleEl.innerText = title;
      messageEl.appendChild(titleEl);
    }

    const textEl = document.createElement('span');
    textEl.classList.add(TOAST_TEXT_CLASS);
    textEl.innerText = message;
    messageEl.appendChild(textEl);

    return messageEl;
  }

  static #createIconElement(type: ToastType): HTMLSpanElement {
    const iconEl = document.createElement('span');

    iconEl.classList.add(TOAST_ICON_CLASS);
    iconEl.classList.add(MATERIAL_ICON_CLASS);
    iconEl.innerText = TOAST_ICON[type];

    return iconEl;
  }

  static #createCloseButton(): HTMLSpanElement {
    const button = document.createElement('span');

    button.textContent = 'close';
    button.classList.add(TOAST_CLOSE_BUTTON_CLASS);
    button.classList.add(MATERIAL_ICON_CLASS);
    button.setAttribute('aria-label', 'Close');

    return button;
  }

  /**
   * Optimize animation by using {@link http://aerotwist.com/blog/flip-your-animations | FLIP}
   * (First, Last, Invert, Play) technique. Instead doing expensive calculations on
   * every single frame, it is precalculated.
   *
   * @param toasts {HTMLOutputElement} - Toast element to be added to container.
   */
  static #flipToast(toast: HTMLOutputElement): void {
    const container = this.#container;

    // first (initial state of element)
    const first = container.offsetHeight;

    // add new child to change container size
    container.appendChild(toast);

    // last (final state of element)
    const last = container.offsetHeight;

    // invert (how has element changed)
    const invert = last - first;

    // play animation
    const animation = container.animate([{ transform: `translateY(${invert}px)` }, { transform: 'translateY(0)' }], {
      duration: 150,
      easing: Motion.decelerationEasing,
    });

    animation.startTime = document.timeline.currentTime;
  }

  static #closeToast(toast: HTMLOutputElement): void {
    this.#container.removeChild(toast);
  }
}
