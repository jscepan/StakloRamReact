import { FormEvent, JSX } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './login-form.component.module.scss';
import { AuthRequestModel } from '../models/auth-request.model';

interface LoginFormPropsI {
  setLoginInfo: (data: AuthRequestModel) => void;
}

export const LoginForm: React.FC<LoginFormPropsI> = (props): JSX.Element => {
  const { t } = useTranslation();

  const validateData = (event: FormEvent) => {
    event.preventDefault();
    console.log(event);
    props.setLoginInfo({ username: 'Milan', password: 'Milan82' });
  };

  return (
    <form className={classes.loginForm} onSubmit={validateData}>
      <label htmlFor="username">{t('username')}</label>
      <input id="username" name="username" required />

      <label htmlFor="password">{t('password')}</label>
      <input id="password" name="password" type="password" required />

      <button className={classes.loginButton} type="submit">
        {t('login')}
      </button>
    </form>
  );
};
