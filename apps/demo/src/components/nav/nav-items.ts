import { RoutePaths } from ':/router/route-types.js';
import type { NavItem } from '@rask/web/navigation-item/types.js';

export default [
  {
    path: RoutePaths.home,
    icon: 'home',
    label: 'Home',
    cssColorVar: '--md-sys-color-green',
  },
  {
    path: RoutePaths.employees,
    icon: 'groups',
    label: 'Employees',
    cssColorVar: '--md-sys-color-pink',
  },
  {
    path: RoutePaths.settings,
    icon: 'settings',
    label: 'Settings',
    cssColorVar: '--md-sys-color-gray',
  },
] as const satisfies ReadonlyArray<Readonly<NavItem>>;
