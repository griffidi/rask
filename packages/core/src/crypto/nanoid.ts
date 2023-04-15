import { nanoid } from 'nanoid';

export function generateNanoId(): string {
  return nanoid(10);
}
