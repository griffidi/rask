export function signal<T>(initialValue: T) {
  let localValue: T = initialValue;
  const state = () => localValue;

  function setState(value: T) {
    localValue = value;
  }

  return [state, setState] as const;
}
