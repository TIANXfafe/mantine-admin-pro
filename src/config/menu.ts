import { FC } from 'react';
import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics
} from '@tabler/icons-react';

export type TMenuItem = {
  label: string;
  icon?: FC<any>;
  link?: string;
  initiallyOpened?: boolean;
  children?: TMenuItem[];
};

const MenuData: TMenuItem[] = [
  { label: 'Dashboard', icon: IconGauge, link: '/dashboard/analytics' },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    children: [
      { label: 'Overview', link: '/abc' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' }
    ]
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    children: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' }
    ]
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Security',
    icon: IconLock,
    children: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' }
    ]
  }
];

export default MenuData;
