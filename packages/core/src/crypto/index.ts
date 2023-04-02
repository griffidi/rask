import { generateUuid } from './uuid.js';

export function useCrypto() {
  return new (class {
    get uuid(): string {
      return generateUuid();
    }
  })();
}
