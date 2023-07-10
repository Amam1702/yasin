import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Additional configuration (if needed)
// ...

export const ToastConfig = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
    />
  );
};