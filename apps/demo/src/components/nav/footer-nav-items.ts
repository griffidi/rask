import type { NavItem } from '@rask/web/navigation-item/lib/types.js';

export const footerNavItems: ReadonlyArray<Readonly<NavItem>> = [
  {
    path: 'https://www.linkedin.com/company/united-biosource-corporation',
    icon: 'linkedin.svg',
    label: 'LinkedIn',
  },
  {
    path: 'https://twitter.com/UBCPharma',
    icon: 'twitter.svg',
    label: 'Twitter',
  },
  {
    path: 'http://www.ubc.com/blog',
    icon: 'rss.svg',
    label: 'UBC Blog',
  },
  {
    path: 'https://tfs.ubcmain.com/tfs/Clients/Frameworks.git/_git/Huron',
    icon: 'azure_devops.svf',
    label: 'Azure DevOps',
  },
];
