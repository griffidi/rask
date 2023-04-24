import { RouteTypes } from ':/router/route-types.js';
import type { NavItem } from '@rask/web/navigation-item/lib/types.js';
import { urlForName } from '../../router/index.js';

export const navItems: ReadonlyArray<Readonly<NavItem>> = [
  {
    path: urlForName(RouteTypes.home),
    icon: 'home',
    label: 'Home',
    cssColorVar: '--md-sys-color-green',
  },
  {
    path: urlForName(RouteTypes.customers),
    icon: 'groups',
    label: 'Customers',
    cssColorVar: '--md-sys-color-pink',
  },
  {
    path: urlForName(RouteTypes.employees),
    icon: 'groups',
    label: 'Employees',
    cssColorVar: '--md-sys-color-pink',
  },
  {
    path: urlForName(RouteTypes.documents),
    icon: 'description',
    label: 'Documents',
    cssColorVar: '--md-sys-color-blue',
  },
  {
    path: urlForName(RouteTypes.settings),
    icon: 'settings',
    label: 'Settings',
    cssColorVar: '--md-sys-color-gray',
  },
  {
    path: urlForName(RouteTypes.users),
    icon: 'group',
    label: 'Users',
    cssColorVar: '--md-sys-color-purple',
  },
];
