import { JSX } from 'react';
import classes from './login.component.module.scss';
import { AuthRequestModel } from 'src/app/models/auth-request.model';
import { LoginForm } from '../login-form.component';
import { AuthenticationService } from '../../services/authenthication.service';

export const Login: React.FC = (): JSX.Element => {
  const loginHandler = (data: AuthRequestModel): void => {
    //
    console.log(data);
    AuthenticationService.login(data).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className={classes.loginSection}>
      <LoginForm setLoginInfo={loginHandler} />
    </div>
  );
};
