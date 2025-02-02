import { JSX } from 'react';
import classes from './login.component.module.scss';

export const Login: React.FC = (): JSX.Element => {
  const performLogin = (event: any) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <div className={classes.loginSection}>
      <form className={classes.loginForm} onSubmit={performLogin}>
        <label htmlFor="username">username</label>
        <input id="username" name="username" required />
        <label htmlFor="password">password</label>
        <input id="password" name="password" type="password" required />

        <button className="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};
