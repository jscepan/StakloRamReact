import { JSX } from 'react';
import classes from './logo.component.module.scss';

export const Logo: React.FC = (): JSX.Element => {
  return (
    <div className={classes.companyContent}>
      <div className={classes.upper}>Plus</div>
      <div className={classes.companyName}>
        <div className={classes.first}>Staklo</div>
        <div className={classes.second}>RAM</div>
      </div>
      <div className={classes.under}>
        O B L I K O V A N J E &nbsp;&nbsp;I&nbsp;&nbsp; O B R A D A
        &nbsp;&nbsp;S T A K L A
      </div>
    </div>
  );
};
