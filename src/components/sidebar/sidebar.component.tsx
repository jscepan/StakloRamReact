import React, { JSX, useState } from 'react';
import classes from './sidebar.component.module.scss';
import { HomeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export interface SidebarNavItemI {
  id: string;
  title: string;
  icon: string;
  isFav?: boolean;
  activated: boolean;
  hidden?: boolean;
  disabled?: boolean;
}

export interface SidebarI {
  navItems: SidebarNavItemI[];
}

export const Sidebar: React.FC<Partial<SidebarI>> = ({}): JSX.Element => {
  const { t } = useTranslation();
  const [isExpanded, toggleIsExpanded] = useState(true);
  const [navItems, setNavItems] = useState(null);

  return (
    <div>
      <div>
        <NavLink to="/dashboard" className={classes.navItem}>
          <HomeOutlined className={classes.icon} />
          <div className={classes.placeholder}>{t('dashboard')}</div>
        </NavLink>
        <NavLink to="/invoices" className={classes.navItem}>
          <HomeOutlined className={classes.icon} />
          <div className={classes.placeholder}>{t('invoices')}</div>
        </NavLink>
        <NavLink to="/work-orders" className={classes.navItem}>
          <HomeOutlined className={classes.icon} />
          <div className={classes.placeholder}>{t('workOrder')}</div>
        </NavLink>
        <NavLink to="/incomes" className={classes.navItem}>
          <HomeOutlined className={classes.icon} />
          <div className={classes.placeholder}>{t('incomes')}</div>
        </NavLink>
        <NavLink to="/views" className={classes.navItem}>
          <HomeOutlined className={classes.icon} />
          <div className={classes.placeholder}>{t('views')}</div>
        </NavLink>
        <NavLink to="/users" className={classes.navItem}>
          <HomeOutlined className={classes.icon} />
          <div className={classes.placeholder}>{t('users')}</div>
        </NavLink>
        <NavLink to="/settings" className={classes.navItem}>
          <HomeOutlined className={classes.icon} />
          <div className={classes.placeholder}>{t('settings')}</div>
        </NavLink>
      </div>
      <div className={classes.expandButton}>
        <div className={classes.wrapper}>
          {!isExpanded && <Button icon={<LeftOutlined />} />}
          {isExpanded && <Button icon={<RightOutlined />} />}
        </div>
      </div>
    </div>
  );
};
