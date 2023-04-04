export interface CommandPaletteSearchEventDetail {
  value: string;
}

export const createCommandPaletteSearchEvent = (value: string) => {
  return new CustomEvent<CommandPaletteSearchEventDetail>('search', {
    detail: { value },
    bubbles: true,
    composed: true,
  });
};
