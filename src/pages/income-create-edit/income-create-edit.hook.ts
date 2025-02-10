import { useState } from 'react';
interface InitialValue {
  oid?: string;
  buyer?: string;
  amount?: number;
}
interface PopupReturn {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
  initialValues?: InitialValue | null;
}

export function usePopupCreateEditIncome(): PopupReturn {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<InitialValue | null>(null);

  const openModal = (oid = '', buyerOID?: string, amount = 0) => {
    setInitialValues({ buyer: buyerOID, amount });
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return {
    open,
    openModal,
    closeModal,
    initialValues,
  };
}
