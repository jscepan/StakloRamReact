// Uncomment this line to use CSS modules
// import styles from './app.module.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './layouts/auth-layout-component';

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
