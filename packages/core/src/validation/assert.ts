export function isEmpty(value: unknown): boolean {
  return (
    isNull(value) ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value?.length === 0)
  );
}

export function notEmpty(value: unknown): boolean {
  return !isEmpty(value);
}

export function isNull(value: unknown): boolean {
  return value === null || typeof value === 'undefined';
}

export function notNull(value: unknown): boolean {
  return !isNull(value);
}

export function throwIfEmpty(value: unknown, message: string): void {
  if (isEmpty(value)) {
    // TODO: fix logging error
    // console.error('throwIfEmpty', arguments);
    throw new Error(message, { cause: { code: 'IsEmpty' } });
  }
}

export function throwIfNull(value: unknown, message: string): void {
  if (isNull(value)) {
    // TODO: fix logging error
    // console.error('throwIfEmpty', arguments);
    throw new Error(message, { cause: { code: 'IsNull' } });
  }
}
