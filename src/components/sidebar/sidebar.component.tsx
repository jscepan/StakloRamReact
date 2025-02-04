import React, { JSX, useState } from 'react';
import classes from './sidebar.component.module.scss';
import {
  CreditCardOutlined,
  DollarOutlined,
  EyeOutlined,
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
  TruckOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export interface SidebarNavItemI {
  to: string;
  icon: any;
  label: string;
}

export interface SidebarI {
  navItems: SidebarNavItemI[];
}

export const Sidebar: React.FC<Partial<SidebarI>> = ({}): JSX.Element => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);

  const navItems: SidebarNavItemI[] = [
    {
      to: '/dashboard',
      icon: <HomeOutlined className={classes.icon} />,
      label: 'dashboard',
    },
    {
      to: '/invoices',
      icon: <CreditCardOutlined className={classes.icon} />,
      label: 'invoices',
    },
    {
      to: '/work-orders',
      icon: <TruckOutlined className={classes.icon} />,
      label: 'workOrder',
    },
    {
      to: '/incomes',
      icon: <DollarOutlined className={classes.icon} />,
      label: 'incomes',
    },
    {
      to: '/views',
      icon: <EyeOutlined className={classes.icon} />,
      label: 'views',
    },
    {
      to: '/users',
      icon: <UserOutlined className={classes.icon} />,
      label: 'users',
    },
    {
      to: '/settings',
      icon: <SettingOutlined className={classes.icon} />,
      label: 'settings',
    },
  ];

  return (
    <div>
      <div
        className={`${classes.navItemsContainer} ${
          loading ? classes.loading : ''
        }`}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? `${classes.navItem} ${classes.active}`
                : classes.navItem
            }
          >
            {item.icon}
            {!loading && (
              <div className={classes.placeholder}>{t(item.label)}</div>
            )}
          </NavLink>
        ))}
      </div>

      <div className={classes.expandButton}>
        <div className={classes.wrapper}>
          {!loading && (
            <Button icon={<LeftOutlined onClick={() => setLoading(true)} />} />
          )}
          {loading && (
            <Button
              icon={<RightOutlined onClick={() => setLoading(false)} />}
            />
          )}
        </div>
      </div>
    </div>
  );
};
