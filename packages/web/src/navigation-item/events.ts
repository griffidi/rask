import type { NavItem } from './types.js';

export interface NavigationItemEventDetail {
  item: NavItem;
}

export const createNavigationItemClickedEvent = (item: NavItem) => {
  return new CustomEvent<NavigationItemEventDetail>('clicked', {
    detail: { item },
    bubbles: true,
    composed: true,
  });
};

export interface NavigationDrawerCloseEventDetail {}

export type NavigationDrawerCloseEvent = CustomEvent<NavigationDrawerCloseEventDetail>;

export interface NavigationDrawerOpenEventDetail {}

export type NavigationDrawerOpenEvent = CustomEvent<NavigationDrawerOpenEventDetail>;

export const createClosingEvent = () => {
  return new CustomEvent<NavigationDrawerCloseEventDetail>('closing', {
    detail: {},
    bubbles: true,
    composed: true,
  });
};

export const createClosedEvent = () => {
  return new CustomEvent<NavigationDrawerCloseEventDetail>('closed', {
    detail: {},
    bubbles: true,
    composed: true,
  });
};

export const openingEvent = new CustomEvent<NavigationDrawerOpenEventDetail>('opening', {
  detail: {},
  bubbles: true,
  composed: true,
});

export const openedEvent = new CustomEvent<NavigationDrawerOpenEventDetail>('opened', {
  detail: {},
  bubbles: true,
  composed: true,
});
