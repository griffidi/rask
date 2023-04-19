import { useCache } from '@rask/core/cache/index.js';
import { type ColorTheme } from './types.js';

const THEME_CACHE_KEY = 'color|theme';
const cache = useCache();

class Theme {
  static #instance: Theme;

  static {
    this.#instance = new Theme();
    this.#instance.#reflectThemePreference('dark');
  }

  #reflectThemePreference(theme: ColorTheme): void {
    document.firstElementChild.setAttribute('color-theme', theme);
  }

  /**
   * Get singleton Theme instance.
   *
   * @static
   * @returns {*} {Theme}
   */
  static get instance(): Theme {
    return this.#instance;
  }

  get isDark(): boolean {
    return this.get() === 'dark';
  }

  set(theme: ColorTheme): void {
    cache.set(THEME_CACHE_KEY, theme);
    this.#reflectThemePreference(theme);
  }

  get(): ColorTheme {
    if (!cache.has(THEME_CACHE_KEY)) {
      return cache.get(THEME_CACHE_KEY);
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

const useTheme = (defaultTheme: ColorTheme = 'dark') => {
  const theme = Theme.instance;
  theme.set(defaultTheme);

  return theme;
};

export { type ColorTheme, useTheme };
