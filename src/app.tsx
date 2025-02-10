// Uncomment this line to use CSS modules
// import styles from './app.module.scss';

import { ToastContainer } from 'react-toastify';
import classes from './app.module.scss';
import './common/i18n';
import { AuthContextProvider } from './common/providers/auth-context.provider';
import { Routing } from './common/routing/routing.component';
import { LoaderContextProvider } from './common/providers/loading-context.provider';
import { ModalContextProvider } from './common/providers/modal-context.provider';

export function App() {
  return (
    <>
      <ToastContainer />
      <div className={classes.aplication_wrapper}>
        <ModalContextProvider>
          <LoaderContextProvider>
            <AuthContextProvider>
              <Routing></Routing>
            </AuthContextProvider>
          </LoaderContextProvider>
        </ModalContextProvider>
      </div>
    </>
  );
}

export default App;
