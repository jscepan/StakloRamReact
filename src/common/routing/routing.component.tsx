import React, {
  JSX,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { AuthLayout } from 'src/layouts/auth-layout-component';
import { MainLayout } from 'src/layouts/main-layout-component';
import { Dashboard } from 'src/pages/dashboard/dashboard.component';
import { AuthContext } from '../providers/auth-context.provider';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

export const RouteAuthGuard: React.FC<{ children: JSX.Element }> = ({
  children,
}): JSX.Element => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState<UserModel | null>(authCtx?.user || null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user && !authCtx?.user) {
      UserService.getCurrentUserProfile()
        .then((res) => res.data)
        .then((userData) => {
          setUser(userData);
          authCtx?.setUser(userData);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, authCtx]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

export const Routing: React.FC = (): JSX.Element => {
  const authCtx = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            authCtx?.user ? <Navigate to="/dashboard" replace /> : <Outlet />
          }
        >
          <Route path="auth/login" element={<AuthLayout />}></Route>
        </Route>

        <Route
          path="/"
          element={
            <RouteAuthGuard>
              <MainLayout />
            </RouteAuthGuard>
          }
          //   element={
          //     authCtx?.user ? <Outlet /> : <Navigate to="/auth/login" replace />
          //   }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
