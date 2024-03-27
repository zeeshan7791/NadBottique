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
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/shippingOrder/Shipping";
import ConfirmOrder from "./components/shippingOrder/ConfirmOrder";

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
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/shipping" element={<Shipping/>}></Route>
          <Route path="/order/confirm" element={<ConfirmOrder/>}></Route>
          <Route path="/products/:keyword" element={<Products />}></Route>
          <Route path="/Search" element={<Search />}></Route>
          <Route path="/login" element={<LoginSignUp />}></Route>
          <Route path="/account" element={<Profile />}></Route>
          <Route path="/me/update" element={<UpdateProfile />}></Route>
          <Route path="/password/update" element={<UpdatePassword />}></Route>
          <Route path="/password/forgot" element={<ForgotPassword />}></Route>
          <Route
            path="/password/reset/:token"
            element={<ForgotPassword />}
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
