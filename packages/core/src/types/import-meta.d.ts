// This file is an augmentation to the built-in ImportMeta interface
// Thus cannot contain any top-level imports
// <https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation>

/* eslint-disable @typescript-eslint/consistent-type-imports */

interface ImportMetaEnv {
  [key: string]: any;
}

interface ImportMeta {
  url: string;

  readonly hot?: import('./hot').HotContext;
}
