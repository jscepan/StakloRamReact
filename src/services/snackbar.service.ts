import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToastSuccess = (message: string) => {
  toast.success(message, {
    position: 'bottom-left',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    className: 'snackbar-success',
  });
};

export const showToastError = (message: string) => {
  toast.error(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    className: 'snackbar-error',
  });
};

export const showToastInfo = (message: string) => {
  toast.info(message, {
    position: 'bottom-left',
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    className: 'snackbar-info',
  });
};

export const showToastWarning = (message: string) => {
  toast.warn(message, {
    position: 'bottom-left',
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    className: 'snackbar-warning',
  });
};
