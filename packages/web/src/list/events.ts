import type { ListItem } from './list-item.js';

export interface ListChangeEventDetail {
  item: ListItem;
}

export interface ListChangeEvent extends CustomEvent<ListChangeEventDetail> {}

export const createListChangeClickedEvent = (item: ListItem) => {
  return new CustomEvent<ListChangeEventDetail>('change', {
    detail: { item },
    bubbles: true,
    composed: true,
  });
};
