export interface ImportMeta {
  url: string;

  readonly hot?: import('./hot').HotContext;
}
