import { fontDefaults } from './font-defaults.js';
import type { FontFaceWithFallback } from './font-face-with-fallback.js';
import fontLoader from './font-loader.js';

export * from './font-face-with-fallback.js';

/**
 * Use font loader to optimize font loading and rendering.
 *
 * @example
 * ```ts
 * // Use font loader with default fonts
 * useFontLoader();
 *
 * // define font faces to pass to font loader.
 * const fontFaces: FontFaceWithFallback[] = [
 *  {
 *    new FontFace(
 *      'Inter',
 *      'url(https://fonts.googleapis.com/css2?family=Inter)',
 *      {
 *        style: 'wght@100..900',
 *        display: 'swap'
 *      })
 *  }
 * ];
 *
 * useFontLoader(fontFaces);
 * ```
 * @param fontFaces {FontFaceWithFallback[]} [fontFaces=fontDefaults] Array of font faces
 * to pass to font loader. If not value is specified, then default fonts are used instead.
 */
export const useFontLoader = async (fontFaces: FontFaceWithFallback[] = fontDefaults) => {
  await fontLoader(fontFaces);
};
