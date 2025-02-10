import React, {
  createContext,
  JSX,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react';
import { Loader } from 'src/components/shared/loader/loader.component';

interface LoaderContextI {
  showLoader: () => void;
  hideLoader: () => void;
}

export const LoaderContext = createContext<LoaderContextI | null>(null);

export const LoaderContextProvider: React.FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => {
    setLoading(true);
  };
  const hideLoader = () => {
    setLoading(false);
  };
  const value = useMemo(() => ({ showLoader, hideLoader }), []);

  return (
    <LoaderContext.Provider value={value}>
      {loading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
};
