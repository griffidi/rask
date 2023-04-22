/**
 * A stopwatch utility.
 */
export class Timer {
  #startTime: number;
  #endTime: number | undefined;

  /**
   * Gets the elapsed time in milliseconds.
   */
  get elapsed(): number {
    if (this.#endTime === undefined) {
      throw new Error('Timer has not been stopped');
    }

    return this.#endTime - this.#startTime;
  }

  /**
   * Starts a new timer and return a new instance of Timer.
   *
   * @returns {Timer} - A new timer instance.
   */
  static start(): Timer {
    const timer = new Timer();
    timer.#startTime = performance.now();
    return timer;
  }

  /**
   * Stops the timer and returns the elapsed time in milliseconds.
   *
   * @returns {number} - The elapsed time in milliseconds.
   */
  stop(): number {
    this.#endTime = performance.now();

    return this.elapsed;
  }
}
