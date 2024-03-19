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
import Products from "./Pages/product/Products";
import Search from "./components/products/Search";
import { useSelector } from "react-redux";
import MenuOption from "./components/layout/header/MenuOption";
import Profile from "./components/user/Profile";

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <Header />
        {isAuthenticated && <MenuOption />}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/product/:productId"
            element={<ProductDetails />}
          ></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:keyword" element={<Products />}></Route>
          <Route path="/Search" element={<Search />}></Route>
          <Route path="/login" element={<LoginSignUp />}></Route>
          <Route path="/account" element={<Profile />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
