import React, { JSX } from 'react';
import classes from './dashboard.component.module.scss';
import { Logo } from 'src/components/logo/logo.component';

export const Dashboard: React.FC = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Logo />
      </div>
    </div>
  );
};
