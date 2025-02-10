import { Spin } from 'antd';
import React, { JSX } from 'react';
import classes from './loader.component.module.scss';

export const Loader: React.FC = (): JSX.Element => {
  return (
    <div className={classes.overlay}>
      <Spin size="large" />
    </div>
  );
};
