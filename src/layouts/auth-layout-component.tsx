import { JSX } from 'react';
import { Logo } from '../components/logo/logo.component';
import classes from './auth-layout-component.module.scss';
import { Login } from '../components/login/login.component';

export const AuthLayout: React.FC = (): JSX.Element => {
  return (
    <div className={classes.contentSection}>
      <div className={classes.contentWrapper}>
        <div className={classes.content}>
          <Login />
        </div>
      </div>
      <div className={classes.companyContentWrapper}>
        <Logo />
      </div>
    </div>
  );
};
