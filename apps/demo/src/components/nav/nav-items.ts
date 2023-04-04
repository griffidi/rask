import { RouteTypes } from '#/router/route-types.js';
import type { NavItem } from '@rask/web/navigation-item/types.js';

export const navItems: ReadonlyArray<Readonly<NavItem>> = [
  {
    path: RouteTypes.home,
    icon: 'home',
    label: 'Home',
    cssColorVar: '--md-sys-color-green',
  },
  {
    path: RouteTypes.documents,
    icon: 'description',
    label: 'Documents',
    cssColorVar: '--md-sys-color-blue',
  },
  {
    path: RouteTypes.patients,
    icon: 'patient_list',
    label: 'Patients',
    cssColorVar: '--md-sys-color-pink',
  },
  {
    path: RouteTypes.settings,
    icon: 'settings',
    label: 'Settings',
    cssColorVar: '--md-sys-color-gray',
  },
  {
    path: RouteTypes.users,
    icon: 'group',
    label: 'Users',
    cssColorVar: '--md-sys-color-purple',
  },
];
