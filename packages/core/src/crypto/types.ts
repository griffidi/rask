import { generateUuid } from './uuid.js';

export abstract class Crypto {
  get uuid(): string {
    return generateUuid();
  }
}
