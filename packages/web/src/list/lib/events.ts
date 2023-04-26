import type { ListItem } from './list-item.js';

export interface ListEventDetail {
  item: ListItem;
}

export interface ListChangeEvent extends CustomEvent<ListEventDetail> {}

export const createListChangeEvent = (item: ListItem) => {
  return new CustomEvent<ListEventDetail>('change', {
    detail: { item },
    bubbles: true,
    composed: true,
  });
};

export const createListItemClickedEvent = (item: ListItem) => {
  return new CustomEvent<ListEventDetail>('clicked', {
    detail: { item },
    bubbles: true,
    composed: true,
  });
};
