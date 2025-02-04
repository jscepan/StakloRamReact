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
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div>
      <div
        className={`${classes.navItemsContainer}  ${
          loading ? classes.loading : ''
        }`}
      >
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
          }
        >
          <HomeOutlined className={classes.icon} />
          {!loading && (
            <div className={classes.placeholder}>{t('dashboard')}</div>
          )}
        </NavLink>
        <NavLink
          to="/invoices"
          className={({ isActive }) =>
            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
          }
        >
          <CreditCardOutlined className={classes.icon} />
          {!loading && (
            <div className={classes.placeholder}>{t('invoices')}</div>
          )}
        </NavLink>
        <NavLink
          to="/work-orders"
          className={({ isActive }) =>
            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
          }
        >
          <TruckOutlined className={classes.icon} />
          {!loading && (
            <div className={classes.placeholder}>{t('workOrder')}</div>
          )}
        </NavLink>
        <NavLink
          to="/incomes"
          className={({ isActive }) =>
            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
          }
        >
          <DollarOutlined className={classes.icon} />
          {!loading && (
            <div className={classes.placeholder}>{t('incomes')}</div>
          )}
        </NavLink>
        <NavLink
          to="/views"
          className={({ isActive }) =>
            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
          }
        >
          <EyeOutlined className={classes.icon} />
          {!loading && <div className={classes.placeholder}>{t('views')}</div>}
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
          }
        >
          <UserOutlined className={classes.icon} />
          {!loading && <div className={classes.placeholder}>{t('users')}</div>}
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
          }
        >
          <SettingOutlined className={classes.icon} />
          {!loading && (
            <div className={classes.placeholder}>{t('settings')}</div>
          )}
        </NavLink>
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
