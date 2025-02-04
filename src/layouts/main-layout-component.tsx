import { JSX } from 'react';
import classes from './main-layout-component.module.scss';
import { Outlet } from 'react-router-dom';
import { Sidebar } from 'src/components/sidebar/sidebar.component';

export const MainLayout: React.FC = (): JSX.Element => {
  const sidebar = { isExpanded: true };

  return (
    <div className={classes.mainAppContainer}>
      <div className={`sidebarContainer ${sidebar.isExpanded && 'isExpanded'}`}>
        <Sidebar />
        {/*
    <app-sidebar
      [dataModel]="sidebar"
      (eventOccurs)="sidebarEvents($event)"
      (toggleSideBar)="toggleSidebar()" /    > */}
      </div>
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
};
