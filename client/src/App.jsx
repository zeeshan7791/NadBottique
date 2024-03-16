import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WebFont from "webfontloader";
import Header from "./components/layout/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/home/Home";
import Footer from "./components/layout/footer/Footer";
import LoginSignUp from "./Pages/loginSignUp/Auth";
import ProductDetails from "./components/products/ProductDetails";

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/auth" element={<LoginSignUp />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
