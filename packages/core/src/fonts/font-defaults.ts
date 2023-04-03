import type { FontFaceWithFallback } from './font-face-with-fallback.js';

export const fontDefaults: FontFaceWithFallback[] = [
  {
    fontFace: new FontFace(
      'Inter',
      'url(https://fonts.googleapis.com/css2?family=Inter:wght@100..900)',
      {
        display: 'swap',
      }
    ),
    fallback: new FontFace('Inter-fallback', 'local("Arial")', {
      style: 'sizeAdjust: 107.00%;',
      ascentOverride: '88%',
    }),
  },
  {
    fontFace: new FontFace(
      'Material Symbols Sharp',
      'url(https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200)'
    ),
  },
];
