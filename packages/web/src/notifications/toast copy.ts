import { Motion } from '../css/motion.js';

export const TOAST_CONTAINER_CLASS = 'rk-toast-group';
export const TOAST_CLASS = 'rk-toast';

export class Toast {
  static #container: HTMLElement | undefined;

  static {
    let container = document.querySelector<HTMLElement>(`.${TOAST_CONTAINER_CLASS}`);

    if (!container) {
      container = document.createElement('section');
      container.classList.add(TOAST_CONTAINER_CLASS);
      document.firstElementChild.insertBefore(container, document.body);
    }

    Toast.#container = container;
  }

  /**
   * Show toast message.
   *
   * @param message {string} - Message to be displayed in toast.
   *
   * @returns {Promise<Toast>} - Promise that resolves when toast is closed.
   */
  static async show(message: string): Promise<Toast> {
    const toast = new Toast();
    await toast.#show(message);
    return toast;
  }

  async #show(message: string): Promise<void> {
    const toast = this.#createToast(message);
    this.#addToast(toast);

    return new Promise<void>(async (resolve) => {
      await Promise.allSettled(toast.getAnimations().map((animation) => animation.finished));
      Toast.#container.removeChild(toast);
      resolve();
    });
  }

  #addToast(toast: HTMLOutputElement): void {
    const { matches: motionOK } = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const container = Toast.#container;

    container.children.length && motionOK ? this.#flipToast(toast) : container.appendChild(toast);
  }

  #createToast(message: string): HTMLOutputElement {
    const node = document.createElement('output');

    node.innerText = message;
    node.classList.add('rk-toast');
    node.setAttribute('role', 'status');
    node.setAttribute('aria-live', 'polite');

    return node;
  }

  /**
   * Optimize animation by using {@link http://aerotwist.com/blog/flip-your-animations | FLIP}
   * (First, Last, Invert, Play) technique. Instead doing expensive calculations on
   * every single frame, it is precalculated.
   *
   * @param toasts {HTMLOutputElement} - Toast element to be added to container.
   */
  #flipToast(toast: HTMLOutputElement): void {
    const container = Toast.#container;

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
}
