import type { Router, RouterLocation } from '@vaadin/router';

export type RouterLocationChangedEvent = CustomEvent<{
  router: Router;
  location: RouterLocation;
}>;
