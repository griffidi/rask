import { generateNanoId } from './nanoid.js';

export function useCrypto() {
  return new (class {
    get nanoid(): string {
      return generateNanoId();
    }
  })();
}
