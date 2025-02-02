import { JSX } from 'react';
import classes from './login.component.module.scss';
import { useTranslation } from 'react-i18next';

export const Login: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const performLogin = (event: any) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <div className={classes.loginSection}>
      <form className={classes.loginForm} onSubmit={performLogin}>
        <label htmlFor="username">{t('username')}</label>
        <input id="username" name="username" required />
        <label htmlFor="password">{t('password')}</label>
        <input id="password" name="password" type="password" required />

        <button className="login-button" type="submit">
          {t('login')}
        </button>
      </form>
    </div>
  );
};
