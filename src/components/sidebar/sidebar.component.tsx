import React, { JSX } from 'react';

export interface SidebarNavItemI {
  id: string;
  title: string;
  icon: string;
  isFav?: boolean;
  activated: boolean;
  hidden?: boolean;
  children?: SidebarNavItemI[];
  disabled?: boolean;
}

export interface SidebarI {
  logoUrl: string;
  isExpanded: boolean;
  isCollapsible: boolean;
  navItems: SidebarNavItemI[];
}

export const Sidebar: React.FC<Partial<SidebarI>> = ({
  isExpanded = true,
  isCollapsible = true,
  logoUrl = '/assets/images/me-logo.png',
  navItems = [],
}): JSX.Element => {
  return <div>Sidebar komponentica</div>;
};
