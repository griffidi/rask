// import { effect } from '../signals/effect.js';
// import { signal } from '../signals/signal.js';
export function debounce<T extends unknown[]>(func: Function, timeout = 300): (...args: T) => void {
  let timer: number;

  return (...args) => {
    clearTimeout(timer);

    timer = window.setTimeout(() => {
      clearTimeout(timer);
      // @ts-ignore
      func.apply(this, args);
    }, timeout);
  };
}

// export function useDebounce(value: number, delay: number) {
//   // State and setters for debounced value
//   // const [debouncedValue, setDebouncedValue] = useState(value);
//   const debouncedValue = signal(value);
//   const setDebouncedValue = signal(value);

//   // Show the value in DevTools
//   // useDebugValue(debouncedValue);

//   effect(() => {
//     // Update debounced value after delay
//     const handler = setTimeout(() => {
//       setDebouncedValue.set(value);
//     }, delay);

//     // Cancel the timeout if value changes (also on delay change or unmount)
//     // This is how we prevent debounced value from updating if value is changed ...
//     // .. within the delay period. Timeout gets cleared and restarted.
//     return () => {
//       clearTimeout(handler);
//     };
//   });

//   return debouncedValue;
// }
