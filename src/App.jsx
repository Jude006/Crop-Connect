import React from "react";
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000}   toastClassName="font-Satoshi text-sm"/>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
};

export default App;
