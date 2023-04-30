// CSS modules
interface CSSModuleClasses {
  readonly [key: string]: string;
}

declare module '*.module.css' {
  const classes: CSSModuleClasses;
  export default classes;
}

// CSS
declare module '*.css' {
  import type { CSSResult } from 'lit';
  export const css: CSSResult;
  export default css;
}

// web worker
declare module '*?worker' {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}

declare module '*?worker&inline' {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}

declare module '*?worker&url' {
  const src: string;
  export default src;
}

declare module '*?sharedworker' {
  const sharedWorkerConstructor: {
    new (): SharedWorker;
  };
  export default sharedWorkerConstructor;
}

declare module '*?sharedworker&inline' {
  const sharedWorkerConstructor: {
    new (): SharedWorker;
  };
  export default sharedWorkerConstructor;
}

declare module '*?sharedworker&url' {
  const src: string;
  export default src;
}

declare module '*?raw' {
  const src: string;
  export default src;
}

declare module '*?url' {
  const src: string;
  export default src;
}

declare module '*?inline' {
  const src: string;
  export default src;
}
