import { JSX } from 'react';
import classes from './login.component.module.scss';
import { LoginForm } from './login-form.component';
import { AuthRequestModel } from 'src/models/auth-request.model';
import { AuthenticationService, LocalStorageService } from 'src/services';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const loginHandler = (data: AuthRequestModel): void => {
    AuthenticationService.login(data)
      .then((res) => res?.data)
      .then((data) => {
        console.log(data);
        LocalStorageService.set('jwt', `Bearer ${data.jwt}`);
        navigate('/');
      });
  };

  return (
    <div className={classes.loginSection}>
      <LoginForm setLoginInfo={loginHandler} />
    </div>
  );
};
