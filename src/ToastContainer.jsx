import React from "react";
import { Bounce, ToastContainer } from "react-toastify";

const ToastContainers = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        limit={1}
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default ToastContainers;
