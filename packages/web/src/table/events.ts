import type { TableRow } from './table-row.js';

/**
 * @event internal-row-selected - Fired when a row is selected.
 */
export interface TableInternalRowSelectedEventDetail {
  row: TableRow;
}

export interface TableInternalRowSelectedEvent extends CustomEvent<TableInternalRowSelectedEventDetail> {}

export const createTableInternalRowSelectedEvent = (row: TableRow) => {
  return new CustomEvent<TableInternalRowSelectedEventDetail>('internal-row-selected', {
    detail: { row },
    bubbles: true,
    composed: true,
  });
};

/**
 * @event row-selected - Fired when a row is selected.
 */
export interface TableRowSelectedEventDetail {
  row: TableRow;
}

export interface TableRowSelectedEvent extends CustomEvent<TableRowSelectedEventDetail> {}

export const createTableRowSelectedEvent = (row: TableRow) => {
  return new CustomEvent<TableRowSelectedEventDetail>('row-selected', {
    detail: { row },
    bubbles: true,
    composed: true,
  });
};

/**
 * @event internal-row-edit - Fired when a row is edited.
 */
export interface TableInternalRowEditEventDetail {
  row: TableRow;
}

export interface TableInternalRowEditEvent extends CustomEvent<TableInternalRowEditEventDetail> {}

export const TableInternalRowEditEvent = (row: TableRow) => {
  return new CustomEvent<TableInternalRowEditEventDetail>('internal-row-edit', {
    detail: { row },
    bubbles: true,
    composed: true,
  });
};

/**
 * @event row-edit - Fired when a row is edited.
 */
export interface TableRowEditEventDetail {
  row: TableRow;
}

export interface TableRowEditEvent extends CustomEvent<TableRowEditEventDetail> {}

export const TableRowEditEvent = (row: TableRow) => {
  return new CustomEvent<TableRowEditEventDetail>('row-edit', {
    detail: { row },
    bubbles: true,
    composed: true,
  });
};
