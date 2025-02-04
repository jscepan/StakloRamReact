import React, { createContext, JSX, PropsWithChildren } from 'react';
import { UserModel } from 'src/models/user.model';

export const AuthContext = createContext<{
  user: UserModel;
  setUser(user: UserModel): void;
} | null>(null);

export const AuthContextProvider: React.FC<PropsWithChildren> = (
  props
): JSX.Element => {
  return (
    <AuthContext.Provider value={null}>{props.children}</AuthContext.Provider>
  );
};
