// Uncomment this line to use CSS modules
// import styles from './app.module.scss';

import classes from './app.module.scss';
import './common/i18n';
import { AuthContextProvider } from './common/providers/auth-context.provider';
import { Routing } from './common/routing/routing.component';

export function App() {
  return (
    <div className={classes.aplication_wrapper}>
      <AuthContextProvider>
        <Routing></Routing>
      </AuthContextProvider>
    </div>
  );
}

export default App;
