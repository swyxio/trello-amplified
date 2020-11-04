import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Layout = ({ children }) => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
