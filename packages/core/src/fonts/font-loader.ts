import type { FontFaceWithFallback } from './font-face-with-fallback.js';

/**
 * Don't wait for the render tree, initiate an immediate fetch
 * of the font face.
 *
 * @param fontFace {FontFaceWithFallback} Font face and fallback to load.
 */
async function loadFont(font: FontFaceWithFallback): Promise<void> {
  const { fallback, fontFace } = font;
  const { family: fallbackFontFamily = '' } = fallback ?? {};
  const { family: fontFamily } = fontFace;

  /**
   * apply the font and fallback (which may re-render text and cause a page reflow)
   * after the font has finished downloading.
   */
  fallback && document.fonts.add(fallback);
  document.body.style.fontFamily = `${fontFamily}, ${fallbackFontFamily}, sans-serif`;

  try {
    await fontFace.load();
    document.fonts.add(fontFace);

    console.group('FontLoader');
    console.log(`Loaded font '${fontFamily}'`);
    fallback && console.log(`Loaded font '${fallbackFontFamily}'`);
    console.groupEnd();
  } catch (e) {
    console.error(`Failed to load font '${fontFamily}'.`, e);
  }
}

/**
 * Optimize font loading and rendering by immediately fetching fonts
 * and providing a fallback font in the interim. Using this method will
 * eliminate layout shifts and improve page loading performance.
 *
 * @param fontFaces {FontFaceWithFallback[]} Font faces and fallbacks to load.
 */
export default async (fontFaces: FontFaceWithFallback[]) => {
  const fontLoads = fontFaces?.map(async (fontFace) => await loadFont(fontFace));
  await Promise.all(fontLoads);
};
