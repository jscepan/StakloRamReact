import Modal from 'antd/es/modal/Modal';
import React, {
  createContext,
  ReactNode,
  PropsWithChildren,
  useCallback,
  useState,
  JSX,
  useMemo,
} from 'react';

interface ModalContextI {
  open: <T>(Component: React.FC<any>, props?: any) => Promise<T>;
  close: () => void;
}

export const ModalContext = createContext<ModalContextI | null>(null);

export const ModalContextProvider: React.FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [resolvePromise, setResolvePromise] = useState<
    ((value: any) => void) | null
  >(null);

  const open = useCallback(
    <T,>(Component: React.FC<any>, props?: any): Promise<T> => {
      return new Promise<T>((resolve) => {
        setResolvePromise(() => resolve);
        setModalContent(
          <Component {...props} onClose={(data: T) => close(data)} />
        );
      });
    },
    []
  );

  const close = useCallback(
    (data?: any) => {
      if (resolvePromise) {
        resolvePromise(data);
      }
      setModalContent(null);
      setResolvePromise(null);
    },
    [resolvePromise]
  );

  const value = useMemo(() => ({ open, close }), [close, open]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal open={!!modalContent} onCancel={() => close()} footer={null}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};
