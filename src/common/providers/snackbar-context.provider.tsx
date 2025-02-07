import React, { createContext, JSX, PropsWithChildren } from 'react';

export enum SnackbarType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface SnackbarI {
  message: string;
  type: SnackbarType;
}

export interface SnackbarContextI {
  showSnackbar: (data: SnackbarI) => void;
}

export enum SNACKBAR_CLOSE_REASON {
  CLICK = 'CLICK',
  TIMEOUT = 'TIMEOUT',
}

export const SnackbarContext = createContext<SnackbarContextI | null>(null);

export const SnackbarContextProvider: React.FC<SnackbarI> = ({
  message,
}): JSX.Element => {
  return (
    <SnackbarContext.Provider value={null}>{message}</SnackbarContext.Provider>
  );
};
