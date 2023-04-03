export interface FontFaceWithFallback extends Partial<FontFace> {
  fontFace: FontFace;
  fallback?: FontFace;
}
